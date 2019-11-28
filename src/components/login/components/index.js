import React from 'react';
import withLayout from '../../layout';
import Login from './Login';

const LoginWithLayout = withLayout(Login);

/**
 * Login page
 * @return {jsx component} Login page
 */
function login() {
    return (
        <LoginWithLayout />
    );
}

export default login;
