/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../viewElection/components/ViewElection';
import {
    Card, Icon, Spin, Statistic, Avatar
} from 'antd';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import {
    NO_PENDING_ELECTION
} from '../constants';
import actions from '../../viewElection/actions';
import "./UserPendingElection.css";
const { Meta } = Card;

//  a function to get the difference in date between two time stamps
const dateDiffFromToday = dateone => {
    const diff = Math.abs(Date.now() - (Number(dateone) * 1000)) / (1000 * 60 * 60 * 24);
    return Math.round(diff, 0);
};

//  a function to display the title of the card
const CardTitle = ({title}) =>(
    <div className="cardTitle">
        <div className="cardTitle__title">
            The {title}
        </div>
        <div className="cardTitle__image">
            <Avatar className="cardTitle__image__avatar">USER</Avatar>
            <Avatar className="cardTitle__image__avatar" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            <Avatar className="cardTitle__image__avatar">USER</Avatar>
            <Avatar className="cardTitle__image__avatar" style={{ backgroundColor: '#87d068' }} icon="user" />
            <span className="cardTitle_icon">
                <Icon className="electionItem__subitem__icon" type="plus"/>
            </span>
        </div>
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
                                title={<CardTitle title={election.name}/>}
                                actions={[
                                    <div
                                        className="electionItem__subitem --text"
                                        key={election.enddate}
                                    >
                                        <div>
                                            <Icon
                                                className="electionItem__subitem__icon"
                                                type="carry-out"
                                            />
                                            {`Ends on ${toDateString(election.enddate)}`}
                                        </div>
                                    </div>,
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
