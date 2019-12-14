import {
    PUSH_VOTERS, LOADING_VOTERS,
    PUSH_CANDIDATES, LOADING_CANDIDATES

} from './actionTypes';

const pushVoters = (state = [], action) => {
    switch (action.type) {
    case PUSH_VOTERS:
        return [...action.payload];
    default:
        return state;
    }
};
const loadingVoters = (state = false, action) => {
    switch (action.type) {
    case LOADING_VOTERS:
        return action.payload;
    default:
        return state;
    }
};

const pushCandidates = (state = [], action) => {
    switch (action.type) {
    case PUSH_CANDIDATES:
        return [...action.payload];
    default:
        return state;
    }
};
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
