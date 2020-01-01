/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Card, Icon, Spin, Button, Statistic
} from 'antd';

import './userViewOngoing.css';
import { LOADING_MESSAGE, NO_RUNNING_ELECTION } from '../constants';
import { actions } from '../../viewElection';

const { Meta } = Card;

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
            >
                <div className="viewElection">
                    {
                        elections.map(election => (
                            <div className="electionItem" key={election.location}>
                                <Card
                                    title={`The ${election.name}`}
                                    actions={[
                                        <div
                                            className="electionItem__subitem"
                                            key={election.startdate}
                                        >
                                            <div>
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type="calendar"
                                                    key="calendar"
                                                />
                                                {toDateString(election.startdate)}
                                            </div>
                                        </div>,
                                        <div
                                            className="electionItem__subitem"
                                            key={election.enddate}
                                        >
                                            <div>
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type="calendar"
                                                    key="calendar"
                                                />
                                                {toDateString(election.enddate)}
                                            </div>
                                        </div>,
                                        <Button
                                            type="primary"
                                            className="electionItem__subitem --button"
                                            key={election.name}
                                        >
                                            <NavLink
                                                to={'/user/elections/ongoing/'
                                                    + `${election.location}/vote`}
                                            >
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type="link"
                                                    key="link"
                                                />
                                                Vote
                                            </NavLink>
                                        </Button>,
                                    ]}
                                >
                                    <Meta
                                        description={election.description}
                                    />
                                    <div className="electionItem__statistics">
                                        <Statistic
                                            title="Candidates"
                                            value={statistics[election.location][0]}
                                            precision={0}
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                        <Statistic
                                            title="Votes Count"
                                            value={statistics[election.location][1]}
                                            prefix={<Icon type="inbox" />}
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                        <Statistic
                                            className="--hide-on-very-small"
                                            title={statistics[election.location][2]}
                                            value={statistics[election.location][3]}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                            suffix="votes"
                                        />
                                    </div>
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
            </Spin>
        </div>
    );
}
