/* eslint-disable max-lines-per-function */
import React from 'react';
import { Layout } from 'antd';
import {
    Route, Switch, useHistory, withRouter
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import MainContent from './MainContent';
import SideNav from './SideNav';
import { LOGOUT } from '../constants';
import { components as UserViewOngoing } from '../../userOngoingElection';
import { components as UserViewConcluded } from '../../userConcludedElection';
import { components as ViewResults } from '../../userViewResults';

import { actions } from '../../dashboard';

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
                            path="/user/ongoing-elections"
                            component={UserViewOngoing}
                        />
                        <Route
                            exact
                            path="/user/concluded-elections"
                            component={UserViewConcluded}
                        />
                        <Route
                            exact
                            path="/user/results/:electionId"
                            component={ViewResults}
                        />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
});

export default DashboardLayout;
