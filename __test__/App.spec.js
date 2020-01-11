import React from 'react';
import { mount } from './enzyme';
import App from '../src/App';

describe('SAMPLE TEST', () => {
    it('should return a successful sample test ', () => {
        expect(true).toBeTruthy();
    });
});

describe('App', () => {
    it('should render my component', () => {
        const wrapper = mount(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
