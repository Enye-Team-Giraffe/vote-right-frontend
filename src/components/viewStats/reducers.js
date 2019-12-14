import {
    PUSH_VOTERS, LOADING_VOTERS,
    PUSH_CANDIDATES, LOADING_CANDIDATES

} from './actionTypes';

/**
 * Triggers an operation to push the gotten voters to state
 * @function
 * @return {Object} The {@link actionTypes.PUSH_VOTERS PUSH_VOTERS} action.
 */
const pushVoters = (state = [], action) => {
    switch (action.type) {
    case PUSH_VOTERS:
        return [...action.payload];
    default:
        return state;
    }
};
/**
 * Triggers an operation to spin the loader indicating loading voters
 * @function
 * @return {Object} The {@link actionTypes.LOADING_VOTERS LOADING_VOTERS} action.
 */
const loadingVoters = (state = false, action) => {
    switch (action.type) {
    case LOADING_VOTERS:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an operation to push the gotten candidates to state
 * @function
 * @return {Object} The {@link actionTypes.PUSH_CANDIDATES PUSH_CANDIDATES} action.
 */
const pushCandidates = (state = [], action) => {
    switch (action.type) {
    case PUSH_CANDIDATES:
        return [...action.payload];
    default:
        return state;
    }
};
/**
 * Triggers an operation to spin the loader indicating loading candidates
 * @function
 * @return {Object} The {@link actionTypes.LOADING_CANDIDATES LOADING_CANDIDATES} action.
 */
const loadingCandidates = (state = false, action) => {
    switch (action.type) {
    case LOADING_CANDIDATES:
        return action.payload;
    default:
        return state;
    }
};
export default {
    loadingCandidates,
    loadingVoters,
    pushCandidates,
    pushVoters,
};
