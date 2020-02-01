// import { LOGIN_USER } from './actionTypes';
import {
    TOGGLE_LOADING_NIN,
    TOGGLE_CONFFIRMATION_CODE,
    AUTHENTICATE_USER_STATUS,
    PUSH_USER_PHONE_NUMBER,
    PUSH_USER_DETAILS
} from './actionTypes';

// define the default state of the loader to be false

const loading = false;

/**
 * Triggers an operation to spin the loader indicating loading login state
 * @function
 * @return {Object} The {@link actionTypes.TOGGLE_LOADING_NIN TOGGLE_LOADING_NIN} action.
 */
const loginLoandingReducer = (state = loading, action) => {
    switch (action.type) {
    case TOGGLE_LOADING_NIN:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an operation to open the section to input your confirmation code
 * @function
 * @return {Object} The {@link actionTypes.TOGGLE_CONFFIRMATION_CODE
 *                       TOGGLE_CONFFIRMATION_CODE} action.
 */
const confirmReducer = (state = false, action) => {
    switch (action.type) {
    case TOGGLE_CONFFIRMATION_CODE:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an operation to change a state to indicate if a user is logged in
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_USER_STATUS
 * AUTHENTICATE_USER_STATUS} action.
 */
const authenticateUserReducer = (state = false, action) => {
    switch (action.type) {
    case AUTHENTICATE_USER_STATUS:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an operation to add a user's details to the state
 * @function
 * @return {Object} The {@link actionTypes.PUSH_USER_PHONE_NUMBER
 * PUSH_USER_PHONE_NUMBER} action.
 */
const pushPhoneNumberReducer = (state = '', action) => {
    switch (action.type) {
    case PUSH_USER_PHONE_NUMBER:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an operation to add a user's details to the state
 * @function
 * @return {Object} The {@link actionTypes.PUSH_USER_DETAILS
 * PUSH_USER_DETAILS} action.
 */
const pushUserDetails = (state = {}, action) => {
    switch (action.type) {
    case PUSH_USER_DETAILS:
        return action.payload;
    default:
        return state;
    }
};

// export this value
export default {
    authenticateUserReducer,
    confirmReducer,
    loginLoandingReducer,
    pushPhoneNumberReducer,
    pushUserDetails,
};
