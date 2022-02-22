import React, { useEffect } from 'react';
import './App.css';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import CEthDetail from './components/CEthDetail/CEthDetail';
import { useAppSelector } from './app/hooks';
import { selectAlertPopupState } from './features/alertPopup/alertPopupSlice';
import AlertPopup from './components/AlertPopup/AlertPopup';
import { injectedConnector } from './connectors';

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
    const alertPopupState = useAppSelector(selectAlertPopupState);

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Wallet />
            <CEthDetail />
            {alertPopupState.open && <AlertPopup />}
        </Web3ReactProvider>
    );
};

export default App;
