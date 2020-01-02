/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 Card, Button, Icon, Spin 
} from 'antd';
import './ViewCandidates.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
 AGE_LABEL, PARTY_LABEL, VOTE, LOADING_MESSAGE 
} from '../constants';
import { actions as viewStatsActions } from '../../viewStats';

/**
 * Display candidates view
 *
 * @component
 * @return {component} - Component that displays candidates
 */
const ViewCandidates = ({ match }) => {
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(viewStatsActions.pushCandidates([]));
        dispatch(viewStatsActions.loadingCandidates(true));
        dispatch(viewStatsActions.loadCandidates(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    const candidates = useSelector(state => state.candidates);
    const loading = useSelector(state => state.candidatesLoading);

    const handleVote = id => {
        console.log(id);
        const voterDetails = {
            candidateId: id,
            electionId: match.params.electionId,
        };
    };

    return (
        <div className="candidateView">
            <div className="candidateList">
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={loading}
                    className="loader"
                    tip={LOADING_MESSAGE}
                />
                {
                    candidates.map(candidate => (
                        <Card
                            key={candidate.id}
                            className="candidateCard"
                            cover={(
                                <img
                                    className="candidateCard__image"
                                    src="https://i.pravatar.cc"
                                    alt="candidate_picture"
                                />
                            )}
                        >
                            <p className="candidateCard__label -bold -fontBig">{candidate.name}</p>
                            <p className="candidateCard__label">{`${candidate.age} ${AGE_LABEL}`}</p>
                            <p className="candidateCard__label">{`${PARTY_LABEL} ${candidate.party}`}</p>
                            <Button
                                type="primary"
                                className="candidateCard__vote"
                                onClick={() => handleVote(candidate.id)}
                            >
                                {VOTE}
                            </Button>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewCandidates;

ViewCandidates.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
