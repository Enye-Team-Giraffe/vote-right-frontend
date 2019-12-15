import { ADD_CANDIDATE, LOADING_ADD_CANDIDATE } from './actionTypes';

/**
 * Triggers request to send details to an API to create an election
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const addCandidate = candidateDetails => ({
    payload: candidateDetails,
    type: ADD_CANDIDATE,
});

/**
 * Triggers request a spinner to indicate that the server is currently loading a create user request
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const loadingaddCandidate = truthyValue => ({
    payload: truthyValue,
    type: LOADING_ADD_CANDIDATE,
});

export default {
    addCandidate,
    loadingaddCandidate,
};
