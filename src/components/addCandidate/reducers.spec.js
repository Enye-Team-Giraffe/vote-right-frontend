/* eslint-disable max-lines-per-function */
import { LOADING_ADD_CANDIDATE } from './actionTypes';
import reducers from './reducers';

describe('AddCandidate reducers', () => {
    it('should handle LOADING_ADD_CANDIDATE', () => {
        const initialState = false;
        const payload = true;
        const action = {
            payload,
            type: LOADING_ADD_CANDIDATE,
        }
        expect(reducers.addCandidateLoading(initialState, action)).toEqual(payload)
    })

})