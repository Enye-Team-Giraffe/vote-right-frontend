/* eslint-disable max-lines-per-function */
import React from 'react';
import './DashboardLayout.css';
import { Layout } from 'antd';
import {
    Route, Switch
} from 'react-router-dom';
import SideNav from './SideNav';
import { LOGOUT } from '../constants';

const {
    Header, Content,
} = Layout;

const DashboardLayout = () => (
    <Layout>
        {/* Side navigation bar */}
        <SideNav />
        <Layout>
            {/* Start of header component */}
            <Header className="header">
                <span className="header__logout">{LOGOUT}</span>
            </Header>
            {/* End of header component */}
            {/* Start of main content */}
            <Content className="content">
                {/* Routes to display different content */}
                <Switch>
                    <Route exact path="/dashboard" />
                    <Route path="/dashboard/" />
                </Switch>
            </Content>
            {/* End of main content */}
        </Layout>
    </Layout>
);

export default DashboardLayout;
