// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import personal modules
import { ADD_CANDIDATE, LOADING_ADD_CANDIDATE } from './actionTypes';

// import web3 dependencies
const web3 = require('../../web3/configuredWeb3');
const electionFactory = require('../../web3/electionFactory');

/**
 * Watches for the {@link actionTypes.ADD_CANDIDATE ADD_CANDIDATE} action.
 * Posts election data to the server to create an election
 * @return {void}
 */

 function* addCandidate(action){
     const body=action.payload;
     alert('working')
 }


// map the sagas to their respective actionTypes
function* validateCandidateSaga() {
    yield takeLatest(ADD_CANDIDATE, addCandidate);
}
// export this function
export default validateCandidateSaga;