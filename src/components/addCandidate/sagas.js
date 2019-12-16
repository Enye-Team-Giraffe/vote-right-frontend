/* eslint-disable max-lines-per-function */
// import the required modules from npm
import { takeLatest, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import { storage } from '../configuredFirebase/index';
// import personal modules
import { ADD_CANDIDATE, UPLOAD_PICTURE } from './actionTypes';
import {
    FIELDS, INCOMPLETE_FIELDS, WAIT_TIME, LARGE_GAS, SUCCESS,
    ELECTION_STARTED_ERROR
} from './constants';
import actions from './actions';

// import web3 dependencies
const uuidv4 = require('uuid/v4');
const web3 = require('../../web3/configuredWeb3');
const getElectionInterface = require('../../web3/election');

let picture = null;

const isMissingField = check => {
    /* eslint-disable no-restricted-syntax */
    for (const key of FIELDS) {
        if (check[key] === undefined) {
            return true;
        }
    }
    return false;
};


/**
 * Posts candidates picture to server
 * function
 * @param {file} - file intended for upload
 * @return {void}
 */

const uploadPicture = file => {
    storage.ref(`images/${file.uid}`).put(file);
};

/**
 * Get url for picture from server
 * function
 * @param {file} - file intended for upload
 * @return {void}
 */
async function getPictureLink(file) {
    const url = await storage.ref('images').child(file.uid).getDownloadURL();
    return url;
}

/**
 * Watches for the {@link actionTypes.UPLOAD_PICTURE UPLOAD_PICTURE} action.
 * Posts candidate's picture to the server
 * @return {void}
 */

function* uploadPictureSaga(action) {
    picture = action.payload;
    yield call(() => uploadPicture(action.payload));
}

/**
 * Watches for the {@link actionTypes.ADD_CANDIDATE ADD_CANDIDATE} action.
 * Posts election data to the server to create an election
 * @return {void}
 */

function* addCandidate(action) {
    const newCandidate = {};
    const body = action.payload;
    const electionAddress = action.electionId;
    /*
    *await ajax request to upload images and return a link
    */
    const pictureLink = yield call(() => getPictureLink(picture));
    if (!body.dateOfBirth) {
        message.error(INCOMPLETE_FIELDS, WAIT_TIME);
        return;
    }
    // assign the payload to the body of newcandidate
    newCandidate.id = uuidv4();
    newCandidate.name = body.name;
    newCandidate.age = 2019 - Number(body.dateOfBirth.slice(-4));
    newCandidate.party = body.party;
    newCandidate.quote = body.quote;
    newCandidate.pictureLink = pictureLink;
    newCandidate.education = body.education;
    // validate the entered data
    if (isMissingField(newCandidate)) {
        message.error(INCOMPLETE_FIELDS, WAIT_TIME);
        return;
    }
    // get the interface to the election
    const electionInterface = yield getElectionInterface(electionAddress);
    // get the address of the account to use
    const [account] = yield web3.eth.getAccounts();
    // make the transaction to the blockchain
    try {
        yield electionInterface.methods.addCandidate(
            newCandidate.id, newCandidate.name,
            newCandidate.age, newCandidate.party,
            newCandidate.quote, newCandidate.pictureLink,
            newCandidate.education
        )
            .send({ from: account, gas: LARGE_GAS });
        message.success(SUCCESS, WAIT_TIME);
    } catch (err) {
        message.error(ELECTION_STARTED_ERROR, WAIT_TIME);
    } finally {
        yield put(actions.loadingaddCandidate(false));
    }
}

// map the sagas to their respective actionTypes
function* validateCandidateSaga() {
    yield takeLatest(ADD_CANDIDATE, addCandidate);
    yield takeLatest(UPLOAD_PICTURE, uploadPictureSaga);
}
// export this function
export default validateCandidateSaga;
