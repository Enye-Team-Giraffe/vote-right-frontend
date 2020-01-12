/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../viewElection/components/ViewElection';
import {
    Card, Icon, Spin, Modal, Tag
} from 'antd';
import { LOADING_MESSAGE } from '../../viewElection/constants';
import {
    NO_PENDING_ELECTION, MODAL_HEADER
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
            <Tag style={{'width':"150px", textAlign:'center'}} color="green">Pending Election</Tag>
        </div>
        <div className="cardTitle__title">
            The {' '} {title} {' '} Election
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
            <span  className="cardMeta__meta__text">
                Starts in {daysTillStart} days
            </span>
        </div>
        <div className="cardMeta__meta">
            <Icon className="cardMeta__meta__icon" type="team" />
            <span  className="cardMeta__meta__text">
                {numCandidates} Registered Candidates
            </span>
        </div>
    </div>
)

const CardFooter = ({ endDate }) =>(
    <div className="cardTitle__meta">
        <Icon type="calendar" className="cardTitle__meta__icon" />
        <span  className="cardTitle__meta__text">
            Ends on 2020-10-11
        </span>
    </div>
)

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
                                    <CardFooter endDate="lol"/>
                                ]}
                            >
                                <Meta
                                    description={
                                        <CardMeta 
                                            description={election.description}
                                            daysTillStart={dateDiffFromToday(election.startdate)}
                                            numCandidates={statistics[election.location][0]}
                                        />
                                    }
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
