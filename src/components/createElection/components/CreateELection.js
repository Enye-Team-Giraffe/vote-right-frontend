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

    const handleChangeText = ({ target }) => {
        if (target.name === 'name') {
            updateName(target.value);
        } else {
            updateDescription(target.value);
        }
    };

    const handleStartDate = date => {
        const formattedDate = date.format('L');
        updateStartDate(formattedDate);
    };

    const handleEndDate = date => {
        const formattedDate = date.format('L');
        updateEndDate(formattedDate);
    };

    const handleSubmit = event => {
        event.preventDefault();
        let payload = {
            description, endDate, name, startDate,
        };
        console.log(payload)
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
