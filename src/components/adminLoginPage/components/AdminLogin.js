/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import {
    Typography, Input, Button, Spin, Icon
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { SIGNINHEADER, SIGNIN, LOADING_MESSAGE } from '../constants';
import actions from '../actions';

import 'antd/dist/antd.css';

const { Title } = Typography;
const { Password } = Input;
function AdminLogin() {
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        const newState = {
            ...state,
            [target.name]: target.value,
        };

        setState(newState);
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.loadingAdmin(true));
        dispatch(actions.loginAdmin(state));
    };

    const adminLoading = useSelector(store => store.adminLoading);
    const adminAuthenticated = useSelector(store => store.adminAuthenticated);
    const antIcon = <Icon type="loading" className="loader" spin />;

    return (
        <div>
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
