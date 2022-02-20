import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injectedConnector } from '../connectors';

const Wallet: React.FC = () => {
    const { chainId, account, activate, active } = useWeb3React<Web3Provider>();

    const onClick = async () => {
        await activate(injectedConnector);
    };

    return (
        <div>
            <div>ChainId: {chainId}</div>
            <div>Account: {account}</div>
            {active ? (
                <div>activated</div>
            ) : (
                <button type="button" onClick={onClick}>
                    Connect
                </button>
            )}
        </div>
    );
};

export default Wallet;
