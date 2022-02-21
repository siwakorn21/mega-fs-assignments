import React, { useEffect } from 'react';
import './App.css';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import Balance from './components/Balance';
import CEthDetail from './components/CEthDetail/CEthDetail';
import { useAppSelector } from './app/hooks';
import { selectAlertPopupState } from './features/alertPopup/alertPopupSlice';
import AlertPopup from './components/AlertPopup/AlertPopup';
import { injectedConnector } from './connectors';
import { web3config } from './web3';

const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
};

const Wallet = () => {
    const { activate } = useWeb3React<Web3Provider>();

    useEffect(() => {
        activate(injectedConnector)
            .then((res) => console.log(res))
            .catch((err: any) => console.log(err));
    }, []);

    return <></>;
};

const App: React.FC = () => {
    const { web3 } = web3config;

    const alertPopupState = useAppSelector(selectAlertPopupState);

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Wallet />
            <CEthDetail />
            {alertPopupState.open && (
                <AlertPopup
                    transaction={
                        '0x05d38e6f55b19cc6808050c355dcd937eddc0b87be754dcc480e821917756343'
                    }
                />
            )}
        </Web3ReactProvider>
    );
};

export default App;
