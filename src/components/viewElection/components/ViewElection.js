/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import './ViewElection.css';
import { Card, Icon, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { LOADING_MESSAGE } from '../constants';
import { Statistic } from 'antd';
import { Button} from 'antd';


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
            </Spin>

                <div className="viewElection">
                    {
                        elections.map(election => (
                            <div className="electionItem" key={election.location}>
                                <Card
                                    title={"The " + election.name}
                                    actions={[
                                        <div
                                            className="electionItem__subitem --text"
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
                                                to={`/dashboard/statistics/${election.location}`}
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
                                        description={election.description}
                                    />
                                    <p></p>
                                    <p>Ade is leading with 50 votes</p>

                                    <div className="electionItem__statistics">
                                        <Statistic
                                            title="Candidates"
                                            value={3}
                                            precision={0}
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                        <Statistic
                                            title="Votes"
                                            value={111221}
                                            valueStyle={{ color: '#3f8600' }}
                                        />
                                        <Statistic
                                            className="--hide-on-very-small"
                                            title="Activity"
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<Icon type="arrow-up" />}
                                            suffix="%"
                                        />
                                    </div>
                                </Card>
                            </div>
                        ))

                    }

                </div>
        </div>
    );
}
