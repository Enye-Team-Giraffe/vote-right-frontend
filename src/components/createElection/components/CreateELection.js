/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import {
    Card, Input, DatePicker, Button
} from 'antd';

import './CreateElection.css';

const CreateElection = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    return(
        <div className="createElection">
            <form className="createElectionForm" onSubmit={handleSubmit}>
                <Card className="createElectionCard">
                    <h1 className="createElectionForm__heading">Create Election</h1>
                    <span>Name</span>
                    <Input className="createElectionForm__input" />
                    <span>Description</span>
                    <Input.TextArea className="createElectionForm__textArea" />
                    <span className="-topMargin">Start date</span>
                    <DatePicker
                        className="createElectionForm__datePicker"
                        showTime
                        placeholder="Select time"
                    />
                    <span>End date</span>
                    <DatePicker
                        className="createElectionForm__datePicker"
                        showTime
                        placeholder="Select time"
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
    )
};

export default CreateElection;
