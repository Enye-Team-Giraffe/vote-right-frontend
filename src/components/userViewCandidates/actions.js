import { VOTE_CANDIDATE_REQUEST } from './actionTypes';

/**
 * Triggers request to vote a candidate
 *
 * @function
 * @return {Object} The {@link actionTypes.VOTE_CANDIDATE_REQUEST CREATE_ELECTION} action.
 */
const voteCandidateRequest = payload => ({
    payload,
    type: VOTE_CANDIDATE_REQUEST,
})

export default { 
    voteCandidateRequest 
};