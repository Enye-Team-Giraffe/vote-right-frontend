import { LOADING_CREATE_USER } from './actionTypes';
/**
 * Triggers an operation to indicate creating elections are currently loading
 * @function
 * @return {Object} The {@link actionTypes.LOADING_ELECTION LOADING_ELECTION} action.
 */
const createUserLoading = (state = false, action) => {
    switch (action.type) {
    case LOADING_CREATE_USER:
        return action.payload;
    default:
        return state;
    }
};
export default { createUserLoading };
