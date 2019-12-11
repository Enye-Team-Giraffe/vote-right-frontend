/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card, Input, DatePicker, Button,Spin,Icon
} from 'antd';
import './CreateElection.css';
import actions from '../actions';
import {
    NAME, DESCRIPTION, STARTDATE, ENDDATE, CREATEELECTION
} from '../constants';

/**
 * Form for creating election
 *
 * @component
 * @return {component} - Component for creating election
 */
const CreateElection = () => {
    const dispatch = useDispatch();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [startDate, updateStartDate] = useState('');
    const [endDate, updateEndDate] = useState('');

    /**
     * Handles change in input text field
     * @function
     * @param {event} - Event on input field
     */
    const handleChangeText = ({ target }) => {
        if (target.name === 'name') {
            updateName(target.value);
        } else {
            updateDescription(target.value);
        }
    };

    /**
     * Handles change in start date datepicker
     * @function
     * @param {date} - selected date
     */
    const handleStartDate = date => {
        const formattedDate = date.format('L');
        updateStartDate(formattedDate);
    };

    /**
     * Handles change end date datepicker
     * @function
     * @param {date} - selected date
     */
    const handleEndDate = date => {
        const formattedDate = date.format('L');
        updateEndDate(formattedDate);
    };

    /**
     * Handles submission of form data
     * @function
     * @param {event} - event triggered by button click
     */
    const handleSubmit = event => {
        event.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const payload = {
            description, endDate, name, startDate,
        };
        dispatch(actions.loadingCreateUser(true));
        dispatch(actions.createElection(payload));
    };
    const createElectionLoading = useSelector(store => store.createElectionLoading);
    const antIcon = <Icon type="loading" className="loader" spin />;

    return (
        <div className="createElection">
            <form className="createElectionForm" onSubmit={handleSubmit}>
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={createElectionLoading}
                    className="loader"
                    tip={"loading...."}
                >
                    <Card className="createElectionCard">
                        <h1 className="createElectionForm__heading">{CREATEELECTION}</h1>
                        <span>{NAME}</span>
                        <Input
                            className="createElectionForm__input"
                            name="name"
                            required
                            onChange={handleChangeText}
                        />
                        <span>{DESCRIPTION}</span>
                        <Input.TextArea
                            className="createElectionForm__textArea"
                            name="description"
                            required
                            onChange={handleChangeText}
                        />
                        <span className="-topMargin">{STARTDATE}</span>
                        <DatePicker
                            className="createElectionForm__datePicker"
                            placeholder="Select date"
                            required
                            onChange={handleStartDate}
                        />
                        <span>{ENDDATE}</span>
                        <DatePicker
                            className="createElectionForm__datePicker"
                            placeholder="Select date"
                            required
                            onChange={handleEndDate}
                        />
                        <Button
                            className="createElectionForm__button"
                            htmlType="submit"
                        >
                            {CREATEELECTION}
                        </Button>
                    </Card>
                </Spin>
            </form>
        </div>
    );
};

export default CreateElection;
