import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/landingPage/components';
import LoginPage from './components/login/components';
import AdminLoginPage from './components/adminLoginPage/components';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/admin" component={AdminLoginPage} />
        </Switch>
    </Router>
);

export default App;
