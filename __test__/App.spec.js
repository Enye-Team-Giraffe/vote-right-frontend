import React from 'react';
import { mount } from './enzyme';
import App from '../src/App';

describe('App', () => {
    it('should render my component', () => {
        const wrapper = mount(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
