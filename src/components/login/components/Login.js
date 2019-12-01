/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { SIGNINWITHACCOUNT, SIGNIN } from '../constants';
import './Login.css';
import 'antd/dist/antd.css';
import actions from '../actions';
const { Title } = Typography;
function Login() {
    const [nin, setNin] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const handleChangeNin = ({ target }) => {
        const pattern = /^\d+$/;
        if (pattern.test(target.value)) {
            setNin(target.value);
        }
        if (nin.length === 1 && target.value === '') {
            setNin(target.value);
        }
    };
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

        // dispatch the login function with the phone number
        dispatch(actions.authenticateUser({ nin, phoneNumber }));
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form_subSection">
                <Title className="form__heading" level={2}>{SIGNINWITHACCOUNT}</Title>
                {/* Nin input field */}
                <Input
                    className="form__input"
                    placeholder="NIN number"
                    value={nin}
                    onChange={handleChangeNin}
                    required
                />
                {/* Phone number input field */}
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

export default Login;
