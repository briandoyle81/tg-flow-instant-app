import { useAccount, } from 'wagmi';
import useContracts from '../contracts/contracts';
import { useEffect, useState } from 'react';

interface theButtonProps {
    writeContract: Function;
    awaitingResponse: boolean;
    setAwaitingResponse: Function;
}

export default function TheButton({ writeContract, awaitingResponse, setAwaitingResponse }: theButtonProps) {
    const { clickToken } = useContracts();
    const account = useAccount();

    function handleClick() {
        setAwaitingResponse(true);
        writeContract({
            abi: clickToken.abi,
            address: clickToken.address,
            functionName: 'mintTo',
            args: [account.address],
        });
    }

    return (
        <>
            {!awaitingResponse && <button
                onClick={handleClick}
                className="w-full py-4 px-8 text-2xl font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transition-transform transform active:scale-95"
            >
                Click Me!!!
            </button>}
            {awaitingResponse && <button
                className="disabled w-full py-4 px-8 text-2xl font-bold text-white bg-gray-500 rounded-lg shadow-lg"
            >
                Please Wait...
            </button>}
        </>
    );
}
