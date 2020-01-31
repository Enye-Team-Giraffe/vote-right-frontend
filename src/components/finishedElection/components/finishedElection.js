/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import '../../viewElection/components/ViewElection';
import {
    Card, Icon, Spin, Button, Avatar, Tag, Alert
} from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import { NO_FINISHED_ELECTION, ADMIN_VIEW_CONCLUDED_ELECTION } from '../constants';
import { analytics } from '../../configuredFirebase';
import actions from '../../viewElection/actions';
import Particles from '../../particleBackground';

const { Meta } = Card;

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag
                style={{ textAlign: 'center', width: '150px' }}
                color="red"
            >
                <Icon type="history" className="--paddingRight" />
                Concluded Election
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
Candidates Contested
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
        <hr className="divider --ongoing" />
        <div className="cardMeta__meta">
            <Avatar
                className="cardMeta__meta__icon"
                style={{ backgroundColor: '#87d068' }}
                icon="user"
            />
            <span className="cardMeta__meta__text">
                <span className="--bolder">{leadingCandidateName}</span>
                {' '}
Won The Election Having
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
            Ended :
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
        election => (today > election.enddate)
    );
    const loadingElections = useSelector(state => state.electionListLoading);
    const statistics = useSelector(state => state.statistics);
    analytics.logEvent(ADMIN_VIEW_CONCLUDED_ELECTION);
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
            <Particles />
            <div className="viewElection">
                {
                    elections.map(election => (
                        <div className="electionItem" key={election.location}>
                            <Card
                                title={<CardTitle title={election.name} />}
                                actions={[
                                    <CardFooter
                                        key={Math.random()}
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
                            <Alert
                                message={NO_FINISHED_ELECTION}
                                type="info"
                                showIcon
                            />
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

