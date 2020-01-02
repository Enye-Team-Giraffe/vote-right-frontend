/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin } from 'antd';
import './ViewCandidates.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import Candidate from './Candidate';
import { LOADING_MESSAGE } from '../constants';
import { actions as viewStatsActions } from '../../viewStats';

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
    useEffect(() => {
        dispatch(viewStatsActions.pushCandidates([]));
        dispatch(viewStatsActions.loadingCandidates(true));
        dispatch(viewStatsActions.loadCandidates(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    const candidates = useSelector(state => state.candidates);
    const loading = useSelector(state => state.candidatesLoading);

    /**
     * Handles click event to vote a candidate
     *
     * @function
     *
     * @param {string} -
     * @return {void}
     */
    // eslint-disable-next-line no-unused-vars
    const handleVote = candidateId => {
    };

    return (
        <div className="candidateView">
            <div className="candidateList">
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={loading}
                    className="loader"
                    tip={LOADING_MESSAGE}
                />
                {
                    candidates.map(candidate => (
                        <Candidate
                            key={candidate.id}
                            id={candidate.id}
                            name={candidate.name}
                            age={candidate.age}
                            pictureUrl="vvgvgvg"
                            party={candidate.party}
                            handleVote={handleVote}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ViewCandidates;

ViewCandidates.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
