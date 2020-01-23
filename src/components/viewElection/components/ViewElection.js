/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './ViewElection.css';
import {
    Card, Icon, Spin, Button, Avatar, Tag
} from 'antd';
import { NavLink } from 'react-router-dom';
import {
    LOADING_MESSAGE, NO_RUNNING_ELECTION,
    ADMIN_VIEW_ONGOING_ELECTIONS
} from '../constants';
import { analytics } from '../../configuredFirebase';
import actions from '../actions';
import Particles from 'react-particles-js';

const { Meta } = Card;

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag
                style={{ textAlign: 'center', width: '150px' }}
                color="green"
            >
                <Icon type="check" className="--paddingRight" />
                Ongoing Election
            </Tag>
        </div>
        <div className="cardTitle__title">
            The
            {' '}
            {' '}
            {title}
            {' '}
            {' '}
Election
        </div>

    </div>
);

const CardMeta = ({
    description, daysTillStart,
    numCandidates, numVotes,
    leadingCandidateName, leadingCandidateVote,
}) => (
    <div className="cardMeta">
        <div className="cardMeta__description">
            { description }
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="clock-circle" />
            <span className="cardMeta__meta__text">
                Started on
                {' '}
                {daysTillStart}
.
            </span>
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="team" />
            <span className="cardMeta__meta__text">
                {numCandidates}
                {' '}
Contesting Candidates
            </span>
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="inbox" />
            <span className="cardMeta__meta__text">
                {numVotes}
                {' '}
Votes Casted
            </span>
        </div>
        <hr className="divider" />
        <div className="cardMeta__meta">
            <Avatar
                className="cardMeta__meta__icon"
                style={{ backgroundColor: '#87d068' }}
                icon="user"
            />
            <span className="cardMeta__meta__text">
                <span className="--bolder">{leadingCandidateName}</span>
                {' '}
is winning Having
                {' '}
                <span className="--bolder">
                    {leadingCandidateVote}
                    {' '}
Votes
                </span>
            </span>
        </div>
    </div>
);

const CardFooter = ({ endDate }) => (
    <div className="cardTitle__meta">
        <Icon type="calendar" className="cardTitle__meta__icon" />
        <span className="cardTitle__meta__text">
            Ends on
            {' '}
            {endDate}
        </span>
    </div>
);

export default function ViewElection() {
    const dispatch = useDispatch();
    const elections = useSelector(state => state.elections);
    const loadingElections = useSelector(state => state.electionListLoading);
    const statistics = useSelector(state => state.statistics);

    const antIcon = <Icon type="loading" className="loader" spin />;
    // upon render of the page get all the elections
    useEffect(() => {
        dispatch(actions.loadElections());
        analytics.logEvent(ADMIN_VIEW_ONGOING_ELECTIONS);
    }, [dispatch]);
    const toDateString = tstamp => new Date(Number(tstamp) * 1000).toDateString().slice(0, 15);
    return (
        <div className="viewElectionLayout">
            <Particles/>
            <Spin
                size="large"
                indicator={antIcon}
                spinning={loadingElections}
                className="loader"
                tip={LOADING_MESSAGE}
            />

            <div className="viewElection">
                {
                    elections.map(election => (
                        <div className="electionItem" key={election.location}>
                            <Card
                                title={<CardTitle title={election.name} />}
                                actions={[
                                    <CardFooter
                                        key={election.enddate}
                                        endDate={toDateString(election.enddate)}
                                    />,
                                    <Button
                                        type="primary"
                                        className="electionItem__subitem --button"
                                        key={election.name}
                                    >
                                        <NavLink
                                            to={'/dashboard/elections/'
                                                + `${election.location}/statistics`}
                                        >
                                            <Icon
                                                className="electionItem__subitem__icon"
                                                type="link"
                                                key="link"
                                            />
                                                Stats
                                        </NavLink>
                                    </Button>,
                                ]}
                            >
                                <Meta
                                    description={(
                                        <CardMeta
                                            description={election.description}
                                            daysTillStart={toDateString(election.startdate)}
                                            numCandidates={statistics[election.location][0]}
                                            numVotes={statistics[election.location][1]}
                                            leadingCandidateName={statistics[election.location][2]}
                                            leadingCandidateVote={statistics[election.location][3]}
                                        />
                                    )}
                                />
                            </Card>
                        </div>
                    ))

                }
                {
                    (elections.length === 0 && !loadingElections) ? (
                        <div className="no_candidate">
                            {NO_RUNNING_ELECTION}
                        </div>
                    ) : ''
                }

            </div>
        </div>
    );
}

CardTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

CardMeta.propTypes = {
    daysTillStart: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    leadingCandidateName: PropTypes.string.isRequired,
    leadingCandidateVote: PropTypes.string.isRequired,
    numCandidates: PropTypes.string.isRequired,
    numVotes: PropTypes.string.isRequired,
};

CardFooter.propTypes = {
    endDate: PropTypes.string.isRequired,
};


import React from 'react';
import Particles from 'react-particles-js';
import './style.css';
import { particleParameters } from './constants';

// style for the item which we put over the animation
const overlay = {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    fontSize: '20px',
    height: '100%',
    justifyContent: 'center',
};

// style for the particle which we want to display
const particleStyle = {
    height: '100%',
    left: 0,
    paddingBottom: '3%',
    paddingTop: '3%',
    position: 'absolute',
    top: 0,
    width: '100%',
};

/**
 * Default layout for pages
 *
 * @function
 * @param {func} ComponentOne - one of two component to display
 * @param {func} ComponentTwo - one of two component to display
 * @return {Component} the jsx component for default page layout
 */
const withLayout = (ComponentOne = 'div', ComponentTwo = 'div') => () => (
    <div className="layout">
        <div className="whiteSection">
            <ComponentOne />
        </div>
        <div className="blueSection -blue">
            <ComponentTwo style={overlay} />
            <Particles
                params={particleParameters}
                style={particleStyle}
            />
        </div>
    </div>
);

export default withLayout;
