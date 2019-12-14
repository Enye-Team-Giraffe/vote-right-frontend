import {
     PUSH_VOTERS,
    LOADING_VOTERS
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
export default { loadingVoters, pushVoters };