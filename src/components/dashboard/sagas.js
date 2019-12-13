import { takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import { LOGOUT } from './actionTypes';
import { app } from '../configuredFirebase';
import { LOGOUT_SUCESSFULL, WAIT_TIME } from './constants';
function* logout(action) {
    yield app.auth().signOut().then(() => {
        message.success(LOGOUT_SUCESSFULL, WAIT_TIME);
        action.payload.push('/');
    }).catch(error => {
        message.success(error.message, WAIT_TIME);
    });
}
function* logoutSaga() {
    yield takeLatest(LOGOUT, logout);
}
export default logoutSaga;
