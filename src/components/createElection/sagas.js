// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import personal modules
import { CREATE_ELECTION } from './actionTypes';
import {
    WAIT_TIME, LARGE_GAS,
    CREATE_ELECTION_SUCCESS, VIEW_ELECTIONS_PATH,
    ADMIN_CREATE_ELECTION
} from './constants';
import actions from './actions';
import { analytics } from '../configuredFirebase';

// import web3 dependencies
const web3 = require('../../web3/configuredWeb3');
const electionFactory = require('../../web3/electionFactory');

/**
 * Watches for the {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 * Posts election data to the server to create an election
 *
 * @return {void}
 */
function* createElection(action) {
    const body = action.payload;
    try {
        // get the current account we are working with
        const [account] = yield web3.eth.getAccounts();
        // make this transaction on the blockchain
        yield electionFactory.methods.createElection(body.name, body.description,
            body.startDate, body.endDate).send({
            from: account, gas: LARGE_GAS,
        });
        message.success(CREATE_ELECTION_SUCCESS, WAIT_TIME);
        analytics.logEvent(ADMIN_CREATE_ELECTION);
        // redirect to the view all elecitons tab
        body.history.push(VIEW_ELECTIONS_PATH);
    } catch (err) {
        message.error(err.message, WAIT_TIME);
    }
    // all asynchronous operations are done stop the spinner
    yield put(actions.loadingCreateUser(false));
}

// map the sagas to their respective actionTypes
function* validateUserSaga() {
    yield takeLatest(CREATE_ELECTION, createElection);
}
// export this function
export default validateUserSaga;
