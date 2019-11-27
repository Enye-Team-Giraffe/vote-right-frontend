import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Default layout for pages
 *
 * @function
 * @param {Array} children - the array of components to display
 * @return {Component} the jsx component for default page layout
 */
function Layout({ children }) {
    return (
        <div className="layout">
            <div className="whiteSection">
                {children[0]}
            </div>
            <div className="blueSection -blue">
                {children[1]}
            </div>
        </div>
    );
}

export default Layout;

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};
