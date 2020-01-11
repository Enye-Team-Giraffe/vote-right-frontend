/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Icon, Spin, Modal, message
} from 'antd';
import './ViewCandidates.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import Candidate from './Candidate';
import {
    LOADING_MESSAGE, NO_CANDIDATE, WAIT_TIME, CANCEL_VOTE
} from '../constants';
import { actions as viewStatsActions } from '../../viewStats';
import actions from '../actions';

/**
 * Display candidates view
 *
 * @component
 *
 * @param {object} - props
 * @return {component} - List of candidate component
 */
const ViewCandidates = ({ match }) => {
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    const history = useHistory();
    const [latlong, setlatlong] = useState('');
    const { confirm } = Modal;
    // a success function to load the latitide and longitude
    function successFunction(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setlatlong(`${lat}|${long}`);
    }

    useEffect(() => {
        dispatch(viewStatsActions.pushCandidates([]));
        dispatch(viewStatsActions.loadingCandidates(true));
        dispatch(viewStatsActions.loadCandidates(match.params.electionId));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction);
        }
    }, [dispatch, match.params.electionId]);

    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    const candidates = useSelector(state => state.candidates);
    const candidateLoading = useSelector(state => state.candidatesLoading);
    const votingLoading = useSelector(state => state.votingLoading);
    const user = useSelector(state => state.user);
    /**
     * Handles click event to vote a candidate
     *
     * @function
     *
     * @param {string} -
     * @return {void}
     */
    const genders = ['male', 'female'];
    const handleVote = candidateId => {
        dispatch(actions.votingLoading(true));
        dispatch(actions.voteCandidateRequest({
            age: Math.floor(Math.random() * 100),
            candidateId,
            electionId: match.params.electionId,
            gender: genders[Math.round(Math.random() * 1)],
            history,
            latlong,
            phoneNumber: user.phoneNumber,
        }));
    };

    // a function to show the confirmation modal
    function showConfirm(electionId) {
        confirm({
            content: 'This action is not reversible or repeatable',
            onCancel() {
                message.success(CANCEL_VOTE, WAIT_TIME);
            },
            onOk() {
                handleVote(electionId);
            },
            title: 'Are you sure of your voted candidate?',
            width: 600,
        });
    }

    return (
        <div className="candidateView --voters">
            <div className="candidateList">
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={votingLoading || candidateLoading}
                    className="loader"
                    tip={LOADING_MESSAGE}
                >
                    {
                        candidates.map(candidate => (
                            <Candidate
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                age={candidate.age}
                                pictureUrl={candidate.pictureLink}
                                party={candidate.party}
                                quote={candidate.quote}
                                education={candidate.education}
                                handleVote={showConfirm}
                            />
                        ))
                    }
                    {
                        (candidates.length === 0 && !candidateLoading) ? (
                            <div className="no_candidate">
                                {NO_CANDIDATE}
                            </div>
                        ) : ''
                    }
                </Spin>
            </div>
        </div>
    );
};

export default ViewCandidates;

ViewCandidates.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
