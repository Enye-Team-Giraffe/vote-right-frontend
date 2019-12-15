import { PUSH_ELECTIONS, LOADING_ELECTION } from './actionTypes';
/**
 * Triggers an operation to push the gotten elections to state
 * @function
 * @return {Object} The {@link actionTypes.PUSH_ELECTIONS PUSH_ELECTIONS} action.
 */
const pushElections = (state = [], action) => {
    switch (action.type) {
    case PUSH_ELECTIONS:
        return [...action.payload];
    default:
        return state;
    }
};
/**
 * Triggers an operation to indicate elections are currently loading
 * @function
 * @return {Object} The {@link actionTypes.LOADING_ELECTION LOADING_ELECTION} action.
 */
const loadingElections = (state = true, action) => {
    switch (action.type) {
    case LOADING_ELECTION:
        return action.payload;
    default:
        return state;
    }
};
export default { loadingElections, pushElections };
