/* eslint-disable max-lines-per-function */
import React from 'react';
import './DashboardLayout.css';
import { Layout } from 'antd';
import {
    Route, Switch, useHistory
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SideNav from './SideNav';
import { LOGOUT, ADMIN } from '../constants';
import { protectedRoute as ProtectedRoute } from '../../protectedRoute/components';
import CreateElection from '../../createElection/components';
import { components as ViewElection } from '../../viewElection';
import { components as ViewStats } from '../../viewStats';
import AddCandidate from '../../adminAddCandidate/components';
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
const DashboardLayout = () => {
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
                        <ProtectedRoute
                            exact
                            path="/dashboard/elections/ongoing"
                            component={ViewElection}
                            authenticated={ADMIN}
                        />
                        <ProtectedRoute
                            exact
                            path="/dashboard/elections"
                            component={CreateElection}
                            authenticated={ADMIN}
                        />
                        <Route
                            path="/dashboard/elections/:electionId/statistics"
                            authenticated={ADMIN}
                            component={ViewStats}
                        />
                        <Route
                            path="/dashboard/elections/:electionId/register-candidate"
                            authenticated={ADMIN}
                            component={AddCandidate}
                        />
                        <ProtectedRoute
                            path="/dashboard/elections/pending"
                            authenticated={ADMIN}
                            component={PendingEleciton}
                        />
                        <Route
                            path="/dashboard/elections/concluded"
                            authenticated={ADMIN}
                            component={FinishedElection}
                        />
                        <Route
                            path="/dashboard/elections/:electionId/candidates"
                            authenticated={ADMIN}
                            component={ViewCandidate}
                        />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
