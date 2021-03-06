/* eslint-disable max-lines-per-function */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Icon, Spin, Form, Card, Input, Button, Select, DatePicker
} from 'antd';
import './CreateElection.css';
import actions from '../actions';
import {
    NAME, DESCRIPTION, STARTDATE, ENDDATE, CREATEELECTION, ELECTION_TYPE,
    ROW_HEIGHT, BUTTON_TEXT, ELECTION_TYPE_OPTIONS, ELECTION_WARNING,
    ADMIN_VIEW_CREATE_ELECTION
} from '../constants';
import Particles from '../../particleBackground';
import { analytics } from '../../configuredFirebase';

/**
 * Form for creating election
 *
 * @component
 * @return {component} - Component for creating election
 */
const CreateElection = ({ form }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    function a(n) {
        if (n <= 9) {
            return `0${n}`;
        }
        return n;
    }
    // function to convert a datetime string into a timestamp
    const toTimestamp = dateString => (Date.parse(dateString) / 1000);
    // function to get today's date in year-month-day
    const toyymmddFormatStart = () => {
        const today = new Date();
        const d = new Date(today);
        d.setDate(d.getDate() + 1);
        const formattedDate = `${d.getFullYear()}-${a(d.getMonth() + 1)}-${a(d.getDate())}`;
        return formattedDate;
    };
    // function to get today's date in year-month-day
    const toyymmddFormatEnd = () => {
        const today = new Date();
        const d = new Date(today);
        d.setDate(d.getDate() + 2);
        const formattedDate = `${d.getFullYear()}-${a(d.getMonth() + 1)}-${a(d.getDate())}`;
        return formattedDate;
    };
    /**
     * Handles submission of form data
     * @function
     * @param {event} - event triggered by button click
     */
    const handleSubmit = event => {
        event.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const payload = {
                    description: values.description,
                    electionType: values.electionType,
                    endDate: toTimestamp(values.endDate),
                    history,
                    name: values.name,
                    startDate: toTimestamp(values.startDate),
                };
                dispatch(actions.loadingCreateUser(true));
                dispatch(actions.createElection(payload));
            }
        });
    };

    const createElectionLoading = useSelector(store => store.createElectionLoading);
    const antIcon = <Icon type="loading" className="loader" spin />;

    const { getFieldDecorator } = form;
    analytics.logEvent(ADMIN_VIEW_CREATE_ELECTION);

    return (
        <div className="createElection">
            <Particles />
            <Form className="createElectionForm" onSubmit={handleSubmit}>
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={createElectionLoading}
                    className="loader"
                    tip="loading...."
                >
                    <Card className="createElectionFormCard">
                        <div className="createElectionForm__heading">
                            <h1 className="createElectionForm__heading_header">{CREATEELECTION}</h1>
                            <p className="createElectionForm__heading_text">
                                {ELECTION_WARNING}
                            </p>
                        </div>
                        <Form.Item label={NAME}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        message: 'This field can not be empty!',
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label={ELECTION_TYPE}>
                            {getFieldDecorator('electionType', {
                                rules: [
                                    {
                                        message: 'This field can not be empty!',
                                        required: true,
                                    },
                                ],
                            })(
                                <Select
                                    placeholder="Select election type"
                                >
                                    {
                                        ELECTION_TYPE_OPTIONS.map(type => (
                                            <Select.Option
                                                key={type.key}
                                                value={type.value}
                                            >
                                                {type.text}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label={DESCRIPTION}>
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        message: 'This field can not be empty!',
                                        required: true,
                                    },
                                ],
                            })(<Input.TextArea rows={ROW_HEIGHT} />)}
                        </Form.Item>

                        <Form.Item label={STARTDATE}>
                            {getFieldDecorator('startDate', {
                                rules: [
                                    {
                                        message: 'This field can not be empty!',
                                        required: true,
                                    },
                                ],
                            })(<DatePicker
                                className="-fullWidth"
                                disabledDate={d => !d || d.isBefore(toyymmddFormatStart())}
                            />)}
                        </Form.Item>

                        <Form.Item label={ENDDATE}>
                            {getFieldDecorator('endDate', {
                                rules: [
                                    {
                                        message: 'This field can not be empty!',
                                        required: true,
                                    },
                                ],
                            })(<DatePicker
                                className="-fullWidth"
                                disabledDate={d => !d || d.isBefore(toyymmddFormatEnd())}
                            />)}
                        </Form.Item>

                        <div className="createElection__submit-button">
                            <Form.Item>
                                <Button className="createElectionForm__button" htmlType="submit">
                                    {BUTTON_TEXT}
                                </Button>
                            </Form.Item>
                        </div>
                    </Card>
                </Spin>
            </Form>
        </div>
    );
};

const WrappedCreateElection = Form.create({ name: 'register' })(CreateElection);
export default WrappedCreateElection;

CreateElection.propTypes = {
    form: PropTypes.object.isRequired,
};

