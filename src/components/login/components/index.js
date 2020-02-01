import React from 'react';
import withLayout from '../../layout';
import Login from './Login';
import WhyNin from './WhyNin';

const LoginWithLayout = withLayout(Login, WhyNin);

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
