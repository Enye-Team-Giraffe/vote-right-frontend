import React,{useEffect} from 'react';
import "./ViewCandidates.css";
import {actions} from "../../viewStats";

import { useDispatch,useSelector } from "react-redux";
import { Card, Icon } from 'antd';
const { Meta } = Card;

export default function ViewCandidates({match}) {
    // dispatch the loadCandidates saga 
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actions.loadCandidates(match.params.electionId))
    },[dispatch,match.params.electionId])

    const candidates = useSelector(state=>state.candidates)
    return (
        <div className="viewCandidates">
            {
                candidates.map(candidate=>(
                    <Card
                        key={candidate.id}
                        className="viewCandidates__card"
                        cover={
                        <img
                            alt="example"
                            src="https://i.pravatar.cc/500"
                        />
                        }
                        actions={[
                        <Icon type="setting" key="setting" />,
                        <Icon type="edit" key="edit" />,
                        <Icon type="ellipsis" key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            className="viewCandidates__card__meta --name"
                            title={candidate.name}
                        />
                        <Meta
                            className="viewCandidates__card__meta --party"
                            title={`${candidate.age} years of age`}
                        />
                        <Meta
                            className="viewCandidates__card__meta --party"
                            title={`Member of ${candidate.party}`}
                        />
                        <Meta
                            className="viewCandidates__card__meta --education"
                            title={`Last studied at ${candidate.education}`}
                        />
                        <Meta
                            className="viewCandidates__card__meta --quote"
                            description={`'${candidate.quote}'`}
                        />
                    </Card>
                ))
            }
        </div>
    )
}
