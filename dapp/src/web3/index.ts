import Web3 from 'web3';

interface Web3Config {
    web3: Web3;
}

export const web3config: Web3Config = {
    web3: new Web3(Web3.givenProvider),
};
