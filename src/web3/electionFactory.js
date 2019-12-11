const web3 = require("./configuredWeb3")
const { 
        interface:compiledElectionInterface, 
        bytecode:compiledElectionBytecode 
    } = require("../ethereum/build/ElectionFactory.json");

const instance = new web3.eth.Contract(
                     JSON.parse(compiledElectionInterface),
                     process.env.ETHEREUM_ELECTION_FACTORY_ADDRESS
     );

module.exports = instance;