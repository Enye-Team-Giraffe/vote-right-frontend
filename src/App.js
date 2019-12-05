// import the required libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import the pages/components
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { LandingPage } from './components/landingPage/components';
import { components as LoginPage } from './components/login';
import AdminLoginPage from './components/adminLoginPage/components';
import { DashboardLayout as Dashboard } from './components/dashboard/components';

// import the combinedSagas and the combinedReducers
import rootSaga from './sagas';
import allReducers from './reducers'; // import all the reducers

// initialise the saga middleware
const sagaMiddleware = createSagaMiddleware();

// initialise an array of all the middlewares we are going to use
const middleware = [sagaMiddleware];
const initialState = {};

// create the globa store
const store = createStore(
    allReducers,
    initialState,
    // wrap all of them in a compose in order to wrap them as a single argument
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// run the middleware for the rootsaga
sagaMiddleware.run(rootSaga);

// the exported app
const App = () => (
    <Provider store={store}>

        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/admin" component={AdminLoginPage} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>

    </Provider>
);

export default App;
