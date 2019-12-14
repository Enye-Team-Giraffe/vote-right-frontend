import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions"
import { BASE_URL, LOADING_MESSAGE } from "../constants"
import "./ViewElection.css"
import { Card, Icon , Spin} from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

export default function ViewElection() {

    const dispatch = useDispatch();
    const elections = useSelector(state=>state.elections);
    const loadingElections = useSelector(state=>state.electionListLoading);
    
    const antIcon = <Icon type="loading" className="loader" spin />;
    // upon render of the page get all the elections
    useEffect(()=>{
        dispatch(actions.loadElections())
    },[dispatch])

    
    return (
        <Spin
            size="large"
            indicator={antIcon}
            spinning={loadingElections}
            className="loader"
            tip={LOADING_MESSAGE}
        >
            <div className="viewElection">
                {
                    elections.map(election=>(
                        <div className="electionItem" key={election['location']}>
                            <Card
                                actions={[
                                <div className='electionItem__subitem'>
                                    <Icon type="calendar" key="calendar" />
                                    <span className="electionItem__subitem__text">
                                        {new Date(Number(election['startdate'])*1000).toDateString().slice(0,15)}
                                    </span>
                                </div>,
                                <div className='electionItem__subitem'>
                                    <Icon type="calendar" key="calendar"/>
                                    <span className="electionItem__subitem__text">
                                        {new Date(Number(election['enddate'])*1000).toDateString().slice(0,15)}
                                    </span>
                                </div>,
                                <div className='electionItem__subitem'>
                                    <NavLink to="/real_time"><Icon type="link" key="link" /> View Real Time Stats </NavLink>
                                </div>,
                                ]}
                            >
                            <Meta
                                title={election['name']}
                                description={election['description']}
                            />
                            </Card>
                        </div> 
                    ))

                }

            </div>
        </Spin>
    )
}
