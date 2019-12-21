/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import proj4 from 'proj4';
import { Card, Spin, Icon } from 'antd';
import ReactRouterPropTypes from 'react-router-prop-types';
import actions from '../actions';
import {
    BAR_OPTIONS, PIE_OPTIONS, AGE_OPTIONS, NAME, AGE, GENDER_GROUP, AGE_GROUP,
    GENDERS, AGE_BRACKETS, MAP_OPTIONS, LOADING_MESSAGE
} from '../constants';
import DataGrouper from '../utility/DataGrouper';

import './ViewStats.css';

highchartsMap(Highcharts);
// reducer function used to get the count of males and females from the data
const countGender = (oldCount, person) => {
    const newCount = oldCount;
    newCount[0] += (person.gender === GENDERS[1]);
    newCount[1] += (person.gender === GENDERS[0]);
    return newCount;
};

// reducer function used to group the candidiates by age
const countAge = (oldCount, person) => {
    const newCount = oldCount;
    newCount[AGE_BRACKETS[0]] += (person.age >= 18 && person.age < 26);
    newCount[AGE_BRACKETS[1]] += (person.age >= 26 && person.age < 40);
    newCount[AGE_BRACKETS[2]] += (person.age >= 40 && person.age < 60);
    newCount[AGE_BRACKETS[3]] += (person.age > 60);
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
// a function to bucket the age of a candidate into age group
const bucketAge = age => {
    if (age >= 18 && age < 26) {
        return AGE_BRACKETS[0];
    } if (age >= 26 && age < 41) {
        return AGE_BRACKETS[1];
    } if (age >= 41 && age < 61) {
        return AGE_BRACKETS[2];
    }
    return AGE_BRACKETS[3];
};
// a function to make a series object
const makeSeries = (keys, data) => keys.map((key, index) => ({
    data: data[index], name: key,
}));
export default function ViewStats({ match }) {
    const dispatch = useDispatch();
    // get the data from state
    const voters = useSelector(state => state.voters);
    const candidates = useSelector(state => state.candidates);

    const votersLoading = useSelector(state => state.candidatesLoading);
    const candidatesLoading = useSelector(state => state.votersListLoading);

    const loading = votersLoading && candidatesLoading;
    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    // create mappings to transform our data to  use for the charts
    // get the number of each gender vote
    const genderCount = voters.reduce(countGender, [0, 0]);
    // get the number of each age group vote
    const voterAgeDist = voters.reduce(countAge, {
        '18-25': 0, '26-40': 0, '41-60': 0, '60+': 0,
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
    // define the genders we have
    const genders = GENDERS.slice();
    // for each gender and candidate find the number of votes
    const candidateByGender = genders.map(gender => Object.keys(getCandidatesNameById)
        .map(id => group
            .filter(newGroup => newGroup.gender === gender && newGroup.votedCandidate === id)
            .map(newGroup => newGroup.Value)
            .reduce((current, previous) => current + previous, 0)));
    const genderGroupSeries = makeSeries(genders, candidateByGender);

    // firstly get the age group of each client
    const votersWithAgeGroup = voters.map(voter => ({
        ...voter,
        ageBracket: bucketAge(voter.age),
    }));
    // group the voters by age group
    const ageGroup = DataGrouper.count(votersWithAgeGroup, ['ageBracket', 'votedCandidate']);
    // define the age groups
    const ageBrackets = AGE_BRACKETS.slice();
    // for each age group and candidate get the total votes allocated to them
    const candidateByAge = ageBrackets.map(ageBracket => Object.keys(getCandidatesNameById)
        .map(id => ageGroup
            .filter(newGroup => (
                newGroup.ageBracket === ageBracket && newGroup.votedCandidate === id))
            .map(newGroup => newGroup.Value)
            .reduce((current, previous) => current + previous, 0)));
    const ageGroupSeries = makeSeries(ageBrackets, candidateByAge);

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

    const newGenderGroupOptions = {
        ...GENDER_GROUP,
        series: genderGroupSeries,
        xAxis: {
            categories: Object.values(getCandidatesNameById),
        },
    };

    const newAgeGroupOptions = {
        ...AGE_GROUP,
        series: ageGroupSeries,
        xAxis: {
            categories: Object.values(getCandidatesNameById),
            crosshair: true,
        },
    };
    // define them as an array for mappint
    const chartOptions = [
        newPieOptions, newBarOptions, newAgeOptions,
        newGenderGroupOptions, newAgeGroupOptions,
    ];

    // upon start of the app, load the voters and the candidates
    useEffect(() => {
        // clear the current voters state
        dispatch(actions.pushVoters([]));
        dispatch(actions.pushCandidates([]));

        // start spinning the loaders
        dispatch(actions.loadingVoters(true));
        dispatch(actions.loadingCandidates(true));

        // load the voters and candidates
        dispatch(actions.loadVoters(match.params.electionId));
        dispatch(actions.loadCandidates(match.params.electionId));

        // initialise proj4
        if (typeof window !== 'undefined') {
            window.proj4 = window.proj4 || proj4;
        }
    }, [dispatch, match.params.electionId]);

    const hideUntilLoaded = () => ((loading) ? '--hidden' : '');
    return (
        <div className="statisticsLayout">
            <Spin
                size="large"
                indicator={antIcon}
                spinning={loading}
                className="loader"
                tip={LOADING_MESSAGE}
            />
            <Card className={`chart ${hideUntilLoaded()}`} key={Math.random()}>
                <HighchartsReact
                    constructorType="mapChart"
                    highcharts={Highcharts}
                    options={MAP_OPTIONS}
                />
            </Card>
            {
                chartOptions.map(option => (
                    <Card className={`chart ${hideUntilLoaded()}`} key={Math.random()}>
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

