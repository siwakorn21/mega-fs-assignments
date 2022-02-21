import styled from 'styled-components';

export const NavbarButton = styled.button<{ isClicked: boolean }>`
    color: white;
    background-color: ${(props) => (props.isClicked ? '#243a3a' : '#0b1111')};
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    font-weight: bold;
`;

export const CEthDetailStyled = styled.div`
    .navbar {
        background-color: #0b1111;
        padding: 0.5rem;
        width: 15rem;
        margin-top: 1rem;
        margin-left: 3rem;
        border-radius: 0.5rem;
    }

    .supply-detail-container {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin: 5rem auto;

        .supply-detail {
            h4,
            p {
                background-color: transparent;
                color: white;
            }

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            background-color: #0b1111;
            width: 30%;
            height: 10rem;
            border-radius: 1rem;
        }
    }
`;
