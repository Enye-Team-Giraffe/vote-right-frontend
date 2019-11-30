import { takeLatest } from 'redux-saga/effects';
import { AUTHENTICATE_USER } from './actionTypes';

/**
 * Watches for the {@link actionTypes.authenticateUser authenticateUser} action.
 * Gets the requested data from the server.
 *
 * @return {void}
 */
// function to validate the NIN using API calls
function* validateNIN(action) {
    yield action;
}

// map the validateNIN function to the loginuser function
function* validateNINSaga() {
    yield takeLatest(AUTHENTICATE_USER, validateNIN);
}

// export this function
export default validateNINSaga;
