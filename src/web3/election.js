const web3 = require('./configuredWeb3');
const {
    interface: compiledElectionInterface,
} = require('../ethereum/build/Election.json');

// create an function which returns an instance of a contract which gives us an interface
function getElection(electionAddress) {
    const instance = new web3.eth.Contract(
        JSON.parse(compiledElectionInterface),
        electionAddress
    );
    return instance;
}
// export this so we can use this interface, to interact with the blockchain
module.exports = getElection;
