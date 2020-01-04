import { takeLatest } from 'redux-saga/effects';
import { VOTE_CANDIDATE_REQUEST } from './actionTypes';

// eslint-disable-next-line no-unused-vars
function vote(payload) {
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
