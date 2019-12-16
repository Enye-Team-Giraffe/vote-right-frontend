import {
    ADD_CANDIDATE, LOADING_ADD_CANDIDATE, UPLOAD_PICTURE, UPDATE_PICTURE_LINK
} from './actionTypes';

/**
 * Triggers request to send details to an API to create an election
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const addCandidate = (candidateDetails, electionId) => ({
    electionId,
    payload: candidateDetails,
    type: ADD_CANDIDATE,
});

/**
 * Triggers request a spinner to indicate that the server is currently loading a create user request
 *
 * @function
 * @return {Object} The {@link actionTypes.CREATE_ELECTION CREATE_ELECTION} action.
 */
const loadingaddCandidate = truthyValue => ({
    payload: truthyValue,
    type: LOADING_ADD_CANDIDATE,
});

/**
 * Triggers request to upload picture
 *
 * @function
 * @return {Object} The {@link actionTypes.UPLOAD_PICTURE UPLOAD_PICTURE} action.
 */
const uploadPicture = file => ({
    payload: file,
    type: UPLOAD_PICTURE,
});

export default {
    addCandidate,
    loadingaddCandidate,
    uploadPicture,
};
