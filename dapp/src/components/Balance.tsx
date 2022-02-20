import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';

const Balance: React.FC = () => {
    const { account, library } = useWeb3React<Web3Provider>();
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        if (account) {
            library
                ?.getBalance(account)
                .then((res) => setBalance(res.toString()));
        }
    }, [account, library]);

    return (
        <div>
            Balance: {parseFloat(formatEther(balance)).toPrecision(4)} eth
        </div>
    );
};

export default Balance;
