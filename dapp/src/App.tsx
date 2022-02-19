import React, { useEffect, useState } from 'react';
import './App.css';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactProvider } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 4],
});

const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};

export const Balance: React.FC = () => {
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
export const Wallet: React.FC = () => {
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

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Wallet />
            <Balance />
        </Web3ReactProvider>
    );
};

export default App;
