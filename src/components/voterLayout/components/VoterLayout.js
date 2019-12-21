/* eslint-disable max-lines-per-function */
import React from 'react';
import {
    Route, Switch, Link, withRouter
} from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import MainContent from './MainContent';
import TopNav from './TopNav';
import { BREADCRUMB_NAME_MAP } from '../constants';
import { components as userViewOngoing } from '../../userOngoingElection';

const { Content } = Layout;

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

const VoterLayout = withRouter(props => {
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

    return (
        <Layout>
            <TopNav />
            <Content className="content">
                <div className="content__breadcrumb --voterLayout">
                    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                </div>
                <Switch>
                    <Route
                        exact
                        path="/user/"
                        component={MainContent}
                    />
                    <Route
                        exact
                        path="/user/ongoing-elections"
                        component={userViewOngoing}
                    />
                </Switch>
            </Content>
        </Layout>
    );
});

export default VoterLayout;
