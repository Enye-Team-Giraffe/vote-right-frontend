import { takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { LOGOUT } from './actionTypes';
import { LOGOUT_SUCESSFULL, WAIT_TIME } from './constants';

/**
 * Watches for the {@link actionTypes.LOGOUT LOGOUT} action.
 * This function recieves in an history object
 * which it uses to redirect the user to the homepageafter logout
 * @param {History} body - the data to send to the endpoint {payload:History}
 * @return {void}
 */
function* logout(action) {
    // signout of from the session
    window.sessionStorage.removeItem('user');
    // alert the user that the logout was sucessfull
    message.success(LOGOUT_SUCESSFULL, WAIT_TIME);
    // redirect the user to the home page
    action.payload.push('/');
    // yield an action that we were sucessfull
    yield true;
}

// map the saga to the functoin
function* logoutSaga() {
    yield takeLatest(LOGOUT, logout);
}

export default logoutSaga;
