/* eslint-disable max-lines-per-function */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon } from 'antd';
import './CompareCandidate.css';

export default function CompareCandidate({ candidateList }) {
    const candidates = useSelector(state => state.candidates);
    const candidateListAsArray = Array.from(candidateList);
    return (
        (candidateListAsArray.length === 2)
            ? (
                <div className="candidateComparison">
                    <div className="candidateComparison__compareItem">
                        <Icon className="candidateComparison__compareItem__icon" type="user" />
                        <div className="candidateComparison__compareItem__text">
                            {` ${candidates[candidateListAsArray[0]].name} `}
                            is
                            <span className="--bold">
                                {` ${candidates[candidateListAsArray[0]].age} `}
                            </span>
                            years old while
                            {` ${candidates[candidateListAsArray[1]].name} `}
                            is
                            <span className="--bold">
                                {` ${candidates[candidateListAsArray[1]].age} `}
                            </span>
                            years old
                        </div>
                    </div>
                    <div className="candidateComparison__compareItem">
                        <Icon
                            className="candidateComparison__compareItem__icon"
                            type="book"
                        />
                        <div className="candidateComparison__compareItem__text">
                            {` ${candidates[candidateListAsArray[0]].name} `}
                            last studied at
                            <span className="--bold">
                                {` ${candidates[candidateListAsArray[0]].education} `}
                            </span>
                            While
                            {` ${candidates[candidateListAsArray[1]].name} `}
                            last studied at
                            <span className="--bold">
                                {` ${candidates[candidateListAsArray[0]].education} `}
                            </span>
                            years old
                        </div>
                    </div>
                    <div className="candidateComparison__compareItem">
                        <Icon
                            className="candidateComparison__compareItem__icon"
                            type="notification"
                        />
                        <div className="candidateComparison__compareItem__text">
                            Alex says
                            <span className="--bold"> Lorem ipsum dolor sit amet. </span>
                        </div>
                    </div>
                    <div className="candidateComparison__compareItem">
                        <Icon
                            className="candidateComparison__compareItem__icon"
                            type="notification"
                        />
                        <div className="candidateComparison__compareItem__text">
                            Joshua says
                            <span className="--bold"> Lorem ipsum dolor sit amet. </span>
                        </div>
                    </div>

                </div>
            )
            : ''
    );
}

CompareCandidate.propTypes = {
    candidateList: PropTypes.instanceOf(Set).isRequired,
};

