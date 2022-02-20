export const Networks = {
    MainNet: 1,
    Ropsten: 3,
    Rinkeby: 4,
    Goerli: 5,
    Kovan: 42,
};

export interface ICompound {
    constant: boolean;
    inputs: { name: string; type: string }[];
    payable: boolean;
    outputs: { name: string; type: string }[];
    name: string;
    stateMutability: string;
    type: string;
}

export const CETH_CONTRACT_ADDRESS =
    '0xd6801a1dffcd0a410336ef88def4320d6df1883e';
