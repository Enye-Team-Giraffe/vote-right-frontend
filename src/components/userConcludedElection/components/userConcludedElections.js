/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
    Card, Icon, Spin, Button, Modal, Avatar, Tag
} from 'antd';
import PropTypes from 'prop-types';
import { components as ViewResults } from '../../userViewResults';
import './userConcludedElections.css';
import {
    LOADING_MESSAGE, MODAL_TITLE, VIEW_RESULT, NO_RUNNING_ELECTION,
    USER_VIEW_ONGOING_ELECTIONS, URL, FACEBOOK, TWITTER,
    FACEBOOK_SHARER_URL, TWITTER_SHARE_URL
} from '../constants';
import { actions } from '../../viewElection';
import { actions as statsActions } from '../../viewStats';
import { analytics } from '../../configuredFirebase';
import Particles from '../../particleBackground';
import PdfDocument from './PdfDocument';

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

/* eslint-disable no-unused-vars */
const ModalTitle = ({ title, address, name }) => {
    const dispatch = useDispatch();
    const candidates = useSelector(state => state.candidates);
    const sortedCandidates = candidates.sort((a, b) => b.voteCount - a.voteCount);
    useEffect(() => {
        dispatch(statsActions.loadCandidates(address));
    }, [address]);
    return (
        <div className="modalTitle">
            <div>
                <PDFDownloadLink
                    document={
                        <PdfDocument name={name} candidates={sortedCandidates} />
                    }
                    fileName="result.pdf"
                >
                    {({
                        blob, url, loading, error,
                    }) => (
                        loading ? 'Loading Document' : 'Download now!'
                    )}
                </PDFDownloadLink>
            </div>
            <div className="modalTitle__text">
                {title}
            </div>
            <div className="modalTitle__icons">
                <div className="modalTitle__viewResults__share">
                    <Icon
                        className="modalTitle__icon"
                        type="share-alt"
                    />
                    <a
                        href={`${FACEBOOK_SHARER_URL}?u=${URL}/${address}&quote=${name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modalTitle__viewResults__shareLink"
                    >
                        <img
                            className="--very --small --greyscale"
                            src={FACEBOOK.src}
                            alt={FACEBOOK.alt}
                        />
                    </a>
                    <a
                        href={`${TWITTER_SHARE_URL}?text=${name}&url=${URL}/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modalTitle__viewResults__shareLink"
                    >
                        <img
                            className="--very --small --greyscale"
                            src={TWITTER.src}
                            alt={TWITTER.alt}
                        />
                    </a>
                </div>
            </div>

        </div>
    );
};

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
        analytics.logEvent(USER_VIEW_ONGOING_ELECTIONS);
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
            >
                <div className="viewElection">
                    <Modal
                        className="userViewElectionModal"
                        key={electionAddress}
                        visible={visible}
                        title={(
                            <ModalTitle
                                title={MODAL_TITLE}
                                address={electionAddress}
                                name={electionName}
                            />
                        )}
                        onCancel={handleCancel}
                        footer={[]}
                    >
                        <ViewResults address={electionAddress} />
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

ModalTitle.propTypes = {
    address: PropTypes.arrayOf.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
