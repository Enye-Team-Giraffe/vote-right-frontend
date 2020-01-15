/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Candidate.css';
import { Card, Button, Icon } from 'antd';
import './ViewCandidates.css';
import {
    AGE_LABEL, PARTY_LABEL, VOTE, EDU_LABEL
} from '../constants';

/**
 * Displays candidate details
 *
 * @function
 *
 * @param {object} - props
 * @return {component} - Candidate component
 */
const Candidate = ({
    id, pictureUrl, name, age, party, handleVote, quote, education,
    selectCandidateToCompare,
}) => {
    const [disabled, setDisability] = useState(false);
    /**
     * Handles click on vote button
     *
     * @function
     */
    const handleClick = () => {
        handleVote(id);
    };
        /**
     * upon click of the compare button,
     * it disables the button and adds the user to compare
     *
     * @function
     */
    const toggleAndCompare = () => {
        selectCandidateToCompare(setDisability, !disabled);
    };

    return (
        <Card
            key={id}
            className="candidateCard"
            cover={(
                <img
                    className="candidateCard__image"
                    src={pictureUrl}
                    alt="candidate_picture"
                />
            )}
        >
            <div className="candidateCard__section">
                <p className="candidateCard__label --fontBig">{name}</p>
                <Button
                    className={`candidateCard__section__button ${(disabled === true)
                        ? '--selected' : ''}
                    `}
                    shape="round"
                    icon="paper-clip"
                    onClick={toggleAndCompare}
                >
                    Compare
                </Button>
            </div>
            <p className="candidateCard__label">{`${age} ${AGE_LABEL}`}</p>
            <p className="candidateCard__label">{`${PARTY_LABEL} ${party.slice(0, 3)}`}</p>
            <p className="candidateCard__label">{`${EDU_LABEL} ${education.slice(0, 10)}`}</p>
            <p className="candidateCard__label --center"><i>{`'${quote}'`}</i></p>
            <Button
                type="primary"
                className="candidateCard__vote"
                onClick={handleClick}
            >
                <Icon
                    className="electionItem__subitem__icon"
                    type="check"
                    key="check"
                />
                {VOTE}
            </Button>
        </Card>
    );
};
export default Candidate;

Candidate.propTypes = {
    age: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    handleVote: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    selectCandidateToCompare: PropTypes.func.isRequired,
};
