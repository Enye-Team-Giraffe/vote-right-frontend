/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card, Typography, Icon, Spin, Button, Alert
} from 'antd';
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';
import './ViewSharedResult.css';
import { VOTERIGHT, LOADING_MESSAGE, NOT_FOUND } from '../constants';
import { components as ViewResults } from '../../userViewResults';
import { actions as viewElectionactions } from '../../viewElection';
import PdfDocument from '../../userConcludedElection/components/PdfDocument';

const { Title } = Typography;

const Download = ({name, candidates }) => (
    <PDFDownloadLink
        document={
            (
                <PdfDocument
                    name={name}
                    candidates={candidates}
                />
            )
        }
        fileName="result.pdf"
    >
        {({
            blob, url, loading, error,
        }) => (
            <Button>
                <Icon type="download"/>
                Download result
            </Button>
        )}
    </PDFDownloadLink>
);

const ViewSharedResult = ({ match }) => {
    const dispatch = useDispatch();
    /**
     * Finds a particular election by id
     *
     * function
     * @param {array} elections - list of elections
     * @param {string} address - address of election to find
     * @return {object} election - election found by address
     */
    const findElectionByAddress = (elections, address) => {
        const foundElection = elections.find(election => election.location === address);
        return foundElection || {};
    };

    const isElectionValid = (elections, address) => {
        const foundElection = elections.find(election => election.location === address);
        if (foundElection) {
            return true;
        }
        return false;
    };

    const loadingElections = useSelector(state => state.electionListLoading);
    const elections = useSelector(state => state.elections);
    const election = findElectionByAddress(elections, match.params.electionId);
    const isElectionFound = isElectionValid(elections, match.params.electionId);
    const candidates = useSelector(state => state.candidates);
    const sortedCandidates = candidates.sort((a, b) => b.voteCount - a.voteCount);

    useEffect(() => {
        dispatch(viewElectionactions.loadElections());
    }, [dispatch, match.params.electionId]);

    const spinIcon = <Icon type="loading" className="loader" spin />;

    return (
        <div className="viewSharedResult">
            <div className="heading -fullWidth -static">
                <Link to="/">
                    <Title level={1}>
                        <span className="headingText">{ VOTERIGHT }</span>
                    </Title>
                </Link>
            </div>
            <div>
                <Spin
                    size="large"
                    indicator={spinIcon}
                    spinning={loadingElections}
                    className="loader"
                    tip={LOADING_MESSAGE}
                >
                    {isElectionFound
                        ? (
                            <Card className="viewSharedResult__table">
                                <Title
                                    level={2}
                                    className="viewSharedResult__electionName"
                                >
                                    {election.name}
                                </Title>
                                {election.name
                                    ? (
                                        <div>
                                            {!loadingElections ?
                                                (
                                                    <Download
                                                        name={election.name}
                                                        candidates={sortedCandidates}
                                                    />
                                                ) : ''
                                            }
                                            <ViewResults address={match.params.electionId} />
                                        </div>
                                    )
                                    : ''}
                            </Card>
                        )
                        : (!isElectionFound && !loadingElections)
                            ? (
                                <div className="notFound">
                                    <Alert
                                        message={NOT_FOUND}
                                        type="info"
                                        showIcon
                                    />
                                </div>
                            ) : ''}
                </Spin>
            </div>

        </div>
    );
};

export default ViewSharedResult;

ViewSharedResult.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};
