import React from 'react';
import Layout from '../../layout';
import Login from './Login';

/**
 * Login page
 * @return {jsx component} Login page
 */
function login() {
    return (
        <Layout>
            {[<Login />]}
        </Layout>
    );
}

export default login;
