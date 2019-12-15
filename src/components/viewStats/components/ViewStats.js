/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import ReactRouterPropTypes from 'react-router-prop-types';
import actions from '../actions';
import {
    BAR_OPTIONS, PIE_OPTIONS, AGE_OPTIONS, NAME, AGE, AGE_GROUP
} from '../constants';
import DataGrouper from '../utility/DataGrouper';

import './ViewStats.css';

// reducer function used to get the count of males and females from the data
const countGender = (oldCount, person) => {
    const newCount = oldCount;
    newCount[0] += (person.gender === 'female');
    newCount[1] += (person.gender === 'male');
    return newCount;
};

// reducer function used to group the candidiates by age
const countAge = (oldCount, person) => {
    const newCount = oldCount;
    newCount['18-25'] += (person.age >= 18 && person.age < 26);
    newCount['26-40'] += (person.age >= 26 && person.age < 40);
    newCount['40-60'] += (person.age >= 40 && person.age < 60);
    newCount['60+'] += (person.age > 60);
    return newCount;
};
// function to transfor candidates from their id to their name
const transformCandidates = candidates => {
    const nameMap = {};
    candidates.forEach(candidate => {
        nameMap[candidate.id] = candidate.name;
    });
    return nameMap;
};

export default function ViewStats({ match }) {
    const dispatch = useDispatch();
    // get the data from state
    const voters = useSelector(state => state.voters);
    const candidates = useSelector(state => state.candidates);

    // create mappings to transform our data to  use for the charts
    // get the number of each gender vote
    const genderCount = voters.reduce(countGender, [0, 0]);
    // get the number of each age group vote
    const voterAgeDist = voters.reduce(countAge, {
        '18-25': 0, '26-40': 0, '40-60': 0, '60+': 0,
    });
    // get the name of each candidate and current votecount for piechart
    const candidatesMapped = candidates.map(candidate => ({
        name: candidate.name,
        sliced: true,
        y: Number(candidate.voteCount),
    }));
    // group the voters by gender and votecount
    const group = DataGrouper.count(voters, ['gender', 'votedCandidate']);
    // turn the list of candidates into {candidateId:candidateVote}
    const getCandidatesNameById = transformCandidates(candidates);
    // get the total number of male votes for each candidate
    const maleVote = Object.keys(getCandidatesNameById).map(id => group
        .filter(newGroup => newGroup.gender === 'male' && newGroup.votedCandidate === id)
        .map(newGroup => newGroup.Value)
        .reduce((current, previous) => current + previous, 0));
    // get the total number of female votes for each candidate
    const femaleVote = Object.keys(getCandidatesNameById).map(id => group
        .filter(newGroup => newGroup.gender === 'female' && newGroup.votedCandidate === id)
        .map(newGroup => newGroup.Value)
        .reduce((current, previous) => current + previous, 0));
    // redefine new instances from the chart options, to include data from our state
    const newBarOptions = {
        ...BAR_OPTIONS,
        series: [{
            data: genderCount,
            name: NAME,
        }],
    };

    const newPieOptions = {
        ...PIE_OPTIONS,
        series: [{
            data: candidatesMapped,
            name: NAME,
        }],

    };

    const newAgeOptions = {
        ...AGE_OPTIONS,
        series: [{
            data: Object.values(voterAgeDist),
            name: AGE,
        }],
        xAxis: {
            categories: Object.keys(voterAgeDist),
        },

    };

    const newAgeGroupOptions = {
        ...AGE_GROUP,
        series: [{
            data: maleVote,
            name: 'Male',

        }, {
            data: femaleVote,
            name: 'Female',

        }],
        xAxis: {
            categories: Object.values(getCandidatesNameById),
        },
    };
    // define them as an array for mappint
    const chartOptions = [newBarOptions, newPieOptions, newAgeOptions, newAgeGroupOptions];
    // upon start of the app, load the voters and the candidates
    useEffect(() => {
        dispatch(actions.loadVoters(match.params.electionId));
        dispatch(actions.loadCandidates(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    return (
        <div className="statisticsLayout">
            {
                chartOptions.map(option => (
                    <Card className="chart" key={Math.random()}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={option}
                        />
                    </Card>
                ))
            }
        </div>
    );
}
// define the proptypes and their default values

ViewStats.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

