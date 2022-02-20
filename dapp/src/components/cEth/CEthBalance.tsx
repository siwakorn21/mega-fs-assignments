import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import CompoundABI from '../../abi/Compound.abi.json';
import { CETH_CONTRACT_ADDRESS } from '../../utils';
import { formatEther } from '@ethersproject/units';

interface TotalSupplyResponse {
    _hex: string;
    _isBigNumber: boolean;
}

const CEthBalance: React.FC = () => {
    const { account, library } = useWeb3React();
    const [totalSupply, setTotalSupply] = useState('0');

    useEffect(() => {
        if (account) {
            const compoundContract = new Contract(
                CETH_CONTRACT_ADDRESS,
                CompoundABI,
                library.getSigner()
            );
            compoundContract
                .totalSupply()
                .then((res: TotalSupplyResponse) => setTotalSupply(res._hex))
                .catch((err: any) => console.log(err));
        }
    }, [library, account]);

    return (
        <div>
            <h3>asdas</h3>
            <h3>total supply: {parseFloat(formatEther(totalSupply))}</h3>
        </div>
    );
};

export default CEthBalance;
