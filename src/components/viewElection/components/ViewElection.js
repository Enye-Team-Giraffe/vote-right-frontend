import React from 'react'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "../actions"
// import { BASE_URL } from "../constants"
import "./ViewElection.css"
import { Card, Icon } from 'antd';
const { Meta } = Card;

export default function ViewElection() {

    const dispatch=useDispatch();
    // upon render of the page get all the elections
    useEffect(()=>{
        dispatch(actions.loadElections())
    },[dispatch])


    return (
        <div className="viewElection">
            <div className="electionItem">
                <Card
                    actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="edit" key="edit" />,
                    <Icon type="ellipsis" key="ellipsis" />,
                    ]}
                >
                    <Meta
                        title="Presidential"
                        description="This is the Presidential election"
                    />
                </Card>
            </div>
        </div>
    )
}
