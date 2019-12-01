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
const loadingAdmin = truthyvalue => ({
    payload: truthyvalue,
    type: TOGGLE_LOADING_ADMIN,
});
const authenticateAdmin = truthyvalue => ({
    payload: truthyvalue,
    type: AUTHENTICATE_ADMIN,
});
const isAdminAuthenticated = () => ({
    type: IS_ADMIN_LOGGEDIN,
});

// export all our actions
export default {
    authenticateAdmin, isAdminAuthenticated, loadingAdmin, loginAdmin,
};
