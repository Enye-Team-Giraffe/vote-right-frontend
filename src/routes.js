import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ADMIN } from "./constants"
import { LandingPage } from './components/landingPage/components';
import { components as LoginPage } from './components/login';
import AdminLoginPage from './components/adminLoginPage/components';
import { DashboardLayout as adminDashboard } from './components/dashboard/components';
import { protectedRoute as ProtectedRoute } from './components/protectedRoute/components';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/admin" component={AdminLoginPage} />
        <ProtectedRoute exact path="/admindashboard" component={adminDashboard} authenticated={ADMIN} />
    </Switch>
);


export default Routes;
