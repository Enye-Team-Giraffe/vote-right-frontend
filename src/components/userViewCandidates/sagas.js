/* eslint-disable max-lines-per-function */

import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { VOTE_CANDIDATE_REQUEST } from './actionTypes';
import actions from './actions';
import {
    SUCCESS_MESSAGE, WAIT_TIME, ERROR_MESSAGE,
    LARGE_GAS, VIEW_ELECTIONS_PATH
} from './constants';

// import web3 dependencies
const web3 = require('../../web3/configuredWeb3');
const getElectionInterface = require('../../web3/election');

// eslint-disable-next-line no-unused-vars
function* vote(payload) {
    // get the interface to the election
    const electionInterface = yield getElectionInterface(payload.electionId);
    // get the address of the account to use
    const [account] = yield web3.eth.getAccounts();
    // make the transaction to the blockchain
    try {
        yield electionInterface.methods.vote(
            payload.candidateId, payload.age,
            payload.gender, payload.latlong,
            payload.phoneNumber
        )
            .send({ from: account, gas: LARGE_GAS });
        message.success(SUCCESS_MESSAGE, WAIT_TIME);
        // use this to clear the field after we are done
    } catch (err) {
        message.error(ERROR_MESSAGE, WAIT_TIME);
    } finally {
        yield put(actions.votingLoading(false));
        // redirect to the view all elecitons tab
        payload.history.push(VIEW_ELECTIONS_PATH);
    }
}

/**
 * Watches for the {@link actionTypes.VOTE_CANDIDATE_REQUEST VOTE_CANDIDATE_REQUEST} action.
 * Request for user to vote a candidate
 * @return {void}
 */
function* voteCandidateRequestSaga({ payload }) {
    yield vote(payload);
}

// map the sagas to their respective actionTypes
function* voteCandidateSaga() {
    yield takeLatest(VOTE_CANDIDATE_REQUEST, voteCandidateRequestSaga);
}

export default voteCandidateSaga;
