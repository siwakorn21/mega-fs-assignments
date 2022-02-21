import React from 'react';
import styled from 'styled-components';

const ModalContainerStyled = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    width: 120%;
    height: 120vh;
    margin: 0;
    z-index: 90;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer: React.FC = ({ children }) => {
    return (
        <ModalContainerStyled>
            <div className="modal-inner">{children}</div>
        </ModalContainerStyled>
    );
};

export default ModalContainer;
