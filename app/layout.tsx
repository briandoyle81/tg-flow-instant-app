// app/layout.tsx
'use client';

import './globals.css';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { flowMainnet } from 'viem/chains';
import { http } from 'wagmi';

const wagmiConfig = createConfig({
  chains: [flowMainnet],
  transports: {
    [flowMainnet.id]: http(),
  }
});

const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
    logo: 'https://cryptologos.cc/logos/flow-flow-logo.png', // Replace with your logo
    walletList: [], // Disable browser wallets to force Flow wallet as smart wallet and avoid infinite recursion bug
  },
  embeddedWallets: {
    createOnLogin: 'all-users',
  },
  loginMethodsAndOrder: {
    primary: ['telegram', 'sms', 'email'],
  },
  // Flow EVM configuration
  supportedChains: [flowMainnet],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to track app initialization
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    // Ensure that the app ID exists before initializing Privy
    if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
      console.error(
        'Privy app ID is missing. Ensure NEXT_PUBLIC_PRIVY_APP_ID is set in your environment variables.'
      );
    } else {
      setIsAppInitialized(true);
    }
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {isAppInitialized ? (
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={privyConfig}
          >
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={wagmiConfig}>
                {children}
              </WagmiProvider>
            </QueryClientProvider>
          </PrivyProvider>
        ) : (
          <div>
            <h1>Application Error</h1>
            <p>
              Privy app ID is not set. Please check your
              configuration.
            </p>
          </div>
        )}
      </body>
    </html>
  );
}