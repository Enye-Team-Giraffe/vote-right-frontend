import {
    LOAD_VOTERS, PUSH_VOTERS, LOADING_VOTERS,
    LOAD_CANDIDATES, PUSH_CANDIDATES, LOADING_CANDIDATES
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

const loadCandidates = electionId => ({
    payload: electionId,
    type: LOAD_CANDIDATES,
});

const pushCandidates = candidatesArray => ({
    payload: candidatesArray,
    type: PUSH_CANDIDATES,
});

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
