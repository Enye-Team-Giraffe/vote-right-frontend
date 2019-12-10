/* eslint-disable max-lines-per-function */
import React from 'react';
import './DashboardLayout.css';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import SideNav from './SideNav';
import { LOGOUT } from '../constants';
import CreateElection from '../../createElection/components';

const { Header, Content } = Layout;

/**
 *@Component for displaying dashboard layout
 *
 *@component
 *@return {jsx} - dashboard layout
*/
const DashboardLayout = () => (
    <Layout>
        <SideNav />
        <Layout>
            <Header className="header">
                <span className="header__logout">{LOGOUT}</span>
            </Header>
            <Content className="content">
                <Switch>
                    <Route exact path="/dashboard" />
                    <Route path="/dashboard/create_election" component={CreateElection}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>
);

export default DashboardLayout;
