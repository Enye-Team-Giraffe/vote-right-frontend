/* eslint-disable max-lines-per-function */
import React from 'react';
import {
    Route, Switch, useHistory

} from 'react-router-dom';
import { Layout } from 'antd';
// import MainContent from './MainContent';
import { useDispatch } from 'react-redux';
import { components as UserViewOngoing } from '../../userOngoingElection';
import { components as UserViewConcluded } from '../../userConcludedElection';
import { components as ViewResults } from '../../userViewResults';
import { component as UserViewPending } from '../../userPendingElection';
import { components as UserViewCandidates } from '../../userViewCandidates';
import SideNav from './SideNav';
import { actions } from '../../dashboard';
import { actions as userActions } from '../../login';

const { Header, Content } = Layout;

const VoterLayout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // define the bread crumb variables

    // logout of the FinishedElection
    const logout = () => {
        dispatch(actions.logoutUser(history));
        dispatch(userActions.authenticateUserStatus(false));
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
                       logout
                        {' '}
                        {/* {LOGOUT} */}
                    </span>
                </Header>
                <Content className="content">
                    <Switch>
                        <Route
                            exact
                            path="/user/elections/ongoing"
                            component={UserViewOngoing}
                        />
                        <Route
                            exact
                            path="/user/elections/concluded"
                            component={UserViewConcluded}
                        />
                        <Route
                            exact
                            path="/user/elections/ongoing"
                            component={UserViewOngoing}
                        />
                        <Route
                            exact
                            path="/user/elections/pending"
                            component={UserViewPending}
                        />
                        <Route
                            exact
                            path="/user/elections/ongoing/:electionId/vote"
                            component={UserViewCandidates}
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
};
export default VoterLayout;
