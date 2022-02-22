import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { web3config } from '../../web3';
import { cEthContract } from '../../web3/cEthContract';
import { CEthDetailStyled, NavbarButton } from './CEthDetail.styled';
import { useAppDispatch } from '../../app/hooks';
import { setOpenAlertPopup } from '../../features/alertPopup/alertPopupSlice';
import Loading from '../Loading/Loading';

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

    const [currentBalance, setCurrentBalance] = useState('0');
    const [exchangeRateCurrent, setExchangeRateCurrent] = useState<string>('0');
    const [withdrawEthAmount, setWithdrawEthAmount] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [supplyAmount, setSupplyAmount] = useState(0);
    const [transactionType, setTransactionType] = useState<TransactionType>(
        TransactionType.Supply
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (account) {
            updateAccountBalance(account).catch((err) => console.log(err));
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            cEthContract.methods
                .supplyRatePerBlock()
                .call()
                .then((res: any) => {
                    setSupplyRatePerBlock(res);
                })
                .catch((err: any) => console.log(err));
            updateTotalSupplied().catch((err) => console.log(err));
            updateEthBalance(account).catch((err) => console.log(err));
            updateBalance(account).catch((err) => console.log(err));
            updateExchangeRateCurrent();
        }
    }, [library, account]);

    const updateAccountBalance = async (address: string) => {
        const res = await web3.eth.getBalance(address);
        setCurrentBalance(res);
    };

    const updateTotalSupplied = async () => {
        const res = await cEthContract.methods.totalSupply().call();
        setTotalSupply(res);
    };

    const updateEthBalance = async (address: string) => {
        const res = await cEthContract.methods
            .balanceOfUnderlying(address)
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
                    new BigNumber(res)
                        .div(new BigNumber(Math.pow(10, 18 + ethDecimals - 8)))
                        .toPrecision(8)
                );
            })
            .catch((err: any) => console.log(err));
    };

    const redeemCEth = async (ethAmount: number) => {
        setLoading(true);
        updateExchangeRateCurrent();
        if (account) {
            const redeemEthAmount = web3.utils
                .toWei(ethAmount.toPrecision(8))
                .toString();
            await cEthContract.methods
                .redeemUnderlying(redeemEthAmount)
                .send({
                    from: account,
                    gasLimit: web3.utils.toHex(150000),
                    gasPrice: web3.utils.toHex(20000000000), // use ethgasstation.info (mainnet only)
                })
                .on('transactionHash', function (hash: any) {
                    dispatch(
                        setOpenAlertPopup({
                            open: true,
                            transaction: hash as string,
                        })
                    );
                })
                .catch((err: any) => console.log(err));
            try {
                await updateBalance(account);
                await updateEthBalance(account);
                await updateAccountBalance(account);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('Please connect wallet');
        }
        setLoading(false);
    };

    const handleSupply = async (ethAmount: number) => {
        if (account) {
            setLoading(true);
            updateExchangeRateCurrent();
            await cEthContract.methods
                .mint()
                .send({
                    from: account,
                    gasLimit: web3.utils.toHex(150000),
                    gasPrice: web3.utils.toHex(20000000000), // use ethgasstation.info (mainnet only)
                    value: web3.utils.toHex(
                        web3.utils.toWei(ethAmount.toPrecision(8), 'ether')
                    ),
                })
                .on('transactionHash', function (hash: any) {
                    dispatch(
                        setOpenAlertPopup({
                            open: true,
                            transaction: hash as string,
                        })
                    );
                })
                .catch((err: any) => console.log(err));
            await updateBalance(account);
            await updateEthBalance(account);
            await updateAccountBalance(account);
            setLoading(false);
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
            {transactionType === TransactionType.Supply && (
                <div className="supply-detail-container">
                    <div className="supply-detail">
                        <h4>Your Supplied</h4>
                        <p>
                            {Number(ethBalance.toFixed(8)).toLocaleString()} ETH
                        </p>
                    </div>
                    <div className="supply-detail">
                        <h4>Total Supplied</h4>
                        <p>
                            {Number(
                                (totalSupply / 1e8).toFixed(4)
                            ).toLocaleString()}{' '}
                            ETH
                        </p>
                    </div>
                    <div className="supply-detail">
                        <h4>APY</h4>
                        <p>{Number(supplyApy.toFixed(2)).toLocaleString()} %</p>
                    </div>
                </div>
            )}
            <div className="transaction-container">
                <div className="transaction-title">
                    <h3>{transactionType.toUpperCase()}</h3>
                </div>
                {loading && (
                    <div className="loading-container">
                        <Loading />
                    </div>
                )}
                {!loading && transactionType === TransactionType.Supply && (
                    <>
                        <div className="transaction-input-container col">
                            <div className="current-balance">
                                <p>
                                    Balance:{' '}
                                    {Number(
                                        web3.utils.fromWei(currentBalance)
                                    ).toFixed(8)}{' '}
                                    ETH
                                </p>
                            </div>
                            <div className="row">
                                <div className="symbol-container">
                                    <p>ETH</p>
                                </div>
                                <button
                                    className="max-amount"
                                    onClick={() =>
                                        setSupplyAmount(
                                            Number(
                                                parseFloat(
                                                    web3.utils.fromWei(
                                                        currentBalance
                                                    )
                                                ).toFixed(8)
                                            )
                                        )
                                    }
                                >
                                    max
                                </button>
                                <input
                                    value={supplyAmount}
                                    onChange={(e) =>
                                        setSupplyAmount(Number(e.target.value))
                                    }
                                    type="number"
                                />
                                <div className="unit">
                                    <p>ETH</p>
                                </div>
                            </div>
                            <div className="receive-amount">
                                <p>Receiving</p>
                                <span>
                                    {Number(exchangeRateCurrent) === 0 ||
                                    isNaN(Number(exchangeRateCurrent))
                                        ? 0
                                        : (
                                              supplyAmount /
                                              Number(exchangeRateCurrent)
                                          ).toFixed(8)}{' '}
                                    cETH
                                </span>
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
                {!loading && transactionType === TransactionType.Withdraw && (
                    <>
                        <div className="transaction-input-container col">
                            <div className="current-balance">
                                <p>
                                    Supplied Balance:{' '}
                                    {Number(ethBalance).toFixed(8)} ETH
                                </p>
                            </div>
                            <div className="row">
                                <div className="symbol-container">
                                    <p>ETH</p>
                                </div>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setWithdrawEthAmount(
                                            Number(e.target.value)
                                        )
                                    }
                                    value={parseFloat(
                                        String(withdrawEthAmount)
                                    )}
                                />
                                <div className="unit">
                                    <p>ETH</p>
                                </div>
                                <button
                                    className="max-amount"
                                    onClick={() =>
                                        setWithdrawEthAmount(
                                            Number(ethBalance.toFixed(8))
                                        )
                                    }
                                >
                                    max
                                </button>
                            </div>
                            <div className="receive-amount">
                                <p>Receiving</p>
                                <span>{withdrawEthAmount.toFixed(8)} ETH</span>
                            </div>
                        </div>
                        <button
                            className="transaction-button"
                            onClick={() => redeemCEth(withdrawEthAmount)}
                        >
                            withdraw
                        </button>
                    </>
                )}
            </div>
        </CEthDetailStyled>
    );
};

export default CEthDetail;
