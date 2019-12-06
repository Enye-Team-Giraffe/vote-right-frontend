import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage } from './components/landingPage/components';
import { components as LoginPage } from './components/login';
import AdminLoginPage from './components/adminLoginPage/components';
import { DashboardLayout as Dashboard } from './components/dashboard/components';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/admin" component={AdminLoginPage} />
        <Route path="/dashboard" component={Dashboard} />
    </Switch>
);

export default Routes;
