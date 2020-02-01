/* eslint-disable max-lines-per-function */
import {ADD_CANDIDATE, LOADING_ADD_CANDIDATE, UPLOAD_PICTURE} from './actionTypes';
import actions from './actions';


describe('AddCandidate actions', () => {
    it('should create action to add candidate', () => {
        const electionId = '123456';
        const candidateDetails = {
            age: 44,
            name: 'Ava Tom',
        }
        const expectedAction = {
            electionId,
            payload: candidateDetails,
            type: ADD_CANDIDATE,
        }
        expect(actions.addCandidate(candidateDetails, electionId)).toEqual(expectedAction);
    })

    it('should create action to indicate adding candidate', () => {
        const payload = true;
        const expectedAction = {
            payload,
            type: LOADING_ADD_CANDIDATE,
        }
        expect(actions.loadingaddCandidate(payload)).toEqual(expectedAction);
    })

    it('create action to upload picture url', () => {
        const pictureUrl = 'https://pics.me//summer';
        const expectedAction = {
            payload: pictureUrl,
            type: UPLOAD_PICTURE,
        }
        expect(actions.uploadPicture(pictureUrl)).toEqual(expectedAction);
    })
})