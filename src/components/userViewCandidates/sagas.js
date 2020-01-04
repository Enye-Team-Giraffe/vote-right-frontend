import { takeLatest, put, call } from 'redux-saga/effects';
import { VOTE_CANDIDATE_REQUEST } from './actionTypes';

import actions from './actions';

function vote(payload) {
    console.log(payload.candidateId);
}

/**
 * Watches for the {@link actionTypes.VOTE_CANDIDATE_REQUEST VOTE_CANDIDATE_REQUEST} action.
 * Request for user to vote a candidate
 * @return {void}
 */
function* voteCandidateRequestSaga({payload}) {
    yield vote(payload);
}

// map the sagas to their respective actionTypes
function* voteCandidateSaga() {
    yield takeLatest(VOTE_CANDIDATE_REQUEST, voteCandidateRequestSaga);
}

export default voteCandidateSaga;
