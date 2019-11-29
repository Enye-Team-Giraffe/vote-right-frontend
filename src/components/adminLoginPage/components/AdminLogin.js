/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import { SIGNINHEADER, SIGNIN } from '../constants';

import './AdminLogin';
import 'antd/dist/antd.css';

const { Title } = Typography;
const { Password } = Input;

/**
 * Login form to authenticate voters
 * @return {jsx component} Login form
 */
function AdminLogin() {
    const [state, setState] = useState({});

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
        console.log(target.name, state[target.name])

    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(state)
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
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
        </form>
    );
}

export default AdminLogin;
