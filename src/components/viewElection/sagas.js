// import the required modules from npm
import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import { LOAD_ELECTIONS } from "./actionTypes"

function* loadElections(){
    // make async request to load data
}
function* validateLoaderSaga(){
    yield takeLatest(LOAD_ELECTIONS,loadElections)
}
export default validateLoaderSaga;