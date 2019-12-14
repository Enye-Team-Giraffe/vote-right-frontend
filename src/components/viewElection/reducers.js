import { PUSH_ELECTIONS, LOADING_ELECTION } from './actionTypes';

const pushElections = (state = [], action) => {
    switch (action.type) {
    case PUSH_ELECTIONS:
        return [...action.payload];
    default:
        return state;
    }
};
const loadingElections = (state = true, action) => {
    switch (action.type) {
    case LOADING_ELECTION:
        return action.payload;
    default:
        return state;
    }
};
export default { loadingElections, pushElections };
