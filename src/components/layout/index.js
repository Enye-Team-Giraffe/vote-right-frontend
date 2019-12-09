/* eslint-disable max-lines-per-function */
import React from 'react';
import './layout.css';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { VOTERIGHT } from './constants';

const { Title } = Typography;

/**
 * Default layout for pages
 *
 * @function
 * @param {func} ComponentOne - one of two component to display
 * @param {func} ComponentTwo - one of two component to display
 * @return {Component} the jsx component for default page layout
 */
const withLayout = (ComponentOne = 'div', ComponentTwo = 'div') => () => (
    <div>
        <div className="layout">
            <div className="whiteSection">
                <div className="heading">
                    <Link to="/">
                        <Title level={1}>
                            <span className="headingText">{ VOTERIGHT }</span>
                        </Title>
                    </Link>
                </div>
                <ComponentOne />
            </div>
            <div className="blueSection -blue">
                <div className="blueSection__wrapper">
                    <ComponentTwo />
                </div>
            </div>
        </div>
    </div>
);

export default withLayout;
