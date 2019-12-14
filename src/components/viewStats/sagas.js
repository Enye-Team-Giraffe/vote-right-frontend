// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';


import { LOAD_VOTERS } from './actionTypes';
import { WAIT_TIME,LARGE_GAS } from './constants';
import actions from './actions';

// import custom items
const compiledElection = require("../../ethereum/build/Election.json");
const web3 = require("../../web3/configuredWeb3");
const getElectionInterface = require("../../web3/election")

function* loadVoters(action){
    const indexes=[];
    const electionAddress=action.payload;
    const electionInterface = yield getElectionInterface(electionAddress)
    try{
        const election = yield new web3.eth.Contract(
            JSON.parse(compiledElection.interface),
            electionAddress
        )
        const voterArrayLength = yield election.methods.getVotersLength().call();
        for(let i=0;i<voterArrayLength;indexes.push(i++));
        const voterDetails = yield Promise.all(
            indexes.map((_, index) => (electionInterface.methods.voters(index).call()))
        );
        yield put(actions.pushVoters(voterDetails))
    }
    catch(err){
        message.error(err.message,WAIT_TIME)
    }
}

function* validateVotersSaga(){
    yield takeLatest(LOAD_VOTERS,loadVoters)
}

export default validateVotersSaga