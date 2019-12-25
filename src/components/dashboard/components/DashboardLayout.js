/* eslint-disable max-lines-per-function */
import React from 'react';
import './DashboardLayout.css';
import { Layout } from 'antd';
import {
    Route, Switch, useHistory, withRouter
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import SideNav from './SideNav';
import { LOGOUT } from '../constants';
import CreateElection from '../../createElection/components';
import { components as ViewElection } from '../../viewElection';
import { components as ViewStats } from '../../viewStats';
import AddCandidate from '../../addCandidate/components';
import { component as PendingEleciton } from '../../pendingElection';
import { component as FinishedElection } from '../../finishedElection';
import { components as ViewCandidate } from '../../viewCandidate';

import actions from '../actions';

const { Header, Content } = Layout;

/** FinishedElection
 *@Component for displaying dashboard layout
 *
 *@component
 *@return {jsx} - dashboard layout
*/
const DashboardLayout = withRouter(() => {
    const dispatch = useDispatch();
    const history = useHistory();

    // define the bread crumb variables

    // logout of the FinishedElection
    const logout = () => {
        dispatch(actions.logoutUser(history));
    };

    // a function to be activated upon keydown
    const dummy = () => {
        window.dummy = 'dummy';
    };

    return (
        <Layout>
            <SideNav />
            <Layout>
                <Header className="header">
                    <span
                        aria-label="Mute volume"
                        onClick={logout}
                        onKeyDown={dummy}
                        role="button"
                        tabIndex="0"
                        className="header__logout"
                    >
                        {LOGOUT}
                    </span>
                </Header>
                <Content className="content">
                    <Switch>
                        <Route
                            exact
                            path="/dashboard"
                            component={ViewElection}
                        />
                        <Route
                            exact
                            path="/dashboard/create_election"
                            component={CreateElection}
                        />
                        <Route
                            path="/dashboard/statistics/:electionId"
                            component={ViewStats}
                        />
                        <Route
                            path="/dashboard/add_candidate/:electionId"
                            component={AddCandidate}
                        />
                        <Route
                            path="/dashboard/pending_election"
                            component={PendingEleciton}
                        />
                        <Route
                            path="/dashboard/concluded_election"
                            component={FinishedElection}
                        />
                        <Route
                            path="/dashboard/view_candidates/:electionId"
                            component={ViewCandidate}
                        />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
});

export default DashboardLayout;
