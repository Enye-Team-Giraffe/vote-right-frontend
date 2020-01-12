/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './ViewElection.css';
import {
    Card, Icon, Spin, Button, Avatar, Tag
} from 'antd';
import { NavLink } from 'react-router-dom';
import { LOADING_MESSAGE, NO_RUNNING_ELECTION } from '../constants';

import actions from '../actions';

const { Meta } = Card;

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag style={{ width: '150px', textAlign: 'center' }} color="green">Ongoing Election</Tag>
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
            <Avatar className="cardMeta__meta__icon" style={{ backgroundColor: '#87d068' }} icon="user" />
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
    }, [dispatch]);
    const toDateString = tstamp => new Date(Number(tstamp) * 1000).toDateString().slice(0, 15);
    return (
        <div className="viewElectionLayout">
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
