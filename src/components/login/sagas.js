import { takeLatest } from 'redux-saga/effects';
import { AUTHENTICATE_USER } from './actionTypes';

function* validateNIN(action) {
    yield action;
}
function* validateNINSaga() {
    yield takeLatest(AUTHENTICATE_USER, validateNIN);
}
export default validateNINSaga;
