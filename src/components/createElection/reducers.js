import { LOADING_CREATE_USER } from './actionTypes';

// create the reducer responsible for changing thi value
const createUserLoading = (state = false, action) => {
    switch (action.type) {
    case LOADING_CREATE_USER:
        return action.payload;
    default:
        return state;
    }
};

export default { createUserLoading };
