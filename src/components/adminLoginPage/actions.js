import {
    TOGGLE_LOADING_ADMIN, LOGIN_ADMIN, AUTHENTICATE_ADMIN, IS_ADMIN_LOGGEDIN
} from './actionTypes';
const loginAdmin = adminData => ({
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
