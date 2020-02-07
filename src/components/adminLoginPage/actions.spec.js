/* eslint-disable max-lines-per-function */
import {
    TOGGLE_LOADING_ADMIN, LOGIN_ADMIN, AUTHENTICATE_ADMIN, IS_ADMIN_LOGGEDIN
} from './actionTypes';
import actions from './actions';

describe('Admin login actions', () => {
    it('should create an action to login admin', () => {
        const payload = {
            email: 'example@email.com',
            password: '123456',
        };
        const expectedAction = {
            payload,
            type: LOGIN_ADMIN,
        };
        expect(actions.loginAdmin(payload)).toEqual(expectedAction);
    });

    it('should create an action to load admin', () => {
        const payload = true;
        const expectedAction = {
            payload,
            type: TOGGLE_LOADING_ADMIN,
        };
        expect(actions.loadingAdmin(payload)).toEqual(expectedAction);
    });

    it('should create an action to authenticate admin', () => {
        const payload = true;
        const expectedAction = {
            payload,
            type: AUTHENTICATE_ADMIN,
        };
        expect(actions.authenticateAdmin(payload)).toEqual(expectedAction);
    });

    it('should create an action to check admin authentication status', () => {
        const expectedAction = {
            type: IS_ADMIN_LOGGEDIN,
        };
        expect(actions.isAdminAuthenticated()).toEqual(expectedAction);
    });
});
