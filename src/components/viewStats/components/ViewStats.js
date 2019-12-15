/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import ReactRouterPropTypes from 'react-router-prop-types';
import actions from '../actions';
import { 
    BAR_OPTIONS, PIE_OPTIONS, AGE_OPTIONS ,NAME,AGE
} from '../constants';
import DataGrouper from "../utility/DataGrouper"

import './ViewStats.css';

// reducer function used to get the count of males and females from the data
const countGender = (oldCount, person) => {
    const newCount = oldCount;
    newCount[0] += (person.gender === 'female');
    newCount[1] += (person.gender === 'male');
    return newCount;
};

// reducer function used to group the candidiates by age
const countAge = (oldCount,person)=>{
    const newCount=oldCount
    newCount["18-25"] += (person.age>=18 && person.age<26)
    newCount["26-40"] += (person.age>=26 && person.age<40)
    newCount["40-60"] += (person.age>=40 && person.age<60)
    newCount["60+"] += (person.age>60)
    return newCount
}

export default function ViewStats({ match }) {
    const dispatch = useDispatch();
    // get the data from state
    const voters = useSelector(state => state.voters);
    const candidates = useSelector(state => state.candidates);
    
    // create mappings to use for the charts
    const genderCount = voters.reduce(countGender, [0, 0]);
    const voterAgeDist = voters.reduce(countAge,{
                        "18-25":0,"26-40":0,"40-60":0,"60+":0
                    })
    const candidatesMapped = candidates.map(candidate => ({
        name: candidate.name,
        sliced: true,
        y: Number(candidate.voteCount),
    }));
    
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
        xAxis: {
            categories: Object.keys(voterAgeDist),
        },
        series: [{
            data: Object.values(voterAgeDist),
            name: AGE,
        }],
    }
    const group = DataGrouper.count(voters, ['gender','votedCandidate'])
    // console.log(group)
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
            <Card className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={newAgeOptions}
                />
            </Card>
        </div>
    );
}
// define the proptypes and their default values

ViewStats.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

