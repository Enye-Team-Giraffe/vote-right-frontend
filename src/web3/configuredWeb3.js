const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
    process.env.REACT_APP_ETHEREUM_MNEMONIC,
    process.env.REACT_APP_ETHEREUM_INFURA_KEY
);

const web3 = new Web3(provider);

module.exports = web3;
