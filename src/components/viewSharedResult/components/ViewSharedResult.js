/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Typography } from 'antd';
import './ViewSharedResult.css';
import { VOTERIGHT } from '../constants';
import { components as ViewResults } from '../../userViewResults';
import Particles from '../../particleBackground';

const { Title } = Typography;

const ViewSharedResult = ({ match }) => (
    <div>
        <div className="heading -fullWidth -static">
            <Link to="/">
                <Title level={1}>
                    <span className="headingText">{ VOTERIGHT }</span>
                </Title>
            </Link>
        </div>

        <div>
            <div className="viewSharedResult">
                <ViewResults address={match.params.electionId} />
            </div>
        </div>

    </div>
);

export default ViewSharedResult;

ViewSharedResult.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
