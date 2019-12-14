import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import actions from '../actions';
import { OPTIONS } from '../constants';

import './ViewStats.css';

export default function ViewStats({ match }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadVoters(match.params.electionId));
    }, [dispatch, match.params.electionId]);

    return (
        <div className="statisticsLayout">
            <Card className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={OPTIONS}
                />
            </Card>
        </div>
    );
}
// define the proptypes and their default values

ViewStats.propTypes = {
    match: PropTypes.InstanceOf(Array).isRequired,
};

