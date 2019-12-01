import { LOGIN_USER, AUTHENTICATE_USER } from './actionTypes';

const loginUser = password => {
    const stringPasswordWithNumber = `+234${password}`;
    return {
        payload: stringPasswordWithNumber,
        type: LOGIN_USER,
    };
};

const authenticateUser = payload => {
    const password = `+234${payload.phoneNumber}`;
    const { nin } = payload;
    return {
        payload: { nin, password },
        type: AUTHENTICATE_USER,
    };
};
export default { authenticateUser, loginUser };
