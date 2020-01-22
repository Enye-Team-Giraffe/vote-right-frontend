import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { LOGIN_ADMIN, IS_ADMIN_LOGGEDIN } from './actionTypes';
import { WAIT_TIME, ADMIN_ALREADY_LOGGED } from './constants';
import { app, analytics } from '../configuredFirebase';
import actions from './actions';

/**
 * A function to add a user to a session.
 * @param {Object} user - the user to be added to the session.
 * @return {void}
 */
const addUserToSession = user => {
    const jsonUser = JSON.stringify(user);
    window.sessionStorage.setItem('user', jsonUser);
};

/**
 * Watches for the {@link actionTypes.LOGIN_ADMIN LOGIN_ADMIN} action.
 * Gets the requested data from the server.
 *
 * @return {void}
 */
function* FirebaseLoginAdmin(data) {
    const { email, password } = data.payload;
    try {
        //  signIn with mail and password
        yield app
            .auth()
            .signInWithEmailAndPassword(email, password);
        // stop  the spinner
        yield put(actions.loadingAdmin(false));
        addUserToSession({ email, password });
        message.success(ADMIN_ALREADY_LOGGED, WAIT_TIME);
        analytics.logEvent('admin_logged_in');
        yield put(actions.authenticateAdmin(true));
    } catch (error) {
        // if there was an error, say so and stop spinning the looader
        yield put(actions.loadingAdmin(false));
        message.error(error.message, WAIT_TIME);
    }
}

/**
 * Watches for the {@link actionTypes.IS_ADMIN_LOGGEDIN IS_ADMIN_LOGGEDIN} action.
 * Gets the requested data from the server.
 *
 * @return {void}
 */
function* isAdminLoggedIn() {
    const LoggedInAdmin = JSON.parse(window.sessionStorage.getItem('user'));
    // if there is currently a logged in user and he has an admin property
    if (LoggedInAdmin && LoggedInAdmin.email) {
        // set the adminAuthenticated state to true
        yield put(actions.authenticateAdmin(true));
    }
}

// map the sagas to their respective actionTypes
function* validateAdminSaga() {
    yield takeLatest(LOGIN_ADMIN, FirebaseLoginAdmin);
    yield takeLatest(IS_ADMIN_LOGGEDIN, isAdminLoggedIn);
}

// export this function
export default validateAdminSaga;
