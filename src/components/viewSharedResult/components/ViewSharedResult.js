/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography } from 'antd';
import './ViewSharedResult.css';
import { VOTERIGHT } from '../constants';
import { components as ViewResults } from '../../userViewResults';
import { actions as viewElectionactions } from '../../viewElection';

const { Title } = Typography;

const ViewSharedResult = ({ match }) => {
    const dispatch = useDispatch();
    /**
     * Finds a particular election by id
     *
     * function
     * @param {array} elections - list of elections
     * @param {string} address - address of election to find
     * @return {object} election - election found by address
     */
    const findElectionByAddress = (elections, address) => {
        const foundElection = elections.find(election => election.location === address);
        return foundElection || {};
    };

    const elections = useSelector(state => state.elections);
    const election = findElectionByAddress(elections, match.params.electionId);

    useEffect(() => {
        dispatch(viewElectionactions.loadElections());
    }, [dispatch, match.params.electionId]);

    return (
        <div className="viewSharedResult">
            <div className="heading -fullWidth -static">
                <Link to="/">
                    <Title level={1}>
                        <span className="headingText">{ VOTERIGHT }</span>
                    </Title>
                </Link>
            </div>

            <div>
                <Card className="viewSharedResult__table">
                    <Title
                        level={2}
                        className="viewSharedResult__electionName"
                    >
                        {election.name ? `${election.name} Result` : ''}
                    </Title>
                    {election.name
                        ? <ViewResults address={match.params.electionId} />
                        : ''}
                </Card>
            </div>

        </div>
    );
};

export default ViewSharedResult;

ViewSharedResult.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
