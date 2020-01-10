import { VOTE_CANDIDATE_REQUEST, VOTING_LOADING } from './actionTypes';

/**
 * Triggers request to vote a candidate
 *
 * @function
 * @return {Object} The {@link actionTypes.VOTE_CANDIDATE_REQUEST } action.
 */
const voteCandidateRequest = payload => ({
    payload,
    type: VOTE_CANDIDATE_REQUEST,
});

/**
 * Triggers a loader to indicate that a voting request is currently being made
 *
 * @function
 * @return {Object} The {@link actionTypes.VOTING_LOADING } action.
 */
const votingLoading = truthyValue => ({
    payload: truthyValue,
    type: VOTING_LOADING,
});

export default {
    voteCandidateRequest,
    votingLoading,
};
