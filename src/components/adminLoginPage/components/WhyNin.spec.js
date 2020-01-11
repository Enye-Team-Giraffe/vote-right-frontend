/* eslint-disable max-lines-per-function */
import React from 'react';
import { mount } from '../../../../__test__/enzyme';
import WhyNin from './WhyNin';
import { WHYNIN, WHYWENEED } from '../constants';

const wrapper = mount(<WhyNin />);

describe('WhyNin', () => {
    it('should render title', () => {
        expect(wrapper.find('Title').text()).toEqual(WHYWENEED);
    });

    it('should render text', () => {
        expect(wrapper.find('Text').text()).toEqual(WHYNIN);
    });
});
