import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import actions from "../actions";


export default function ViewStats({match}) {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actions.loadVoters(match.params.electionId))
    })
    return (
        <div>
            hello world {match.params.electionId}
        </div>
    )
}
