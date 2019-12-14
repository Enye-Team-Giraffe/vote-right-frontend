import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import actions from "../actions";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import {OPTIONS} from "../constants"
import "./ViewStats.css";


export default function ViewStats({match}) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.loadVoters(match.params.electionId))
    },[dispatch,match.params.electionId])
    



    return (
        <div className="statisticsLayout" >
            <Card className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={OPTIONS}
                />
            </Card>
        </div>
    )
}
