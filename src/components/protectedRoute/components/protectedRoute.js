import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A wrapper for routers, which is used to limit which route users who have not signed in can use
 *
 * @function
 * @param {Component} component - the jsx component for default page layout
 * @param {func} authenticated - A boolean value indicating if the current user is loggedIn or not
 */
export default function PrivateRoute({
    component: Component,
    authenticated,
}) {
    return (
        // if the user is logged in, let them proceed, other wise redirect to login page
        <Route
            render={() => (authenticated === true ? (
                <Component />
            ) : (
                <Redirect to="/login" />
            ))}
        />
    );
}

// define the proptypes and their default values

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool,
    component: PropTypes.element,
};

PrivateRoute.defaultProps = {
    authenticated: false,
    component: 0,
};
