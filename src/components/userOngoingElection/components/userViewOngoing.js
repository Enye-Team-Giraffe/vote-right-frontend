/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Card, Icon, Spin, Button, Avatar, Tag, Alert
} from 'antd';
import PropTypes from 'prop-types';
import './userViewOngoing.css';
import {
    LOADING_MESSAGE, NO_RUNNING_ELECTION, ALREADY_VOTED, VOTE,
    USER_VIEW_ONGOING_ELECTIONS
} from '../constants';
import { actions } from '../../viewElection';
import { analytics } from '../../configuredFirebase';
import Particles from '../../particleBackground';

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
            {title}
        </div>

    </div>
);

const CardMeta = ({
    description, daysTillStart,
    numCandidates, numVotes,
    leadingCandidateName, leadingCandidateVote,
    candidatePicture,
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
                src={candidatePicture}
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
    const allElections = useSelector(state => state.elections);
    const today = Math.round(Date.now() / 1000);
    const elections = allElections.filter(
        election => (election.startdate < today && election.enddate > today)
    ).sort((first, second) => first.startdate - second.startdate);
    const loadingElections = useSelector(state => state.electionListLoading);
    const statistics = useSelector(state => state.statistics);
    const user = useSelector(state => state.user);

    const antIcon = <Icon type="loading" className="loader" spin />;
    // upon render of the page get all the elections
    useEffect(() => {
        dispatch(actions.loadElections(user.phoneNumber));
        analytics.logEvent(USER_VIEW_ONGOING_ELECTIONS);
    }, [dispatch, user.phoneNumber]);
    const toDateString = tstamp => new Date(Number(tstamp) * 1000).toDateString().slice(0, 15);
    return (
        <div className="viewElectionLayout">
            <Particles />
            <Spin
                size="large"
                indicator={antIcon}
                spinning={loadingElections}
                className="loader"
                tip={LOADING_MESSAGE}
            >
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
                                            disabled={
                                                statistics[election.location][5]
                                            }
                                        >
                                            <NavLink
                                                to={'/user/elections/ongoing/'
                                                    + `${election.location}/vote`}
                                            >
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type={(statistics[election.location][5])
                                                        ? 'check' : 'link'}
                                                    key="link"
                                                />
                                                {
                                                    (statistics[election.location][5])
                                                        ? `${ALREADY_VOTED}`
                                                        : `${VOTE}`
                                                }
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
                                                leadingCandidateName={
                                                    statistics[election.location][2]
                                                }
                                                leadingCandidateVote={
                                                    statistics[election.location][3]
                                                }
                                                candidatePicture={
                                                    statistics[election.location][4]
                                                }
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
                                <Alert
                                    message={NO_RUNNING_ELECTION}
                                    type="info"
                                    showIcon
                                />
                            </div>
                        ) : ''
                    }
                </div>
            </Spin>
        </div>
    );
}

CardTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

CardMeta.propTypes = {
    candidatePicture: PropTypes.string.isRequired,
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
