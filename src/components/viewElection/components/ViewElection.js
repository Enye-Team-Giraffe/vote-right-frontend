/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './ViewElection.css';
import { Card, Icon, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { LOADING_MESSAGE } from '../constants';

import actions from '../actions';

const { Meta } = Card;

export default function ViewElection() {
    const dispatch = useDispatch();
    const elections = useSelector(state => state.elections);
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
            >
                <div className="viewElection">
                    {
                        elections.map(election => (
                            <div className="electionItem" key={election.location}>
                                <Card
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
                                        <div
                                            className="electionItem__subitem"
                                            key={election.name}
                                        >
                                            <NavLink
                                                to={`/dashboard/statistics/${election.location}`}
                                            >
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type="link"
                                                    key="link"
                                                />
                                                View Real Time Stats
                                            </NavLink>
                                        </div>,
                                    ]}
                                >
                                    <Meta
                                        title={election.name}
                                        description={election.description}
                                    />
                                </Card>
                            </div>
                        ))

                    }

                </div>
            </Spin>
        </div>
    );
}
