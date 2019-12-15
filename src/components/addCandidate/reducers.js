import { LOADING_ADD_CANDIDATE } from './actionTypes';

/**
 * Triggers an operation to indicate adding candidates are currently loading
 * @function
 * @return {Object} The {@link actionTypes.LOADING_ADD_CANDIDATE LOADING_ADD_CANDIDATE} action.
 */
const addCandidateLoading = (state = false, action) => {
    switch (action.type) {
    case LOADING_ADD_CANDIDATE:
        return action.payload;
    default:
        return state;
    }
};
export default { addCandidateLoading };
