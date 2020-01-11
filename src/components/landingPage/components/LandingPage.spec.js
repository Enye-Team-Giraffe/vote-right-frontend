/* eslint-disable max-lines-per-function */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from '../../../../__test__/enzyme';
import LandingPage from './LandingPage';
import { LOGO, LOGINETXT } from '../constants';

const wrapper = mount(
    <BrowserRouter>
        <LandingPage />
    </BrowserRouter>
);

describe('LandingPage', () => {
    it('should render logo', () => {
        expect(wrapper.find('.heading-logo').text()).toEqual(LOGO);
    });

    it('should render login link', () => {
        expect(wrapper.find('.homepage-wrapper__header__options').text()).toEqual(LOGINETXT);
    });

    it('should render changing text', () => {
        expect(wrapper.find('.item').length).toEqual(4);
        expect(wrapper.exists('.homepage-wrapper__content--wrapper')).toEqual(true);
    });

    it('should render social links', () => {
        expect(wrapper.exists('.homepage-wrapper__footer')).toEqual(true);
    });
});
