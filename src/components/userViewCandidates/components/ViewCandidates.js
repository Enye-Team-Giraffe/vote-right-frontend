/* eslint-disable max-lines-per-function */
import React from 'react';
import { Card, Button } from 'antd';
import './ViewCandidates.css';
import { AGE_LABEL, VOTE } from '../constants';

/**
 * Display candidates view
 *
 * @component
 * @return {component} - Component that displays candidates
 */
const ViewCandidates = () => (
    <div className="candidateView">
        <div className="candidateList">
            <Card
                className="candidateCard"
                cover={(
                    <img
                        className="candidateCard__image"
                        src="https://i.pravatar.cc"
                        alt="candidate_picture"
                    />
                )}
            >
                <p className="candidateCard__label -bold -fontBig">Abraham Chang Jamal</p>
                <p className="candidateCard__label">{`45 ${AGE_LABEL}`}</p>
                <Button
                    type="primary"
                    className="candidateCard__vote"
                >
                    {VOTE}
                </Button>
            </Card>

        </div>
    </div>
);

export default ViewCandidates;
