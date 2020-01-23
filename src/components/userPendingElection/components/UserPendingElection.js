/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../viewElection/components/ViewElection';
import PropTypes from 'prop-types';
import {
    Card, Icon, Spin, Tag
} from 'antd';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import {
    NO_PENDING_ELECTION, USER_VIEW_ONGOING_ELECTION
} from '../constants';
import actions from '../../viewElection/actions';
import './UserPendingElection.css';
import { analytics } from '../../configuredFirebase';
import Particles from '../../particleBackground';

const { Meta } = Card;

//  a function to get the difference in date between two time stamps
const dateDiffFromToday = dateone => {
    const diff = Math.abs(Date.now() - (Number(dateone) * 1000)) / (1000 * 60 * 60 * 24);
    return String(Math.round(diff, 0));
};

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag
                style={{ textAlign: 'center', width: '150px' }}
                color="volcano"
            >
                <Icon type="loading-3-quarters" className="--paddingRight" />
                Pending Election
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

const CardMeta = ({ description, daysTillStart, numCandidates }) => (
    <div className="cardMeta">
        <div className="cardMeta__description">
            { description }
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="clock-circle" />
            <span className="cardMeta__meta__text">
                Starts in
                {' '}
                {daysTillStart}
                {' '}
days
            </span>
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="team" />
            <span className="cardMeta__meta__text">
                {numCandidates}
                {' '}
Registered Candidates
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
    const statistics = useSelector(state => state.statistics);
    const loadingElections = useSelector(state => state.electionListLoading);

    const antIcon = <Icon type="loading" className="loader" spin />;
    // upon render of the page get all the elections
    useEffect(() => {
        dispatch(actions.loadElections(USER_VIEW_ONGOING_ELECTION));
        analytics.logEvent();
    }, [dispatch]);
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
            />

            <div className="viewElection">
                {
                    elections.map(election => (
                        <div className="electionItem" key={election.location}>
                            <Card
                                title={<CardTitle title={election.name} />}
                                actions={[
                                    <CardFooter
                                        key={election.startdate}
                                        endDate={toDateString(election.startdate)}
                                    />,
                                ]}
                            >
                                <Meta
                                    description={(
                                        <CardMeta
                                            description={election.description}
                                            daysTillStart={dateDiffFromToday(election.startdate)}
                                            numCandidates={statistics[election.location][0]}
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
                            {NO_PENDING_ELECTION}
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
    numCandidates: PropTypes.string.isRequired,
};
CardFooter.propTypes = {
    endDate: PropTypes.string.isRequired,
};

