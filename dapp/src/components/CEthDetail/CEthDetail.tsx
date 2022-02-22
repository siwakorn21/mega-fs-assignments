import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { web3config } from '../../web3';
import { cEthContract } from '../../web3/cEthContract';
import { CEthDetailStyled, NavbarButton } from './CEthDetail.styled';
import { useAppDispatch } from '../../app/hooks';
import { setOpenAlertPopup } from '../../features/alertPopup/alertPopupSlice';

const ethMantissa = 1e18;
const ethDecimals = 18;
const blocksPerDay = 6570;
const daysPerYear = 365;

const calculateApy = (supplyRatePerBlock: number): number => {
    return (
        (Math.pow(
            (supplyRatePerBlock / ethMantissa) * blocksPerDay + 1,
            daysPerYear
        ) -
            1) *
        100
    );
};

enum TransactionType {
    Withdraw = 'Withdraw',
    Supply = 'Supply',
}

const CEthDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { account, library } = useWeb3React<Web3Provider>();
    const [totalSupply, setTotalSupply] = useState(0);
    const [supplyRatePerBlock, setSupplyRatePerBlock] = useState(0);
    const [cEthBalance, setCEthBalance] = useState(0);

    const { web3 } = web3config;
    const supplyApy = calculateApy(supplyRatePerBlock);

    const [exchangeRateCurrent, setExchangeRateCurrent] = useState<string>('0');
    const [withdrawnEthAmount, setWithdrawnEthAmount] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [supplyAmount, setSupplyAmount] = useState(0);
    const [transactionType, setTransactionType] = useState<TransactionType>(
        TransactionType.Supply
    );

    useEffect(() => {
        if (account) {
            cEthContract.methods
                .supplyRatePerBlock()
                .call()
                .then((res: any) => {
                    setSupplyRatePerBlock(res);
                })
                .catch((err: any) => console.log(err));
            cEthContract.methods
                .totalSupply()
                .call()
                .then((res: any) => setTotalSupply(res))
                .catch((err: any) => console.log(err));
            updateEthBalance(account).catch((err) => console.log(err));
            updateBalance(account).catch((err) => console.log(err));
            updateExchangeRateCurrent();
        }
    }, [library, account]);

    const updateEthBalance = async (address: string) => {
        const res = await cEthContract.methods
            .balanceOfUnderlying(account)
            .call();
        setEthBalance(res / Math.pow(10, ethDecimals));
    };

    const updateBalance = async (address: string) => {
        const res = await cEthContract.methods.balanceOf(address).call();
        setCEthBalance(web3.utils.hexToNumber(res._hex) / 1e8);
    };

    const updateExchangeRateCurrent = () => {
        cEthContract.methods
            .exchangeRateStored()
            .call()
            .then((res: any) => {
                setExchangeRateCurrent(
                    new BigNumber(res._hex)
                        .div(new BigNumber(Math.pow(10, 18 + ethDecimals - 8)))
                        .toPrecision(8)
                );
            })
            .catch((err: any) => console.log(err));
    };

    const redeemCEth = async (ethAmount: number) => {
        updateExchangeRateCurrent();
        if (account) {
            const redeemEthAmount = web3.utils
                .toWei(ethAmount.toPrecision(8))
                .toString();
            const res = await cEthContract.methods
                .redeemUnderlying(redeemEthAmount)
                .send({
                    from: account,
                    gasLimit: web3.utils.toHex(150000),
                    gasPrice: web3.utils.toHex(20000000000), // use ethgasstation.info (mainnet only)
                })
                .catch((err: any) => console.log(err));
            dispatch(
                setOpenAlertPopup({ open: true, transaction: res.blockHash })
            );
            await updateBalance(account).catch((err) => console.log(err));
            window.alert('update success');
        } else {
            console.log('Please connect wallet');
        }
    };

    const handleSupply = async (ethAmount: number) => {
        if (account) {
            const res = await cEthContract.methods.mint().send({
                from: account,
                gasLimit: web3.utils.toHex(150000),
                gasPrice: web3.utils.toHex(20000000000), // use ethgasstation.info (mainnet only)
                value: web3.utils.toHex(
                    web3.utils.toWei(ethAmount.toPrecision(8), 'ether')
                ),
            });
            console.log(res);
            dispatch(
                setOpenAlertPopup({ open: true, transaction: res.blockHash })
            );
            await updateBalance(account);
            await updateEthBalance(account);
            window.alert('supply success');
        }
    };

    return (
        <CEthDetailStyled>
            <div className="navbar">
                <NavbarButton
                    isClicked={transactionType === TransactionType.Supply}
                    onClick={() => setTransactionType(TransactionType.Supply)}
                >
                    Supply
                </NavbarButton>
                <NavbarButton
                    isClicked={transactionType === TransactionType.Withdraw}
                    onClick={() => setTransactionType(TransactionType.Withdraw)}
                >
                    Withdraw
                </NavbarButton>
            </div>
            <div className="supply-detail-container">
                <div className="supply-detail">
                    <h4>Your Supplied</h4>
                    <p>{ethBalance} ETH</p>
                </div>
                <div className="supply-detail">
                    <h4>Total Supplied</h4>
                    <p>{totalSupply / 1e8} ETH</p>
                </div>
                <div className="supply-detail">
                    <h4>APY</h4>
                    <p>{supplyApy.toFixed(2)} %</p>
                </div>
            </div>
            <div className="transaction-container">
                <div className="transaction-title">
                    <h3>{transactionType}</h3>
                </div>
                {transactionType === TransactionType.Supply && (
                    <>
                        <div className="transaction-input-container">
                            <div className="symbol-container">
                                <p>ETH</p>
                            </div>
                            <button
                                className="max-amount"
                                onClick={() =>
                                    setSupplyAmount(
                                        Number(ethBalance.toPrecision(8))
                                    )
                                }
                            >
                                max
                            </button>
                            <input
                                value={supplyAmount.toString()}
                                onChange={(e) =>
                                    setSupplyAmount(Number(e.target.value))
                                }
                                type="number"
                            />
                            <div className="unit">
                                <p>ETH</p>
                            </div>
                        </div>
                        <button
                            className="transaction-button"
                            onClick={() => handleSupply(supplyAmount)}
                        >
                            supply
                        </button>
                    </>
                )}
                {transactionType === TransactionType.Withdraw && (
                    <div>
                        <input
                            id="amount"
                            type="number"
                            onChange={(e) =>
                                setWithdrawnEthAmount(Number(e.target.value))
                            }
                            value={withdrawnEthAmount}
                        />
                        <button
                            onClick={() =>
                                setWithdrawnEthAmount(
                                    Number(
                                        (
                                            Number(exchangeRateCurrent) *
                                            cEthBalance
                                        ).toPrecision(8)
                                    )
                                )
                            }
                        >
                            max
                        </button>
                        <button onClick={() => redeemCEth(withdrawnEthAmount)}>
                            withdraw
                        </button>
                    </div>
                )}
            </div>
        </CEthDetailStyled>
    );
};

export default CEthDetail;
