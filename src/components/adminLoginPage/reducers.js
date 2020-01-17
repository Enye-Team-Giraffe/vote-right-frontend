// import { LOGIN_USER } from './actionTypes';
import { TOGGLE_LOADING_ADMIN, AUTHENTICATE_ADMIN } from './actionTypes';

// define the default state of the loader to be false
const loading = false;
const authenticatedAdmin = false;

// make the current state of loader to be false
const loginAdminReducer = (state = loading, action) => {
    switch (action.type) {
    case TOGGLE_LOADING_ADMIN:
        return action.payload;
    default:
        return state;
    }
};
/**
 * Triggers an o peration to change a state indicating an admin has been logged in
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_ADMIN AUTHENTICATE_ADMIN} action.
 */
const authenticateAdminReducer = (state = authenticatedAdmin, action) => {
    switch (action.type) {
    case AUTHENTICATE_ADMIN:
        return action.payload;
    default:
        return state;
    }
};

// export this value
export default { authenticateAdminReducer, loginAdminReducer };
