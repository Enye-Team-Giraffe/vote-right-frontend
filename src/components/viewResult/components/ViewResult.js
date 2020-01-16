/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Typography } from 'antd';
import './ViewResult.css';
import { VOTERIGHT } from '../constants';

const { Title } = Typography;

const ViewResult = ({ match }) => (
    <div>
        <div className="heading -fullWidth -static">
            <Link to="/">
                <Title level={1}>
                    <span className="headingText">{ VOTERIGHT }</span>
                </Title>
            </Link>
        </div>

        <div>
            <h1>{match.params.electionId}</h1>
        </div>

    </div>
);

export default ViewResult;

ViewResult.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};