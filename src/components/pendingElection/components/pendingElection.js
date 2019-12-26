/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../viewElection/components/ViewElection';
import {
    Card, Icon, Spin, Button, Statistic
} from 'antd';
import { NavLink } from 'react-router-dom';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import {
    VIEW_CANDIDATE_ROUTE, ADD_CANDIDATE_ROUTE, VIEW_CANDIDATE, ADD_CANDIDATE,
    NO_PENDING_ELECTION
} from '../constants';
import actions from '../../viewElection/actions';

const { Meta } = Card;

//  a function to get the difference in date between two time stamps
const dateDiffFromToday = dateone => {
    const diff = Math.abs(Date.now() - (Number(dateone) * 1000)) / (1000 * 60 * 60 * 24);
    return Math.round(diff, 0);
};

export default function ViewElection() {
    const dispatch = useDispatch();
    const elections = useSelector(state => state.elections);
    const statistics = useSelector(state => state.statistics);
    const loadingElections = useSelector(state => state.electionListLoading);

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
                                title={`The ${election.name}`}
                                actions={[
                                    <div
                                        className="electionItem__subitem --text"
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
                                            to={`${ADD_CANDIDATE_ROUTE}${election.location}`}
                                        >
                                            <Icon
                                                className="electionItem__subitem__icon"
                                                type="plus"
                                                key="link"
                                            />
                                            {ADD_CANDIDATE}
                                        </NavLink>
                                    </Button>,
                                    <Button
                                        type="primary"
                                        className="electionItem__subitem --button"
                                        key={Math.random()}
                                    >
                                        <NavLink
                                            to={`${VIEW_CANDIDATE_ROUTE}${election.location}`}
                                        >
                                            <Icon
                                                className="electionItem__subitem__icon"
                                                type="eye"
                                                key="link"
                                            />
                                            {VIEW_CANDIDATE}
                                        </NavLink>
                                    </Button>,
                                ]}
                            >
                                <Meta
                                    description={election.description}
                                />

                                <p />
                                <div className="electionItem__statistics">
                                    <Statistic
                                        title="Candidates"
                                        value={statistics[election.location][0]}
                                        precision={0}
                                        valueStyle={{ color: '#3f8600' }}
                                    />
                                    <Statistic
                                        title="Days till start"
                                        value={dateDiffFromToday(election.startdate)}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<Icon type="arrow-down" />}
                                    />
                                </div>
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
