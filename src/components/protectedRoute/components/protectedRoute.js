import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({
    component: Component,
    authenticated,
}) {
    return (
        <Route
            render={() => (authenticated === true ? (
                <Component />
            ) : (
                <Redirect to="/login" />
            ))}
        />
    );
}

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool,
    component: PropTypes.element,
};

PrivateRoute.defaultProps = {
    authenticated: false,
    component: 0,
};
