import { LOADING_ADD_CANDIDATE } from './actionTypes';

const initialState = {
    candidate: false,
    pictureLink: null,
};

/**
 * Triggers an operation to indicate adding candidates are currently loading
 * @function
 * @return {Object} The {@link actionTypes.LOADING_ADD_CANDIDATE LOADING_ADD_CANDIDATE} action.
 */
const addCandidateLoading = (state = initialState, action) => {
    switch (action.type) {
    case LOADING_ADD_CANDIDATE:
        return {
            ...state,
            candidate: action.payload,
        };
    default:
        return state;
    }
};
export default { addCandidateLoading };
