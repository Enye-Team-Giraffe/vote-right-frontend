import { takeLatest,put } from 'redux-saga/effects';
import { VOTE_CANDIDATE_REQUEST } from './actionTypes';
import {message} from "antd"
// import web3 dependencies
const uuidv4 = require('uuid/v4');
const web3 = require('../../web3/configuredWeb3');
const getElectionInterface = require('../../web3/election');


// eslint-disable-next-line no-unused-vars
function* vote(payload) {
    console.log(payload)
    // get the interface to the election
    const electionInterface = yield getElectionInterface(payload.electionId);
    // get the address of the account to use
    const [account] = yield web3.eth.getAccounts();
    // make the transaction to the blockchain
    try {
        yield electionInterface.methods.vote(
            payload.candidateId,payload.age,
            payload.gender,payload.latlong,
            payload.phoneNumber

        )
            .send({ from: account, gas: 3000000 });
        message.success("SUCCESS", 2.0);
        // use this to clear the field after we are done
    } catch (err) {
        console.log(err)
        message.error(err.msg, 2.0);
    } finally {
        // yield put(actions.loadingaddCandidate(false));
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
