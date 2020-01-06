/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import './ViewCandidates.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Spin } from 'antd';
import { actions } from '../../viewStats';
import { LOADING_MESSAGE, NO_CANDIDATE } from '../constants';

const { Meta } = Card;

export default function ViewCandidates({ match }) {
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.pushCandidates([]));
        dispatch(actions.loadingCandidates(true));
        dispatch(actions.loadCandidates(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    const candidates = useSelector(state => state.candidates);
    const loading = useSelector(state => state.candidatesLoading);
    return (
        <div>

            <Spin
                size="large"
                indicator={antIcon}
                spinning={loading}
                className="loader"
                tip={LOADING_MESSAGE}
            />

            <div className="viewCandidates --grid">
                {
                    candidates.map(candidate => (
                        <Card
                            key={candidate.id}
                            className="viewCandidates__card"
                            cover={(
                                <img
                                    className="viewCandidates__cardImage"
                                    alt="example"
                                    src="https://i.pravatar.cc/500"
                                />
                            )}
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="edit" key="edit" />,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                className="viewCandidates__card__meta --name"
                                title={candidate.name}
                            />
                            <Meta
                                className="viewCandidates__card__meta --party"
                                title={`${candidate.age} years of age`}
                            />
                            <Meta
                                className="viewCandidates__card__meta --party"
                                title={`Member of ${candidate.party}`}
                            />
                            <Meta
                                className="viewCandidates__card__meta --education"
                                title={`Last studied at ${candidate.education}`}
                            />
                            <Meta
                                className="viewCandidates__card__meta --quote"
                                description={`'${candidate.quote}'`}
                            />
                        </Card>
                    ))
                }
                {
                    // if there is no candidateloading  then show that there is none.
                    (candidates.length === 0 && !loading) ? (
                        <div className="no_candidate">
                            {NO_CANDIDATE}
                        </div>
                    ) : ''
                }
            </div>

        </div>
    );
}

ViewCandidates.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
