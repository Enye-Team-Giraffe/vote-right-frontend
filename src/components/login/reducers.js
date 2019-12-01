// import { LOGIN_USER } from './actionTypes';
import {
    TOGGLE_LOADING_NIN,
    TOGGLE_CONFFIRMATION_CODE,
    AUTHENTICATE_USER_STATUS
} from './actionTypes';

// define the default state of the loader to be false

const loading = false;

// make the current state of loader to be false
const loginLoandingReducer = (state = loading, action) => {
    switch (action.type) {
    case TOGGLE_LOADING_NIN:
        return action.payload;
    default:
        return state;
    }
};

const confirmReducer = (state = false, action) => {
    switch (action.type) {
    case TOGGLE_CONFFIRMATION_CODE:
        return action.payload;
    default:
        return state;
    }
};

const authenticateUserReducer = (state = false, action) => {
    switch (action.type) {
    case AUTHENTICATE_USER_STATUS:
        return action.payload;
    default:
        return state;
    }
};

// export this value
export default { authenticateUserReducer, confirmReducer, loginLoandingReducer };
