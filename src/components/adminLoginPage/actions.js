import {
    TOGGLE_LOADING_ADMIN, LOGIN_ADMIN, AUTHENTICATE_ADMIN, IS_ADMIN_LOGGEDIN
} from './actionTypes';

/**
 * Triggers request to authenticate an admin and log them in using firebase
 *
 * @function
 * @return {Object} The {@link actionTypes.LOGIN_ADMIN LOGIN_ADMIN} action.
 */
const loginAdmin = adminData => ({
    // return the actiontype and the password which has been appended with country code
    payload: adminData,
    type: LOGIN_ADMIN,
});

/**
 * Triggers request to start spinning the admin loader
 *indicating an async request is going on
 *
 * @function
 * @return {Object} The {@link actionTypes.TOGGLE_LOADING_ADMIN
 *                       TOGGLE_LOADING_ADMIN} action.
 */
const loadingAdmin = truthyvalue => ({
    payload: truthyvalue,
    type: TOGGLE_LOADING_ADMIN,
});

/**
 * Triggers request to change the admin's state to authenticated
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_ADMIN
 *                       AUTHENTICATE_ADMIN} action.
 */
const authenticateAdmin = truthyvalue => ({
    payload: truthyvalue,
    type: AUTHENTICATE_ADMIN,
});

/**
 * Triggers request to check if the admin is authenticated
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_ADMIN
 *                       AUTHENTICATE_ADMIN} action.
 */
const isAdminAuthenticated = () => ({
    type: IS_ADMIN_LOGGEDIN,
});

// export all our actions
export default {
    authenticateAdmin, isAdminAuthenticated, loadingAdmin, loginAdmin,
};
