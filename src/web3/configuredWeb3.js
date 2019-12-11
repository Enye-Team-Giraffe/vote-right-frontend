const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');

const provider= new HDWalletProvider(
    process.env.ETHEREUM_ACCOUNT_MNEMONIC,
    process.env.ETHEREUM_INFURA_KEY
);
const web3 = new Web3(provider);

module.exports = web3;