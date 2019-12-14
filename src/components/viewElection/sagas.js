// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import custom items
import { LOAD_ELECTIONS } from './actionTypes';
import { WAIT_TIME } from './constants';
import actions from './actions';

// import web3 dependencies
// const web3 = require('../../web3/configuredWeb3');
const electionFactory = require('../../web3/electionFactory');

/**
 * Watches for the {@link actionTypes.LOAD_ELECTIONS LOAD_ELECTIONS} action.
 * Posts election data to the server to create an election
 *
 * @return {void}
 */
function* loadElections() {
    // make async request to load data
    try {
        // get an array that determines the length of elections we have
        const electionsLength = yield electionFactory.methods.getDeployedElections().call();
        // for each election we have get the details of said election
        const electionDetails = yield Promise.all(
            electionsLength.map((_, index) => electionFactory.methods.summaries(index).call())
        );
        // by default get only running elections
        const runningElectionDetails = electionDetails
            // .filter(detail => detail.enddate > currentSeconds());
        yield put(actions.pushElections(runningElectionDetails));
        yield put(actions.loadingElections(false));
    } catch (err) {
        message.success(err.message, WAIT_TIME);
    }
}
function* validateLoaderSaga() {
    yield takeLatest(LOAD_ELECTIONS, loadElections);
}
export default validateLoaderSaga;
