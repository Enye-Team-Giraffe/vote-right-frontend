/* eslint-disable max-lines-per-function */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { mount } from '../../../../__test__/enzyme';
import AddCandidate from './AddCandidate';
import { ADD_CANDIDATE, HEADING, } from '../constants';

describe('AdminLogin', () => {
    const mockStore = createStore(reducers.addCandidateLoading, false);
    const match = {
        params: {
            electionId: 'gfgfsdg6ytytrtygy62vgvg'
        },
        path: '',
        url: '',
    }
    const wrapper = mount(
        <Provider store={mockStore}>
            <AddCandidate match={match} />
        </Provider>
    );
    it('should render header title', () => {
        expect(wrapper.find('.addCandidateForm__heading_header').text()).toEqual(ADD_CANDIDATE);
    });

    it('should render header title', () => {
        expect(wrapper.find('.addCandidateForm__heading_text').text()).toEqual(HEADING);
    });

    it('should render image upload component', () => {
        expect(wrapper.exists('.avatar-uploader')).toEqual(true);
    });
});
