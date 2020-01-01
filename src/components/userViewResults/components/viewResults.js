/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import './viewResults.css';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Spin, Table, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { actions } from '../../viewStats';
import { LOADING_MESSAGE, NO_CANDIDATE } from '../constants';


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text,record) => {
        return  <div className="tableNameCol">
                    <Avatar 
                        src={record.pictureLink} 
                        className="--paddingleft"
                    />
                    <div className="tableNameCol__text">
                        {text}
                    </div>
                </div>
    }
  },
  {
    title: 'Party',
    dataIndex: 'party',
    ellipsis:true,
  },
  {
    title:"Age",
    dataIndex:"age",
  },
  {
    title: 'Vote Count',
    dataIndex: 'voteCount',
  },
];

export default function ViewResults({address}) {
    // get the state variables
    const candidates = useSelector(state => state.candidates);
    const loading = useSelector(state => state.candidatesLoading);
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
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
                :""
            }
            {
                (!loading && candidates.length > 0 )?(
                    <Table 
                        rowKey="id" 
                        columns={columns} 
                        dataSource={sortedCandidate} 
                        expandedRowRender={record => {
                            return <i>{`'${record.quote}'`}</i>
                            }
                        }
                    />
                ):""
            }
        </div>
    );
}

ViewResults.propTypes = {
    address: PropTypes.string.isRequired,
};

IconText.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

