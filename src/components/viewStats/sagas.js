// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

import { LOAD_VOTERS, LOAD_CANDIDATES } from './actionTypes';
import { WAIT_TIME } from './constants';
import actions from './actions';

// import custom items
const getElectionInterface = require('../../web3/election');
/**
 * Watches for the {@link actionTypes.LOAD_VOTERS LOAD_VOTERS} action.
 * Triggers an async operation to fetch voters from the blockchain
 * @param {Object} body - the data to send to the endpoint payload:{blockchain address}}
 * @return {void}
 */
function* loadVoters(action) {
    const indexes = [];
    const electionAddress = action.payload;
    const electionInterface = yield getElectionInterface(electionAddress);
    try {
        const voterArrayLength = yield electionInterface.methods.getVotersLength().call();
        for (let i = 0; i < voterArrayLength; indexes.push(i += 1));
        const voterDetails = yield Promise.all(
            indexes.map((_, index) => (electionInterface.methods.voters(index).call()))
        );
        yield put(actions.pushVoters(voterDetails));
        // stop the spinner
        yield put(actions.loadingVoters(false));
    } catch (err) {
        message.error(err.message, WAIT_TIME);
        yield put(actions.loadingVoters(false));
    }
}
/**
 * Watches for the {@link actionTypes.LOAD_CANDIDATES LOAD_CANDIDATES} action.
 * Triggers an async operation to fetch votecandidates from the blockchain
 * @param {Object} body - the data to send to the endpoint {payload:{blockchain address}}
 * @return {void}
 */
function* loadCandidates(action) {
    const electionAddress = action.payload;
    const electionInterface = yield getElectionInterface(electionAddress);
    // get the length of the candidates in this election
    try {
        const candidateArrayLength = yield electionInterface.methods.getCandidatesLength().call();
        // this line call gives us the range from zero to a number 4=>[0,1,2,3]
        const indexes = [...Array(Number(candidateArrayLength)).keys()];
        // get all the candidates from the contract
        const candidateDetails = yield Promise.all(
            indexes.map((_, index) => electionInterface.methods.candidates(index).call())
        );
        // add this candidate to the array
        yield put(actions.pushCandidates(candidateDetails));
        // stop the spinner
        yield put(actions.loadingCandidates(false));
    } catch (err) {
        message.error(err.message, WAIT_TIME);
        yield put(actions.loadingCandidates(false));
    }
}

function* validateVotersSaga() {
    yield takeLatest(LOAD_VOTERS, loadVoters);
    yield takeLatest(LOAD_CANDIDATES, loadCandidates);
}

export default validateVotersSaga;
