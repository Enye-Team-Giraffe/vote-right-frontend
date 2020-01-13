/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../../viewElection/components/ViewElection';
import PropTypes from 'prop-types';
import {
    Card, Icon, Spin, Modal, Tag, Button
} from 'antd';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import {
    NO_PENDING_ELECTION, MODAL_HEADER, ADD_CANDIDATE, VIEW_CANDIDATE
} from '../constants';
import actions from '../../viewElection/actions';
import { components as AdminViewCandidates } from '../../viewCandidate';

const { Meta } = Card;

//  a function to get the difference in date between two time stamps
const dateDiffFromToday = dateone => {
    const diff = Math.abs(Date.now() - (Number(dateone) * 1000)) / (1000 * 60 * 60 * 24);
    return Math.round(diff, 0);
};

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag
                style={{ textAlign: 'center', width: '150px' }}
                color="volcano"
            >
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

const CardMeta = ({
    description, daysTillStart, numCandidates, endDate,
}) => (
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
        <div className="cardMeta__meta">
            <Icon type="calendar" className="cardMeta__meta__icon" />
            <span className="cardMeta__meta__text">
                Ends on
                {' '}
                {endDate}
            </span>
        </div>
    </div>
);

export default function ViewElection() {
    // create a state variable to keep track of if the election modal is open
    const [visible, setVisibility] = useState(false);
    const [electionAddress, setElectionAddress] = useState('');

    const dispatch = useDispatch();
    const elections = useSelector(state => state.elections);
    const statistics = useSelector(state => state.statistics);
    const loadingElections = useSelector(state => state.electionListLoading);

    const antIcon = <Icon type="loading" className="loader" spin />;

    /* This function rshows a modal which contains the results of an election
    * it recieves the adress of an election as a string,
    * This election is then what is shown on the modal
    * it also sets the modal to be visible by setting the state responsible for such
    * @param {String} electionAddressParam - A string which is an address of the election
    * @return {void}
    */
    const showModal = electionAddressParam => {
        setElectionAddress(electionAddressParam);
        setVisibility(true);
    };

    // this function hides the modal
    const handleCancel = () => { setVisibility(false); };

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
                <Modal
                    key={electionAddress}
                    className="userViewElectionModal"
                    visible={visible}
                    title={MODAL_HEADER}
                    onCancel={handleCancel}
                    footer={[]}
                >
                    <AdminViewCandidates address={electionAddress} />
                </Modal>
                {
                    elections.map(election => (
                        <div className="electionItem" key={election.location}>
                            <Card
                                title={<CardTitle title={election.name} />}
                                actions={[
                                    <Button
                                        type="primary"
                                        className="electionItem__subitem --button"
                                        key={election.name}
                                    >
                                        <NavLink
                                            to={'/dashboard/elections/'
                                                + `${election.location}/register-candidate`}
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
                                        onClick={() => { showModal(election.location); }}
                                    >
                                        <div>
                                            <Icon
                                                className="electionItem__subitem__icon"
                                                type="eye"
                                                key="link"
                                            />
                                            {VIEW_CANDIDATE}
                                        </div>
                                    </Button>,
                                ]}
                            >
                                <Meta
                                    description={(
                                        <CardMeta
                                            description={election.description}
                                            daysTillStart={dateDiffFromToday(election.startdate)}
                                            numCandidates={statistics[election.location][0]}
                                            endDate={toDateString(election.startdate)}
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
    endDate: PropTypes.string.isRequired,
    numCandidates: PropTypes.string.isRequired,
};

