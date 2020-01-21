/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import custom items
import { LOAD_ELECTIONS } from './actionTypes';
import { WAIT_TIME } from './constants';
import actions from './actions';

// import custom items
const getElectionInterface = require('../../web3/election');
const electionFactory = require('../../web3/electionFactory');

/**
 * Watches for the {@link actionTypes.LOAD_ELECTIONS LOAD_ELECTIONS} action.
 * Posts election data to the server to create an election
 *
 * @return {void}
 */
function* loadElections(action) {
    // make async request to load data
    try {
        // get an array that determines the length of elections we have
        const electionsLength = yield electionFactory.methods.getDeployedElections().call();
        // for each election we have get the details of said election
        const electionDetails = yield Promise.all(
            electionsLength.map((_, index) => electionFactory.methods.summaries(index).call())
        );
        // by default get only running elections
        const runningElectionDetails = electionDetails;
        // .filter(detail => detail.enddate > currentSeconds());
        const electionAdresses = runningElectionDetails.map(election => election.location);
        // get the minimal stats for all the elections elections
        const statistics = yield Promise.all(
            electionAdresses.map(async address => {
                const electionInterface = await getElectionInterface(address);
                const statistic = await electionInterface.methods.getStats().call();
                const statisticArray = Array.from(Object.values(statistic));
                const phoneNumber = action.payload || 'default';
                const hasVoted = await electionInterface.methods.hasVoted(phoneNumber).call();
                statisticArray.push(hasVoted);
                return statisticArray;
            })
        );
        // map the election ID's to their stats for easy retrieval from the state
        const addressToStatsMap = electionAdresses
            .reduce((previousDictionary, currentAdress, currentIndex) => {
                previousDictionary[currentAdress] = statistics[currentIndex];
                return previousDictionary;
            }, {});
        // yield the actions to be made
        yield put(actions.pushStatistics(addressToStatsMap));
        yield put(actions.pushElections(runningElectionDetails));
        yield put(actions.loadingElections(false));
    } catch (err) {
        message.error(err.message, WAIT_TIME);
    }
}
function* validateLoaderSaga() {
    yield takeLatest(LOAD_ELECTIONS, loadElections);
}
export default validateLoaderSaga;
