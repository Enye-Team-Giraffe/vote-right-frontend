import React from 'react';
import Layout from '../../layout';
import Login from './Login';

function login() {
    return (
        <Layout>
            {[<Login />]}
        </Layout>
    );
}

export default login;
