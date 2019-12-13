import { LOGOUT } from './actionTypes';
const logoutUser = history => ({
    payload: history,
    type: LOGOUT,
});
export default { logoutUser };
