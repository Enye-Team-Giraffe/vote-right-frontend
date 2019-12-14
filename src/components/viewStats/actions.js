import {
    LOAD_VOTERS, PUSH_VOTERS, LOADING_VOTERS,
    LOAD_CANDIDATES, PUSH_CANDIDATES, LOADING_CANDIDATES
} from './actionTypes';

/**
 * Triggers request to load voters asynchronously
 * @function
 * @return {Object} The {@link actionTypes.LOAD_VOTERS LOAD_VOTERS} action.
 */
const loadVoters = electionId => ({
    payload: electionId,
    type: LOAD_VOTERS,
});
/**
 * Triggers request to add voters to state asynchronously
 * @function
 * @return {Object} The {@link actionTypes.PUSH_VOTERS PUSH_VOTERS} action.
 */
const pushVoters = votersArray => ({
    payload: votersArray,
    type: PUSH_VOTERS,
});
/**
 * Triggers request to spin indication that it is currently performing an async
 * @function
 * @return {Object} The {@link actionTypes.LOADING_VOTERS LOADING_VOTERS} action.
 */
const loadingVoters = truthyValue => ({
    payload: truthyValue,
    type: LOADING_VOTERS,
});
/**
 * Triggers request to load votcandidatesers asynchronously
 * @function
 * @return {Object} The {@link actionTypes.LOAD_CANDIDATES LOAD_CANDIDATES} action.
 */
const loadCandidates = electionId => ({
    payload: electionId,
    type: LOAD_CANDIDATES,
});
/**
 * Triggers request to add voters to state asynchronously
 * @function
 * @return {Object} The {@link actionTypes.PUSH_VOTERS PUSH_VOTERS} action.
 */
const pushCandidates = candidatesArray => ({
    payload: candidatesArray,
    type: PUSH_CANDIDATES,
});
/**
 * Triggers request to spin indication that it is currently performing an async
 * @function
 * @return {Object} The {@link actionTypes.LOADING_CANDIDATES LOADING_CANDIDATES} action.
 */
const loadingCandidates = truthyValue => ({
    payload: truthyValue,
    type: LOADING_CANDIDATES,
});

export default {
    loadCandidates,
    loadVoters,
    loadingCandidates,
    loadingVoters,
    pushCandidates,
    pushVoters,
};
