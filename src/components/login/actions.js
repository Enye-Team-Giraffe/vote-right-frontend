import { LOGIN_USER, AUTHENTICATE_USER } from './actionTypes';
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

const authenticateUser = payload => {
    // convert the password to string for easy slicing and nomenclature
    const stringPassword = String(payload.phoneNumber);
    const password = `+234${stringPassword}`;
    const { nin } = payload;

    return {
        payload: { nin, password },
        type: AUTHENTICATE_USER,
    };
};

// export the loginUser and authenticateUser as an object.
export default { authenticateUser, loginUser };
