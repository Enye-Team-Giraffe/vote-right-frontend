import { takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { LOGOUT } from './actionTypes';
import { app } from '../configuredFirebase';
import { LOGOUT_SUCESSFULL, WAIT_TIME } from './constants';

/**
 * Watches for the {@link actionTypes.LOGOUT LOGOUT} action.
 * This function recieves in an history object
 * which it uses to redirect the user to the homepageafter logout
 * @param {History} body - the data to send to the endpoint {payload:History}
 * @return {void}
 */
function* logout(action) {
    // signout of firebase
    yield app.auth().signOut().then(() => {
        message.success(LOGOUT_SUCESSFULL, WAIT_TIME);
        action.payload.push('/');
    }).catch(error => {
        message.success(error.message, WAIT_TIME);
    });
}

// map the saga to the functoin
function* logoutSaga() {
    yield takeLatest(LOGOUT, logout);
}

export default logoutSaga;
