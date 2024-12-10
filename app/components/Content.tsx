'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import TopTenDisplay from './TopTenDisplay';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import TheButton from './TheButton';

export default function Content() {
    const [reload, setReload] = useState(false);
    const [awaitingResponse, setAwaitingResponse] = useState(false);

    const { ready, authenticated, login, logout, user } = usePrivy();
    const account = useAccount();
    const { data, writeContract } = useWriteContract();

    const { data: receipt } = useWaitForTransactionReceipt({
        hash: data,
    });

    useEffect(() => {
        if (receipt) {
            setReload(true);
            setAwaitingResponse(false);
        }
    }, [receipt]);

    return (
        <div className="card gap-1">
            {authenticated && (
                <div className="mb-4">
                    <TheButton
                        writeContract={writeContract}
                        awaitingResponse={awaitingResponse}
                        setAwaitingResponse={setAwaitingResponse}
                    />
                </div>
            )}
            <br />
            {<TopTenDisplay reloadScores={reload} />}
        </div>
    );
}