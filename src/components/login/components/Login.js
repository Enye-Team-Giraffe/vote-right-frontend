import React, { useState } from 'react';

import { Typography, Input, Button } from 'antd';
import './style.css';
import 'antd/dist/antd.css';

const { Title } = Typography;

/**
 * Login form to authenticate voters
 * @return {jsx component} Login form
 */
function Login() {
    const [nin, setNin] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

/**
 * Handles users NIN number
 * @function
 * @param {event} event - the event of 
 */
    const handleChangeNin = ({ target }) => {
        const pattern = /^\d+$/;
        if (pattern.test(target.value)) {
            setNin(target.value);
        }
        if (nin.length === 1 && target.value === '') {
            setNin(target.value);
        }
    };

/**
 * Handles users phone number
 * @function
 * @param {event} event - the event of 
 */
    const handleChangePhoneNumber = ({ target }) => {
        const pattern = /^\d+$/;
        if (pattern.test(target.value)) {
            setPhoneNumber(target.value);
        }
        if (phoneNumber.length === 1 && target.value === '') {
            setPhoneNumber(target.value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log({ nin, phoneNumber });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form_subSection">
                <Title className="form__heading" level={3}>Sign in to your Account</Title>
                <Input
                    className="form__input"
                    placeholder="NIN number"
                    value={nin}
                    onChange={handleChangeNin}
                    required
                />
                <Input
                    className="form__input"
                    placeholder="Phone Number"
                    minLength={11}
                    maxLength={11}
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber}
                    required
                />
                <div className="-flex">
                    <Button
                        className="form__submit"
                        type="primary"
                        htmlType="submit"
                    >
                      SIGN IN
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default Login;
