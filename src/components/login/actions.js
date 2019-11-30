import { LOGIN_USER, AUTHENTICATE_USER } from './actionTypes';

/**
 * Triggers request to authenticate user and log them in using firebase
 *
 * @function
 * @return {Object} The {@link actionTypes.LOGIN_USER LOGIN_USER} action.
 */
const loginUser = password => {
    // convert the password to string for easy slicing and nomenclature
    const stringPassword = String(password);
    const stringPasswordWithNumber = `+234${stringPassword}`;

    // return the actiontype and the password which has been appended with country code
    return {
        payload: stringPasswordWithNumber,
        type: LOGIN_USER,
    };
};

/**
 * Triggers request to NIN API and confirm that user is indeed a citizen
 *
 * @function
 * @return {Object} The {@link actionTypes.AUTHENTICATE_USER AUTHENTICATE_USER} action.
 */
const authenticateUser = payload => {
    // convert the password to string for easy slicing and nomenclature
    const stringPassword = String(payload.phoneNumber);
    const password = `+234${stringPassword}`;
    const { nin } = payload;

    // return the actiontype and the password which has been appended with country code
    return {
        payload: { nin, password },
        type: AUTHENTICATE_USER,
    };
};

// export the loginUser and authenticateUser as an object.
export default { authenticateUser, loginUser };
