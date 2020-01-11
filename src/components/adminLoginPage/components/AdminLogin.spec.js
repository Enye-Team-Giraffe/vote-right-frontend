/* eslint-disable max-lines-per-function */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { mount } from '../../../../__test__/enzyme';
import AdminLogin from './AdminLogin';
import { SIGNINHEADER, SIGNIN } from '../constants';

const mockStore = createStore(reducers.loginAdminReducer, {});
const wrapper = mount(
    <Provider store={mockStore}>
        <AdminLogin />
    </Provider>
);

describe('AdminLogin', () => {
    it('should render signin header', () => {
        expect(wrapper.find('Title').text()).toEqual(SIGNINHEADER);
    });
    it('should render email field', () => {
        expect(wrapper.exists('Input')).toEqual(true);
    });
    it('should render password field', () => {
        expect(wrapper.exists('Password')).toEqual(true);
        expect(wrapper.find('Password').prop('name')).toEqual('password');
    });
    it('should render signin button', () => {
        expect(wrapper.exists('Button')).toEqual(true);
        expect(wrapper.find('Button').text()).toEqual(SIGNIN);
    });
});
