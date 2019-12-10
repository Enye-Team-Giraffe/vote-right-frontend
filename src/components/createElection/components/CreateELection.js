/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import {
    Card, Input, DatePicker, Button
} from 'antd';
import './CreateElection.css';

/**
 * Form for creating election
 *
 * @component
 * @return {component} - Component for creating election
 */
const CreateElection = () => {
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
    };

    return (
        <div className="createElection">
            <form className="createElectionForm" onSubmit={handleSubmit}>
                <Card className="createElectionCard">
                    <h1 className="createElectionForm__heading">Create Election</h1>
                    <span>Name</span>
                    <Input
                        className="createElectionForm__input"
                        name="name"
                        required
                        onChange={handleChangeText}
                    />
                    <span>Description</span>
                    <Input.TextArea
                        className="createElectionForm__textArea"
                        name="description"
                        required
                        onChange={handleChangeText}
                    />
                    <span className="-topMargin">Start date</span>
                    <DatePicker
                        className="createElectionForm__datePicker"
                        placeholder="Select date"
                        required
                        onChange={handleStartDate}
                    />
                    <span>End date</span>
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
                        Create
                    </Button>
                </Card>
            </form>
        </div>
    );
};

export default CreateElection;
