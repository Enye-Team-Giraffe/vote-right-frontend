const web3 = require('./configuredWeb3');
const {
    interface: compiledElectionInterface,
} = require('../ethereum/build/ElectionFactory.json');

// create an instance of a contract which gives us an interface
const instance = new web3.eth.Contract(
    JSON.parse(compiledElectionInterface),
    process.env.REACT_APP_ETHEREUM_ELECTION_FACTORY_ADDRESS
);
// export this so we can use this interface, to interact with the blockchain
module.exports = instance;
