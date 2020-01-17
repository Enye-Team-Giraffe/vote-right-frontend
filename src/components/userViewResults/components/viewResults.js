/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import './viewResults.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Icon, Spin, Table, Avatar, Tag
} from 'antd';
import PropTypes from 'prop-types';
import { actions } from '../../viewStats';
import {
    LOADING_MESSAGE, NO_CANDIDATE, WINNER, URL, FACEBOOK, TWITTER,
} from '../constants';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const columns = [
    {
        dataIndex: 'name',
        render(text, record, index) {
            return (
                <div className="tableNameCol">
                    <Avatar
                        src={record.pictureLink}
                        className="--paddingleft"
                    />
                    <div className="tableNameCol__text">
                        {text}
                    </div>
                    {
                        (index === 0) ? (
                            <Tag
                                color="geekblue"
                                className="--paddingleft"
                            >
                                {WINNER}
                            </Tag>
                        ) : ''
                    }
                </div>
            );
        },
        title: 'Name',
    },
    {
        dataIndex: 'party',
        ellipsis: true,
        title: 'Party',
    },
    {
        dataIndex: 'age',
        title: 'Age',
    },
    {
        dataIndex: 'voteCount',
        title: 'Vote Count',
    },
];

export default function ViewResults({ address, name }) {
    // get the state variables
    const candidates = useSelector(state => state.candidates);
    const loading = useSelector(state => state.candidatesLoading);
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    // sort the candidates by votecount
    const sortedCandidate = candidates.sort((a, b) => b.voteCount - a.voteCount);
    useEffect(() => {
        dispatch(actions.pushCandidates([]));
        dispatch(actions.loadingCandidates(true));
        dispatch(actions.loadCandidates(address));
    }, [dispatch, address]);
    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    return (
        <div className="viewCandidates --noPadding">
            <Spin
                size="large"
                indicator={antIcon}
                spinning={loading}
                className="loader"
                tip={LOADING_MESSAGE}
            />
            {
                // if there is no candidateloading  then show that there is none.
                (candidates.length === 0 && !loading) ? (
                    <div className="no_candidate">
                        {NO_CANDIDATE}
                    </div>
                )
                    : ''
            }
            {
                // if there is at least one candidate and we are done loading
                // then show the table
                (!loading && candidates.length > 0) ? (
                    <div>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${URL}/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="--small --greyscale"
                                src={FACEBOOK.src}
                                alt={FACEBOOK.alt}
                            />
                        </a>
                        <a
                            href={`https://twitter.com/share?text=${name}&url=${URL}/${address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="--small --greyscale"
                                src={TWITTER.src}
                                alt={TWITTER.alt}
                            />
                        </a>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={sortedCandidate}
                            expandedRowRender={record => <i>{`'${record.quote}'`}</i>}
                        />
                    </div>
                ) : ''
            }
        </div>
    );
}

ViewResults.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

IconText.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

