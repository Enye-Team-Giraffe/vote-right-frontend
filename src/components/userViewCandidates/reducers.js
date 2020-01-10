import { VOTING_LOADING } from './actionTypes';

const loading = false;

const loadingVotingReducer = (state = loading, action) => {
    switch (action.type) {
    case VOTING_LOADING:
        return action.payload;
    default:
        return state;
    }
};

export default { loadingVotingReducer };
