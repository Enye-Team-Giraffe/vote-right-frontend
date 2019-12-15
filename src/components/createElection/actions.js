import { CREATE_ELECTION, LOADING_CREATE_USER } from './actionTypes';

/**
 * Triggers request to send details to an API to create an election
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const createElection = electionDetails => ({
    payload: electionDetails,
    type: CREATE_ELECTION,
});

/**
 * Triggers request a spinner to indicate that the server is currently loading a create election request
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const loadingCreateUser = truthyValue => ({
    payload: truthyValue,
    type: LOADING_CREATE_USER,
});

export default {
    createElection,
    loadingCreateUser,
};
