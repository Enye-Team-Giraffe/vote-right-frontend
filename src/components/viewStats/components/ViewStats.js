/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import ReactRouterPropTypes from 'react-router-prop-types';
import actions from '../actions';
import { BAR_OPTIONS, PIE_OPTIONS } from '../constants';

import './ViewStats.css';

// reducer function used to get the count of males and females from the data
const countGender = (oldCount, person) => {
    const newCount = oldCount;
    newCount[0] += (person.gender === 'female');
    newCount[1] += (person.gender === 'male');
    return newCount;
};

export default function ViewStats({ match }) {
    const dispatch = useDispatch();

    const voters = useSelector(state => state.voters);
    const candidates = useSelector(state => state.candidates);

    const genderCount = voters.reduce(countGender, [0, 0]);
    const candidatesMapped = candidates.map(candidate => ({
        name: candidate.name,
        sliced: true,
        y: Number(candidate.voteCount),
    }));

    const newBarOptions = {
        ...BAR_OPTIONS,
        series: [{
            data: genderCount,
            name: 'gender',
        }],
    };

    const newPieOptions = {
        ...PIE_OPTIONS,
        series: [{
            colorByPoint: true,
            data: candidatesMapped,
            name: 'Candidates',
        }],

    };

    useEffect(() => {
        dispatch(actions.loadVoters(match.params.electionId));
        dispatch(actions.loadCandidates(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    return (
        <div className="statisticsLayout">
            <Card className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={newBarOptions}
                />
            </Card>
            <Card className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={newPieOptions}
                />
            </Card>
        </div>
    );
}
// define the proptypes and their default values

ViewStats.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

