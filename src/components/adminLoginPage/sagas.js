import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { LOGIN_ADMIN, IS_ADMIN_LOGGEDIN } from './actionTypes';
import { WAIT_TIME, ADMIN_ALREADY_LOGGED, SUCCESS_SIGNIN } from './constants';
import { app } from '../configuredFirebase';
import actions from './actions';

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
        // if there was no error, then we can go ahead
        message.success(SUCCESS_SIGNIN, WAIT_TIME);
        // stop  the spinner
        yield put(actions.loadingAdmin(false));
        // set the state variable authenticated as true
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
    // create a promise that when called returns the logged in user
    const authPromise = new Promise((resolve => {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user);
            }
        });
    }));
    const LoggedInAdmin = yield authPromise.then(user => user);
    // if there is currently a logged in user and he has an admin property
    if (LoggedInAdmin && LoggedInAdmin.email) {
        // set the adminAuthenticated state to true
        yield put(actions.authenticateAdmin(true));
        message.success(ADMIN_ALREADY_LOGGED, WAIT_TIME);
    }
}

// map the sagas to their respective actionTypes
function* validateAdminSaga() {
    yield takeLatest(LOGIN_ADMIN, FirebaseLoginAdmin);
    yield takeLatest(IS_ADMIN_LOGGEDIN, isAdminLoggedIn);
}

// export this function
export default validateAdminSaga;
