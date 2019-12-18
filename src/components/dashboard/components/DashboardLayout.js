/* eslint-disable max-lines-per-function */
import React from 'react';
import './DashboardLayout.css';
import { Layout, Breadcrumb } from 'antd';
import {
    Route, Switch, useHistory, Link, withRouter
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import SideNav from './SideNav';
import { LOGOUT, BREADCRUMB_NAME_MAP } from '../constants';
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
 *a function for filtering the links to create a breadcrumb
 *
 *@Params string
 *@return {string} -
*/
const mapRouteName = name => {
    const split = name.split('/');
    if (split.length < 4) {
        return BREADCRUMB_NAME_MAP[name];
    }
    const newSplit = split.slice(0, 3).join('/');
    return BREADCRUMB_NAME_MAP[newSplit];
};

/** FinishedElection
 *@Component for displaying dashboard layout
 *
 *@component
 *@return {jsx} - dashboard layout
*/
const DashboardLayout = withRouter(props => {
    const dispatch = useDispatch();
    const history = useHistory();

    // define the bread crumb variables

    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{mapRouteName(url)}</Link>
            </Breadcrumb.Item>
        );
    });
    if (extraBreadcrumbItems.length > 2) {
        extraBreadcrumbItems.splice(1, 1);
    }
    const breadcrumbItems = [].concat(extraBreadcrumbItems);

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
                    <div className="content__breadcrumb">
                        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                    </div>
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
