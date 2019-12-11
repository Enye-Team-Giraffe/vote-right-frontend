// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import personal modules
import { CREATE_ELECTION } from './actionTypes';
import {
    BASE_URL, SUCCESS_STATUS,
    ERROR_STATUS, WAIT_TIME
} from './constants';
import actions from './actions';

/**
 * A function to check the content of a response and show a message accordingly
 * @function
 * @param {response} event - a response object returned by the server
 */
function checkResponse(response) {
    // check the response for different statuses
    // and then respond accordingly
    if (response.status === ERROR_STATUS) {
        message.error(response.message, WAIT_TIME);
    } else if (response.status === SUCCESS_STATUS) {
        // if succesful then alert the user
        message.success(response.data, WAIT_TIME);
    } else {
        // something unknown happened
        message.error('unknown error', WAIT_TIME);
    }
}

/**
 * Watches for the {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 * Posts election data to the server to create an election
 *
 * @return {void}
 */
function* createElection(action) {
    // make a call to the create Election API
    // passing in the details of the election
    const response = yield fetch(`${BASE_URL}/election/create`, {
        body: JSON.stringify(action.payload),
        header: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
        .then(res => res.json())
        .then(res => res)
        .catch(() => { message.error('there was a server error', WAIT_TIME); });
    yield put(actions.loadingCreateUser(false));
    checkResponse(response);
}

// map the sagas to their respective actionTypes
function* validateUserSaga() {
    yield takeLatest(CREATE_ELECTION, createElection);
}

// export this function
export default validateUserSaga;
