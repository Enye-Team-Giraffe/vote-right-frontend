import React from 'react';
// import PropTypes from 'prop-types';
import './style.css';

/**
 * Default layout for pages
 *
 * @function
 * @param {func} ComponentOne - one of two component to display
 * @param {func} ComponentTwo - one of two component to display
 * @return {Component} the jsx component for default page layout
 */
const withLayout = (ComponentOne = 'div', ComponentTwo = 'div') => () => (
    <div className="layout">
        <div className="whiteSection">
            <ComponentOne />
        </div>
        <div className="blueSection -blue">
            <ComponentTwo />
        </div>
    </div>
);

export default withLayout;
