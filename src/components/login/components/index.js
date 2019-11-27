import React from 'react';
import Layout from '../../layout';
import Login from './Login';
import WhyNin from './WhyNin';

/**
 * Login page
 * @return {jsx component} Login page
 */
function login() {
    return (
        <Layout>
            {[<Login />, <WhyNin />]}
        </Layout>
    );
}

export default login;
