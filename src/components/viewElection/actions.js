import {
    LOAD_ELECTIONS, PUSH_ELECTIONS,
    LOADING_ELECTION
} from './actionTypes';

/**
 * Triggers request to spin indication that it is currently performing an async
 * @function
 * @return {Object} The {@link actionTypes.LOAD_ELECTIONS LOAD_ELECTIONS} action.
 */
const loadElections = () => ({
    type: LOAD_ELECTIONS,
});
/**
 * Triggers request to spin indication that it is currently performing an async
 * @function
 * @return {Object} The {@link actionTypes.PUSH_ELECTIONS PUSH_ELECTIONS} action.
 */
const pushElections = electionsArray => ({
    payload: electionsArray,
    type: PUSH_ELECTIONS,
});
/**
 * Triggers request to spin indication that it is currently performing an async
 * @function
 * @return {Object} The {@link actionTypes.LOADING_ELECTION LOADING_ELECTION} action.
 */
const loadingElections = truthyValue => ({
    payload: truthyValue,
    type: LOADING_ELECTION,
});

export default {
    loadElections,
    loadingElections,
    pushElections,
};
