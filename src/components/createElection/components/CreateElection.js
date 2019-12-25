/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Card, Input, DatePicker, Button, Spin, Icon, Select
} from 'antd';
import './CreateElection.css';
import actions from '../actions';
import {
    NAME, DESCRIPTION, STARTDATE, ENDDATE, CREATEELECTION,
    ROW_HEIGHT, BUTTON_TEXT, ELECTION_NAME_OPTIONS, ELECTION_WARNING
} from '../constants';

/**
 * Form for creating election
 *
 * @component
 * @return {component} - Component for creating election
 */
const CreateElection = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, updateName] = useState('');
    const [description, updateDescription] = useState('');
    const [startDate, updateStartDate] = useState('');
    const [endDate, updateEndDate] = useState('');

    /**
     * Handles change in select field
     * @function
     * @param {value} - value of selected option
     */
    const handleChangeSelect = value => {
        updateName(value);
    };

    /**
     * Handles change in input text field
     * @function
     * @param {event} - Event on input field
     */
    const handleChangeText = ({ target }) => {
        updateDescription(target.value);
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

    // function to convert a datetime string into a timestamp
    const toTimestamp = dateString => (Date.parse(dateString) / 1000);

    /**
     * Handles submission of form data
     * @function
     * @param {event} - event triggered by button click
     */
    const handleSubmit = event => {
        event.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const payload = {
            description,
            endDate: toTimestamp(endDate),
            history,
            name,
            startDate: toTimestamp(startDate),
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
                    tip="loading...."
                >
                        <div className="createElectionForm__heading">
                            <h1 className="createElectionForm__heading_header">{CREATEELECTION}</h1>
                            <p className="createElectionForm__heading_text">
                                {ELECTION_WARNING}
                            </p>
                        </div>
                    <Card className="create-election-card">

                        <div className="create-election-card__section">

                            <div className="create-election-card__section__content">
                                <div className="create-election-card__section__content__text">
                                    <Icon className="--blue" theme="filled" type="right-circle" /> 
                                    <span>{NAME}</span>
                                </div>
                                <div className="create-election-card__section__content__formelement">
                                    <Select
                                        placeholder="Select election"
                                        onChange={handleChangeSelect}
                                    >
                                        {ELECTION_NAME_OPTIONS.map(option => (
                                            <Select.Option
                                                key={option.key}
                                                value={option.value}
                                            >
                                                {option.text}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>

                            </div>

                        </div>
                        
                        <hr/>

                        <div className="create-election-card__section">

                            <div className="create-election-card__section__content">

                                <div className="create-election-card__section__content__text">
                                    <Icon className="--blue" type="right-circle" /> 
                                    <span>{DESCRIPTION}</span>
                                </div> 
                                <div className="create-election-card__section__content__formelement">
                                    <Input.TextArea
                                        placeholder="Detailed description of this election"
                                        rows={ROW_HEIGHT}
                                        className="createElectionForm__textArea --input-element"
                                        name="description"
                                        required
                                        onChange={handleChangeText}
                                    />      
                                </div>                    
                            </div>

                        </div>

                        <hr/>

                        <div className="create-election-card__section">
                            <div className="create-election-card__section__content">
                                <div className="create-election-card__section__content__text">
                                    <Icon className="--blue" theme="filled" type="calendar"  /> 
                                    <span>{STARTDATE}</span>
                                </div> 
                                <div className="create-election-card__section__content__formelement">
                                    <DatePicker
                                        className="createElectionForm__datePicker --input-element"
                                        placeholder="Select date"
                                        required
                                        onChange={handleStartDate}
                                    />     
                                </div>                    
                            </div>
                        </div>
                        
                        <hr/>

                        <div className="create-election-card__section">
                            <div className="create-election-card__section__content">
                                <div className="create-election-card__section__content__text">
                                    <Icon className="--blue"  type="calendar" /> 
                                    <span>{ENDDATE}</span>
                                </div> 
                                <div className="create-election-card__section__content__formelement">
                                    <DatePicker
                                        className="createElectionForm__datePicker --input-element"
                                        placeholder="Select date"
                                        required
                                        onChange={handleEndDate}
                                    />     
                                </div>                    
                            </div>
                        </div>
                    </Card>
                    <div className="createElection__submit-button">
                            <Button
                                className="createElectionForm__button"
                                htmlType="submit"
                            >
                                {BUTTON_TEXT}
                            </Button>
                    </div>
                   
                </Spin>
            </form>
        </div>
    );
};

export default CreateElection;
