import {
    LOGIN_USER, AUTHENTICATE_USER, TOGGLE_LOADING_NIN,
    TOGGLE_CONFFIRMATION_CODE, CONFIRM_CODE, AUTHENTICATE_USER_STATUS, IS_USER_LOGGEDIN,
    PUSH_USER_PHONE_NUMBER
} from './actionTypes';

/**
 * Triggers request to send a code to a phone number
 *
 * @function
 * @return {Object} The {@link actionTypes.LOGIN_USER LOGIN_USER} action.
 */
const loginUser = phoneNumber => ({
    payload: phoneNumber,
    type: LOGIN_USER,
});

/**
 * Triggers request to NIN API and confirm that user is indeed a citizen
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_USER AUTHENTICATE_USER} action.
 */
const authenticateUser = payload => {
    // convert the password to string for easy slicing and nomenclature
    const stringPassword = String(payload.phoneNumber);
    const phoneNumber = `+234${stringPassword.slice(1)}`;

    // return the actiontype and the password which has been appended with country code
    return {
        payload: { phoneNumber },
        type: AUTHENTICATE_USER,
    };
};

/** Triggers a function which spins a loader indicating loading action
 *
 * @function
 * @return {Object} The {@link actionTypes.TOGGLE_LOADING_NIN TOGGLE_LOADING_NIN} action.
 */
const loadingReducer = truthyvalue => ({
    payload: truthyvalue,
    type: TOGGLE_LOADING_NIN,
});

/** Triggers a function which changes a state variable
 * this then indicates that the user needs to input a confirmation code
 * and it opens that section on the interface
 *
 * @function
 * @return {Object} The {@link actionTypes.TOGGLE_LOADING_NIN TOGGLE_LOADING_NIN} action.
 */
const confirmationCodeSection = truthyvalue => ({
    payload: truthyvalue,
    type: TOGGLE_CONFFIRMATION_CODE,
});

/** Triggers a function which changes a state variable
 * this then indicates that the user has been authenticated
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_USER_STATUS
 *                                          AUTHENTICATE_USER_STATUS} action.
 */
const authenticateUserStatus = truthyvalue => ({
    payload: truthyvalue,
    type: AUTHENTICATE_USER_STATUS,
});

/** Triggers a function which changes a state variable
 * this then indicates that the user has to confirm a code
 * it triggers a saga which uses firebase to confirm
 * if the code the user entered is what was sent to their phone
 *
 * @function
 * @return {Object} The {@link actionTypes.CONFIRM_CODE CONFIRM_CODE} action.
 */
const confirmCode = code => ({
    payload: code,
    type: CONFIRM_CODE,
});

/** Triggers a function which checks the auth status of the user
 * @function
 * @return {Object} The {@link actionTypes.IS_USER_LOGGEDIN IS_USER_LOGGEDIN} action.
 */
const isUserAuthenticated = () => ({
    type: IS_USER_LOGGEDIN,
});

/** Triggers a function to save the phone number of the current logged in user to state
 * @function
 * @return {Object} The {@link actionTypes.IS_USER_LOGGEDIN IS_USER_LOGGEDIN} action.
 */
const pushUserPhoneNumber = phoneNumber => ({
    payload: phoneNumber,
    type: PUSH_USER_PHONE_NUMBER,
});

/** Triggers a function to add a user to the state
 * @function
 * @return {Object} The {@link actionTypes.IS_USER_LOGGEDIN IS_USER_LOGGEDIN} action.
 */
const pushUserDetails = userDetails => ({
    payload: userDetails,
    type: PUSH_USER_PHONE_NUMBER,
});

// export the loginUser and authenticateUser as an object.
export default {
    authenticateUser,
    authenticateUserStatus,
    confirmCode,
    confirmationCodeSection,
    isUserAuthenticated,
    loadingReducer,
    loginUser,
    pushUserDetails,
    pushUserPhoneNumber,
};
