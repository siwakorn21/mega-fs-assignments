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

    h3 {
        font-size: 1.1rem;
        margin-top: 1rem;
    }

    a {
        font-size: 1rem;
        margin-top: 1.4rem;
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }

    button {
        width: 100%;
        border: none;
        background-color: white;
        position: absolute;
        bottom: 0;
        border-top: 1px solid black;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding: 1rem 0;
        cursor: pointer;
        font-size: 0.9rem;
    }
`;

const AlertPopup: React.FC<{
    transaction: string;
}> = ({ transaction }) => {
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
