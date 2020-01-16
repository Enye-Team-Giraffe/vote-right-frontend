/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card, Icon, Spin, Button, Modal, Avatar, Tag
} from 'antd';
import PropTypes from 'prop-types';
import { components as ViewResults } from '../../userViewResults';
import './userConcludedElections.css';
import { LOADING_MESSAGE, MODAL_TITLE, VIEW_RESULT } from '../constants';
import { actions } from '../../viewElection';

const { Meta } = Card;

//  a function to display the title of the card
const CardTitle = ({ title }) => (
    <div className="cardTitle">
        <div className="cardTitle__tag">
            <Tag
                style={{ textAlign: 'center', width: '150px' }}
                color="red"
            >
                Concluded Election
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
    // create a state variable to keep track of if the election modal is open
    const [visible, setVisibility] = useState(false);
    const [electionAddress, setElectionAddress] = useState('');
    const [electionName, setElectionName] = useState('');

    const dispatch = useDispatch();
    const elections = useSelector(state => state.elections);
    const loadingElections = useSelector(state => state.electionListLoading);
    const statistics = useSelector(state => state.statistics);
    // filter the elections and only select the ones
    // with dates less than today

    const antIcon = <Icon type="loading" className="loader" spin />;

    /* This function rshows a modal which contains the results of an election
    * it recieves the adress of an election as a string,
    * This election is then what is shown on the modal
    * it also sets the modal to be visible by setting the state responsible for such
    * @param {String} electionAddressParam - A string which is an address of the election
    * @return {void}
    */
    const showModal = (electionAddressParam, electionNameParam) => {
        setElectionAddress(electionAddressParam);
        setElectionName(electionNameParam);
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
            >
                <div className="viewElection">
                    <Modal
                        className="userViewElectionModal"
                        key={electionAddress}
                        visible={visible}
                        title={MODAL_TITLE}
                        onCancel={handleCancel}
                        footer={[]}
                    >
                        <ViewResults address={electionAddress} name={electionName} />
                    </Modal>
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
                                            onClick={() => {
                                                showModal(election.location, election.name);
                                            }}
                                        >
                                            <div>
                                                <Icon
                                                    className="electionItem__subitem__icon"
                                                    type="link"
                                                    key="link"
                                                />
                                                {VIEW_RESULT}
                                            </div>
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
                                            />
                                        )}
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
