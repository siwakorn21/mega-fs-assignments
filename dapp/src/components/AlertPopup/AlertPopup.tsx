import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    closeAlertPopup,
    selectAlertPopupState,
} from '../../features/alertPopup/alertPopupSlice';

const AlertPopupContainer = styled.div`
    width: 20rem;
    height: 10rem;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    position: relative;
    background-color: #243a3a;
    color: whitesmoke;

    h3 {
        font-size: 1.1rem;
        margin-top: 1rem;
    }

    a {
        font-size: 1rem;
        margin-top: 1.4rem;
        text-decoration: none;
        color: black;
        font-weight: bold;
        :hover {
            text-decoration: underline;
            color: whitesmoke;
        }
    }

    button {
        width: 100%;
        border: none;
        background-color: #243a3a;
        position: absolute;
        bottom: 0;
        border-top: 1px solid whitesmoke;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding: 1rem 0;
        cursor: pointer;
        font-size: 0.9rem;
        color: whitesmoke;
    }
`;

const AlertPopup: React.FC = () => {
    const dispatch = useAppDispatch();
    const alertPopupState = useAppSelector(selectAlertPopupState);
    const transactionLink = `https://rinkeby.etherscan.io/tx/${
        alertPopupState.transaction ? alertPopupState.transaction : ''
    }`;

    return (
        <ModalContainer>
            <AlertPopupContainer>
                <h3>Transaction Submitted</h3>
                <a href={transactionLink}>View on Etherscan</a>
                <button onClick={() => dispatch(closeAlertPopup())}>ok</button>
            </AlertPopupContainer>
        </ModalContainer>
    );
};

export default AlertPopup;
