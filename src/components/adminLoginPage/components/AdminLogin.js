/* eslint-disable max-lines-per-function */
// import the modules from NIN
import React, { useState, useEffect } from 'react';
import {
    Typography, Input, Button, Spin, Icon
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import our modules
import { SIGNINHEADER, SIGNIN, LOADING_MESSAGE } from '../constants';
import actions from '../actions';

import 'antd/dist/antd.css';

const { Title } = Typography;
const { Password } = Input;

/**
 * Login form to authenticate voters
 * @return {jsx component} Login form
 */
function AdminLogin() {
    // get a state variables for out input
    const [state, setState] = useState({});
    const dispatch = useDispatch();

    // upon load of page check if the user is authenticated
    useEffect(() => {
        dispatch(actions.isAdminAuthenticated());
    });

    /**
     * Handles input change
     * @function
     * @param {event} event - the event of the input field
     */
    const handleChange = ({ target }) => {
        const newState = {
            ...state,
            [target.name]: target.value,
        };

        setState(newState);
    };

    const handleSubmit = event => {
        event.preventDefault();
        // set the loader running
        dispatch(actions.loadingAdmin(true));
        // dispatch the login function
        dispatch(actions.loginAdmin(state));
        // clear all the fields
    };

    // get the state curresponding to if the admin is loading
    const adminLoading = useSelector(store => store.adminLoading);
    // get all state to tell us if the user is authenticated
    const adminAuthenticated = useSelector(store => store.adminAuthenticated);
    // constant for customising the loader
    const antIcon = <Icon type="loading" className="loader" spin />;

    return (
        <div>
            {adminAuthenticated ? <Redirect to="/admindashboard" /> : <div />}
            <form className="form" onSubmit={handleSubmit}>
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={adminLoading}
                    className="loader"
                    tip={LOADING_MESSAGE}
                >
                    <div className="form_subSection">
                        <Title className="form__heading" level={3}>{SIGNINHEADER}</Title>
                        {/* Email input field */}
                        <Input
                            className="form__input"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            required
                        />
                        {/* Password input field */}
                        <Password
                            className="form__input"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <div className="-flex">
                            {/* Submit button */}
                            <Button
                                className="form__submit"
                                type="primary"
                                htmlType="submit"
                            >
                                {SIGNIN}
                            </Button>
                        </div>
                    </div>
                </Spin>
            </form>
        </div>
    );
}

export default AdminLogin;
