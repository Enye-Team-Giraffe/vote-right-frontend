import { LOGOUT } from './actionTypes';

/**
 * Triggers request to logout a user or an admin
 * It then redirects the user to the home page
 * @function
 * @return {Object} The {@link actionTypes.LOGOUT LOGOUT} action.
 */
const logoutUser = history => ({
    payload: history,
    type: LOGOUT,
});

export default { logoutUser };
