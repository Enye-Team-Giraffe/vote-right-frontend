import { TOGGLE_LOADING_ADMIN, AUTHENTICATE_ADMIN } from './actionTypes';
import reducers from './reducers';

describe('Admin login reducer', () => {
    it('should handle TOGGLE_LOADING_ADMIN', () => {
        const loading = false;
        const action = {
            payload: true,
            type: TOGGLE_LOADING_ADMIN,
        }
        expect(reducers.loginAdminReducer(loading, action)).toEqual(true)
    })

    it('should handle AUTHENTICATE_ADMIN', () => {
        const adminAuthenticated = false;
        const action = {
            payload: false,
            type: AUTHENTICATE_ADMIN,
        }
        expect(reducers.authenticateAdminReducer(adminAuthenticated, action)).toEqual(false)
    })
})