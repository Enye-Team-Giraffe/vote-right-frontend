// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';

// import custom items
import { LOAD_VOTERS } from './actionTypes';
import { WAIT_TIME } from './constants';
import actions from './actions';

function* loadVoters(){
    alert("working")
}

function* validateVotersSaga(){
    yield takeLatest(LOAD_VOTERS,loadVoters)
}

export default validateVotersSaga