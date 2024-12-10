import { useMemo } from "react";
import { Abi } from "viem";

import clickToken from "./ClickTokenModule#ClickToken.json";
import addresses from "./deployed_addresses.json";

export default function useContracts() {
    return useMemo(() => {
        return {
            clickToken: {
                address: addresses["ClickTokenModule#ClickToken"] as `0x${string}`,
                abi: clickToken.abi as Abi,
            }
        };
    }, []);
}

