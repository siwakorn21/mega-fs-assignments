import React from 'react';
import './App.css';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Wallet from './components/Wallet';
import Balance from './components/Balance';
import CEthBalance from './components/cEth/CEthBalance';

const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Wallet />
            <Balance />
            <CEthBalance />
        </Web3ReactProvider>
    );
};

export default App;
