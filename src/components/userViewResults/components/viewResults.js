/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import './viewResults.css';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Icon, Spin } from 'antd';
import { actions } from '../../viewStats';
import { LOADING_MESSAGE, NO_CANDIDATE } from '../constants';


const { Meta } = Card;


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default function ViewResults({ match }) {
  // get the state variables
  const candidates = useSelector(state => state.candidates);
  const loading = useSelector(state => state.candidatesLoading);
  // dispatch the loadCandidates saga
  // which has been defined in the viewstats component
  const dispatch = useDispatch();
  const totalVotes = candidates.reduce((previous,next)=>previous+Number(next.voteCount),0);
  const calcPercentage = (num,total)=>((Number(num)/total).toFixed(2)*100);
  let sortedCandidate=candidates.sort((a,b)=>b.voteCount-a.voteCount)

  useEffect(() => {
      dispatch(actions.pushCandidates([]));
      dispatch(actions.loadingCandidates(true));
      dispatch(actions.loadCandidates(match.params.electionId));
  }, [dispatch, match.params.electionId]);

  // item for customising the spinner
  const antIcon = <Icon type="loading" className="loader" spin />;
  return (
      <div className="viewCandidates --results">
          <Spin
              size="large"
              indicator={antIcon}
              spinning={loading}
              className="loader"
              tip={LOADING_MESSAGE}
          >
          </Spin>
              {
                sortedCandidate.map(candidate => (
                      <Card
                          key={candidate.id}
                          className="viewCandidates__card"
                          cover={(
                              <img
                                  alt="example"
                                  src="https://i.pravatar.cc/500"
                              />
                          )}
                          actions={[
                            <IconText type="check" text={candidate.voteCount} key="list-vertical-like-o" />,
                            <IconText type="arrow-up" text={calcPercentage(candidate.voteCount,totalVotes) + "%"} key="list-vertical-message" />,
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
  );
}

ViewResults.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

