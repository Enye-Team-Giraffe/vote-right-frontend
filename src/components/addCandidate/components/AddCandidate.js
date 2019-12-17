/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import {
    Card, Input, DatePicker, Button, Upload, Icon, message, Spin
} from 'antd';
import './AddCandidate.css';

import { useDispatch, useSelector } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
    ADD_CANDIDATE, HEADING, NAME, DATE_OF_BIRTH, EDUCATION, PARTY, QUOTE, ROW_HEIGHT,
    BUTTON_TEXT, UPLOAD_IMAGE
} from '../constants';
import actions from '../actions';

/**
 * Form for creating election
 *
 * @component
 * @return {component} - Component for creating election
 */
const AddCandidate = ({ match }) => {
    const [name, updateName] = useState('');
    const [dateOfBirth, updateDateOfBirth] = useState('');
    const [education, updateEducation] = useState('');
    const [party, updateParty] = useState('');
    const [quote, updateQuote] = useState('');
    const [image, updateImage] = useState(null);
    const dispatch = useDispatch();

    /**
     * Get 64Base url for image
     * @function
     * @param {file} - file to be read
     * @param {function} - callback to set image
     * @return {void}
     */
    const getBase64 = (file, setUrl) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setUrl(reader.result);
    };

    /**
     * Checkes whether image is valid for uploading with warning
     * @function
     * @param {file} - file to be uploaded
     * @return {boolean}
     */
    const isValidImage = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg'
            || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const fileSize = file.size / 1024 / 1024 < 1;
        if (!fileSize) {
            message.error('Image must not be larger than 1MB!');
        }
        return isJpgOrPng && fileSize;
    };

    /**
     * Checkes whether image is valid for uploading without
     * displaying warning
     * @function
     * @param {file} - file to be uploaded
     * @return {boolean}
     */
    const isValidImageWithoutWarning = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg'
            || file.type === 'image/png';
        const fileSize = file.size / 1024 / 1024 < 2;
        return isJpgOrPng && fileSize;
    };

    /**
     * Handles change in image
     * @function
     * @param {event} - Event on upload field
     */
    const handleChangeImage = info => {
        if (!isValidImageWithoutWarning(info.file)) {
            return;
        }
        getBase64(info.file.originFileObj, updateImage);
        dispatch(actions.uploadPicture(info.file.originFileObj));
    };

    /**
     * Handles change in input text field
     * @function
     * @param {event} - Event on input field
     */
    const handleChangeText = ({ target }) => {
        switch (target.name) {
        case 'name': {
            updateName(target.value);
            break;
        }
        case 'quote': {
            updateQuote(target.value);
            break;
        }
        case 'education': {
            updateEducation(target.value);
            break;
        }
        case 'party': {
            updateParty(target.value);
            break;
        }
        default: return false;
        }
        return false;
    };

    /**
     * Handles change in date of birth date datepicker
     * @function
     * @param {date} - selected date
     */
    const handleDateOfBirth = date => {
        try{
            const formattedDate = date.format('L');
            updateDateOfBirth(formattedDate);
        }
        catch(err){

        }
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
            dateOfBirth, education, image, name, party, quote,
        };
        // start spinning the loader
        dispatch(actions.loadingaddCandidate(true));
        // add teh candidates synchronously
        dispatch(actions.addCandidate(payload, match.params.electionId));

    };
    const antIcon = <Icon type="loading" className="loader" spin />;
    const addCandidateLoading = useSelector(store => store.addCandidateLoading.candidate);

    useEffect(() => {
    });

    return (
        <div className="addCandidate">
            <form className="addCandidateForm" onSubmit={handleSubmit}>
                <Spin
                    size="large"
                    indicator={antIcon}
                    spinning={addCandidateLoading}
                    className="loader"
                    tip="loading...."
                >
                    <Card className="addCandidateCard">
                        <div className="addCandidateForm__heading">
                            <h1 className="addCandidateForm__heading_header">{ADD_CANDIDATE}</h1>
                            <p className="addCandidateForm__heading_text">
                                {HEADING}
                            </p>
                        </div>
                        <div className="addCandidateForm__image">
                            <Card className="-card">
                                <Upload
                                    name="avatar"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={isValidImage}
                                    onChange={handleChangeImage}
                                >
                                    {
                                        image
                                            ? <img src={image} alt="avatar" />
                                            : (
                                                <Button>
                                                    <Icon type="upload" />
                                                    <span className="ant-upload-text">
                                                        {UPLOAD_IMAGE}
                                                    </span>
                                                </Button>
                                            )
                                    }
                                </Upload>
                            </Card>
                        </div>
                        <div className="addCandidateForm__group">
                            <span>{NAME}</span>
                            <Input
                                className="addCandidateForm__input --input-element"
                                name="name"
                                required
                                onChange={handleChangeText}
                            />
                        </div>
                        <div className="addCandidateForm__group">
                            <span className="-topMargin">{DATE_OF_BIRTH}</span>
                            <DatePicker
                                className="addCandidateForm__datePicker --input-element"
                                placeholder="Select date"
                                required
                                onChange={handleDateOfBirth}
                            />
                        </div>
                        <div className="addCandidateForm__group">
                            <span>{EDUCATION}</span>
                            <Input
                                className="addCandidateForm__input --input-element"
                                name="education"
                                required
                                onChange={handleChangeText}
                            />
                        </div>
                        <div className="addCandidateForm__group">
                            <span>{PARTY}</span>
                            <Input
                                className="addCandidateForm__input --input-element"
                                name="party"
                                required
                                onChange={handleChangeText}
                            />
                        </div>
                        <div className="addCandidateForm__group">
                            <span>{QUOTE}</span>
                            <Input.TextArea
                                rows={ROW_HEIGHT}
                                className="addCandidateForm__textArea --input-element"
                                name="quote"
                                required
                                onChange={handleChangeText}
                            />
                        </div>
                        <Button
                            className="addCandidateForm__button"
                            htmlType="submit"
                        >
                            {BUTTON_TEXT}
                        </Button>
                    </Card>
                </Spin>
            </form>
        </div>
    );
};

export default AddCandidate;
// define the proptypes and their default values

AddCandidate.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
