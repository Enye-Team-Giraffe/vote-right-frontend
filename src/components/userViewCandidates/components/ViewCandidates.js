/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin, message } from 'antd';
import './ViewCandidates.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import Candidate from './Candidate';
import { LOADING_MESSAGE } from '../constants';
import { actions as viewStatsActions } from '../../viewStats';
import actions from '../actions';
import { WAIT_TIME } from '../../viewStats/constants';

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
    const [latlong,setlatlong]=useState("");
    const dispatch = useDispatch();

    function successFunction(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        setlatlong(`${lat}${long}`)
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
    const loading = useSelector(state => state.candidatesLoading);

    /**
     * Handles click event to vote a candidate
     *
     * @function
     *
     * @param {string} -
     * @return {void}
     */
    const genders=["male","female"]
    const handleVote = candidateId => {
        dispatch(actions.voteCandidateRequest({ 
                candidateId : candidateId,
                electionId:match.params.electionId,
                age:Math.floor(Math.random()*100),
                gender:genders[Math.round(Math.random()*1)],
                latlong:latlong,
                phoneNumber:`${Math.floor(Math.random()*1000)}`
            })
        );
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
                            pictureUrl={candidate.pictureLink}
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