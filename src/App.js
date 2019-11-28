import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/landingPage/components';
import LoginPage from './components/login/components';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    </Router>
);

export default App;
