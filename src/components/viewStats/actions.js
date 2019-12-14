import {
    LOAD_VOTERS, PUSH_VOTERS,
    LOADING_VOTERS
} from './actionTypes';

const loadVoters = electionId => ({
    payload: electionId,
    type: LOAD_VOTERS,
});
const pushVoters = votersArray => ({
    payload: votersArray,
    type: PUSH_VOTERS,
});
const loadingVoters = truthyValue => ({
    payload: truthyValue,
    type: LOADING_VOTERS,
});
export default {
    loadVoters,
    loadingVoters,
    pushVoters,
};
