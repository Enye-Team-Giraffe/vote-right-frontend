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
    LOADING_MESSAGE, NO_CANDIDATE, WAIT_TIME, CANCEL_VOTE, MAX_CANDIDATE
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
    const comaparedList = useState(new Set())[0];
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
    const handleVote = candidateId => {
        dispatch(actions.votingLoading(true));
        dispatch(actions.voteCandidateRequest({
            age: user.age,
            candidateId,
            electionId: match.params.electionId,
            gender: user.gender,
            history,
            latlong,
            phoneNumber: user.phoneNumber,
        }));
    };

    /**
     * Handles click event to show a confirmation modal
     *
     * @function
     *
     * @param {string} - electionId which is the id of the displayed election
     * @return {void}
     */
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
    /**
     * Handles click add a user to compare to state
     *
     * @function
     *
     * @param {Number} - The index of the candidate to add to compare list
     * @return {void}
     */
    function selectCandidateToCompare(candidateIndex) {
        return (passedFunction, parameter) => {
            if (!comaparedList.has(candidateIndex)) {
                if (comaparedList.size < 2) {
                    comaparedList.add(candidateIndex);
                    passedFunction(parameter);
                } else {
                    message.error(MAX_CANDIDATE, WAIT_TIME);
                }
            } else {
                comaparedList.delete(candidateIndex);
                passedFunction(parameter);
            }
        };
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
                        candidates.map((candidate, index) => (
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
                                selectCandidateToCompare={
                                    selectCandidateToCompare(index)
                                }
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
