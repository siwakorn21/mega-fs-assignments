import styled from 'styled-components';

export const NavbarButton = styled.button<{ isClicked: boolean }>`
    color: white;
    background-color: ${(props) => (props.isClicked ? '#243a3a' : '#0b1111')};
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    margin-left: 0.6rem;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    font-weight: bold;
`;

export const CEthDetailStyled = styled.div`
    .navbar {
        background-color: #0b1111;
        padding: 0.5rem;
        width: 13rem;
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

            h4 {
                margin-top: 1rem;
            }

            p {
                margin-top: 1rem;
            }

            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #0b1111;
            width: 30%;
            height: 6rem;
            border-radius: 1rem;
        }
    }

    .receive-amount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 0.6rem;
        margin-top: 1rem;
    }

    .transaction-container {
        width: 40%;
        height: 25rem;
        border-radius: 1rem;
        margin: 5rem auto;
        background-color: #0b1111;
        display: flex;
        //justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;

        h3 {
            margin-top: 2rem;
            font-size: 1.3rem;
            color: white;
            background: transparent;
        }

        .current-balance {
            position: absolute;
            right: 0;
            top: -2rem;
            font-size: 0.6rem;
        }

        .loading-container {
            margin-top: 7rem;
        }

        .transaction-input-container {
            display: flex;
            align-items: center;
            width: 75%;
            justify-content: space-between;
            position: relative;
            margin-top: 5rem;
            color: white;

            .symbol-container {
                background-color: #243a3a;
                color: white;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
            }

            .max-amount {
                position: absolute;
                left: 8rem;
                cursor: pointer;
                border: none;
                background-color: transparent;
                font-size: 1rem;
                top: 1rem;
                :hover {
                    color: whitesmoke;
                }
            }

            .unit {
                position: absolute;
                right: 1rem;
                top: 1rem;
            }

            input {
                padding: 1rem 4rem;
                font-weight: bold;
                color: white;
                font-size: 1.1rem;
                background-color: #243a3a;
                border-radius: 0.5rem;
                border: none;
                text-align: right;
                width: 60%;
                margin-left: 1rem;
                //padding-right: 4rem;

                :focus {
                    outline: none;
                }
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            /* Firefox */
            input[type='number'] {
                -moz-appearance: textfield;
            }
        }

        .transaction-button {
            width: 75%;
            height: 3rem;
            border-radius: 0.5rem;
            background-color: #243a3a;
            border: none;
            cursor: pointer;
            position: absolute;
            bottom: 3rem;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1rem;
            font-weight: bold;
        }
    }
`;
