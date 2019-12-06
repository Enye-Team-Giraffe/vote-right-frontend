// import the required libraries
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import the pages/components
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import Routes from './routes';

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
            <Routes />
        </Router>
    </Provider>
);

export default App;
