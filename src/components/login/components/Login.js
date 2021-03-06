/* eslint-disable max-lines-per-function */

// import the modules to use
import React, { useState, useEffect } from 'react';
import {
    Typography, Input, Button, Spin, Icon, Select,
    InputNumber
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';
import {
    SIGNINWITHACCOUNT, SIGNIN, CONFIRM_HEADER, CONFIRM, LOADING_MESSAGE,
    HALF_WIDTH, PHONE_NUMBER_LEN, GENDERS, RESEND, NO_MESSAGE, WRONG_NIN_OR_NUMBER
} from '../constants';

// import the css
import './Login.css';
import 'antd/dist/antd.css';

// import the action
import actions from '../actions';

const { Title } = Typography;
const { Option } = Select;

/**
 * Login form to authenticate voters
 * @return {jsx component} Login form
 */
function Login() {
    // initialise the doispatching instance
    const dispatch = useDispatch();

    // fetching the state variable corresponding to user being authenticated
    const userAuthenticated = useSelector(state => state.userAuthenticated);

    // initialise the states of the component and default them to an empty string
    const [nin] = useState(101);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(18);
    const [confirmationCode, setConfirmationode] = useState('');
    const captchaRef = React.createRef();

    // a piece of code to run upon completion
    useEffect(() => {
        // attach the captcha to the windows
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('cap', {
            size: 'invisible',
        });
        // if the user is not currently authenticated via state
        // check the cookies
        if (!userAuthenticated) {
            // check if this iser is already authenticated
            dispatch(actions.isUserAuthenticated());
        }
        // make sure the action to enter a code is closed upon ren-render
        dispatch(actions.confirmationCodeSection(false));
    }, [dispatch, userAuthenticated]);
    // create a dispatch instance for our actions

    /**
     * Handles users phone number
     * @function
     * @param {event} event - the event of trigger of the event
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

    /**
     * Handles confirmation code input
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const handleChangeCode = ({ target }) => {
        setConfirmationode(target.value);
    };

    /**
     * Handles changes in the age of the user
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const handleChangeGender = changedGender => {
        setGender(changedGender);
    };

    /**
     * Handles changes in the age of the user
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const handleChangeAge = changedAge => {
        setAge(changedAge);
    };

    /**
     * Handles code that was input by the user
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const confirmCode = e => {
        e.preventDefault();
        // start spinning the loader
        dispatch(actions.loadingReducer(true));
        // check if the entered code was true
        dispatch(actions.confirmCode({
            age,
            confirmationCode,
            gender,
            phoneNumber,
        }));
    };

    /**
     * Handles submission of the NIN code and the phone number
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const handleSubmit = event => {
        event.preventDefault();

        // dispatch the action to alert the loader
        dispatch(actions.loadingReducer(true));
        // dispatch the function to authenticate the NIN
        dispatch(actions.authenticateUser({
            nin, phoneNumber,
        }));

        // clear the captcha
        if (window.recaptchaVerifier && captchaRef.current) {
            window.recaptchaVerifier.clear();
            captchaRef.current.innerHTML = '<div id="cap" />';
        }

        // Initialize new reCaptcha verifier
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('cap', {
            size: 'invisible',
        });
    };

    /**
     * Resend a code since the user did not get
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const resendCode = () => {
        // clear the captcha
        if (window.recaptchaVerifier && captchaRef.current) {
            window.recaptchaVerifier.clear();
            captchaRef.current.innerHTML = '<div id="cap" />';
        }

        // Initialize new reCaptcha verifier
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('cap', {
            size: 'invisible',
        });

        const stringPassword = String(phoneNumber);
        const countryphoneNumber = `+234${stringPassword.slice(1)}`;
        dispatch(actions.loadingReducer(true));
        dispatch(actions.loginUser(countryphoneNumber));
    };

    // a function to run uponclick down
    const dummy = () => { window.down = 'ondown'; };

    /**
     * Go back to the NIN section
     * @function
     * @param {event} event - the event of trigger of the event
     */
    const gotoNIN = () => {
        dispatch(actions.confirmationCodeSection(false));
    };
    // fetching the state variable corresponding to loading
    const loading = useSelector(state => state.userLoading);
    // the state as to weather to open the confirmation window
    const confirmationCodeInput = useSelector(state => state.confirmationCode);
    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;

    return (
        <div className="loginlayout">
            {userAuthenticated ? <Redirect to="/user/elections/ongoing" /> : <div />}
            <div ref={captchaRef}>
                <div id="cap" />
            </div>
            {!confirmationCodeInput
                ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <Spin
                            size="large"
                            indicator={antIcon}
                            spinning={loading}
                            className="loader"
                            tip={LOADING_MESSAGE}
                        >

                            <div className="form_subSection">
                                <Title
                                    className="form__heading"
                                    level={2}
                                >
                                    {SIGNINWITHACCOUNT}
                                </Title>
                                {/* Nin input field */}

                                {/* Phone number input field */}
                                <Input
                                    className="form__input"
                                    placeholder="Phone Number"
                                    minLength={PHONE_NUMBER_LEN}
                                    maxLength={PHONE_NUMBER_LEN}
                                    value={phoneNumber}
                                    onChange={handleChangePhoneNumber}
                                    required
                                />
                                <div className="-flex --space-between">
                                    {/* the input item for the gender */}
                                    <Select
                                        className="form__input"
                                        style={HALF_WIDTH}
                                        onChange={handleChangeGender}
                                        placeholder="Gender"
                                        required
                                    >
                                        {
                                            GENDERS.map(optionGender => (
                                                <Option
                                                    key={optionGender}
                                                    value={optionGender}
                                                >
                                                    {optionGender}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                    {/* the input item for the age */}
                                    <InputNumber
                                        style={HALF_WIDTH}
                                        className="form__input"
                                        placeholder="Age"
                                        l
                                        min={18}
                                        max={150}
                                        value={age}
                                        onChange={handleChangeAge}
                                        required
                                    />
                                </div>

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
                )
                : (
                    <form className="form" onSubmit={confirmCode}>
                        <Spin
                            size="large"
                            indicator={antIcon}
                            spinning={loading}
                            className="loader"
                            tip={LOADING_MESSAGE}
                        >
                            <div className="form_subSection">
                                <Title className="form__heading" level={4}>{CONFIRM_HEADER}</Title>
                                {/* Phone number input field */}
                                <Input
                                    className="form__input"
                                    placeholder="Confirmation Code"
                                    minLength={6}
                                    maxLength={6}
                                    value={confirmationCode}
                                    onChange={handleChangeCode}
                                    required
                                />
                                <div className="-flex">
                                    {/* Submit button */}
                                    <Button
                                        className="form__submit"
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        {CONFIRM}
                                    </Button>
                                </div>

                                <div className="alt -flex --animate -fast">
                                    <span className="alt__text">
                                        {WRONG_NIN_OR_NUMBER[0]}
                                        {' '}
                                        <span
                                            className="alt__text--resend"
                                            onClick={gotoNIN}
                                            onKeyDown={dummy}
                                            role="button"
                                            tabIndex="0"
                                        >
                                            {WRONG_NIN_OR_NUMBER[1]}
                                        </span>
                                    </span>
                                </div>

                                <div className="alt -flex --animate -slow">
                                    <span className="alt__text">
                                        {NO_MESSAGE}
                                        <span
                                            className="alt__text--resend"
                                            onClick={resendCode}
                                            onKeyDown={dummy}
                                            role="button"
                                            tabIndex="0"
                                        >
                                            {RESEND}
                                        </span>
                                    </span>
                                </div>

                            </div>
                        </Spin>
                    </form>
                )}
        </div>
    );
}

export default Login;
