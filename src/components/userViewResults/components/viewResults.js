/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import './viewResults.css';
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import mapDataIE from '@highcharts/map-collection/countries/ng/ng-all.geo.json';
import proj4 from 'proj4';
import {
    Icon, Spin, Table, Avatar, Tag, Collapse, Card
} from 'antd';
import PropTypes from 'prop-types';
import { actions } from '../../viewStats';
import {
    LOADING_MESSAGE, NO_CANDIDATE, WINNER, URL, FACEBOOK, GENDERS,
    TWITTER, FACEBOOK_SHARER_URL, TWITTER_SHARE_URL, BAR_OPTIONS,
    MAP_OPTIONS, AGE_OPTIONS, AGE_BRACKETS, AGE, NAME, USER_VIEW_RESULTS
} from '../constants';
import { analytics } from '../../configuredFirebase';

const randomColorGenerator = require('randomcolor');

highchartsMap(Highcharts);
// reducer function used to get the count of males and females from the data
const countGender = (oldCount, person) => {
    const newCount = oldCount;
    newCount[0] += (person.gender === GENDERS[1]);
    newCount[1] += (person.gender === GENDERS[0]);
    return newCount;
};
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

// reducer function used to group the candidiates by age
const countAge = (oldCount, person) => {
    const newCount = oldCount;
    newCount[AGE_BRACKETS[0]] += (person.age >= 18 && person.age < 26);
    newCount[AGE_BRACKETS[1]] += (person.age >= 26 && person.age < 40);
    newCount[AGE_BRACKETS[2]] += (person.age >= 40 && person.age < 60);
    newCount[AGE_BRACKETS[3]] += (person.age > 60);
    return newCount;
};
const { Panel } = Collapse;
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
    const voters = useSelector(state => state.voters);
    // dispatch the loadCandidates saga
    // which has been defined in the viewstats component
    const dispatch = useDispatch();
    // sort the candidates by votecount
    const sortedCandidate = candidates.sort((a, b) => b.voteCount - a.voteCount);
    useEffect(() => {
        // clear the voters and candidates initial state
        dispatch(actions.pushCandidates([]));
        dispatch(actions.pushVoters([]));
        // start the spinners
        dispatch(actions.loadingCandidates(true));
        dispatch(actions.loadingVoters(true));
        // load the voters and candidates
        dispatch(actions.loadCandidates(address));
        dispatch(actions.loadVoters(address));
        // initialise proj4
        if (typeof window !== 'undefined') {
            window.proj4 = window.proj4 || proj4;
        }
        analytics.logEvent(USER_VIEW_RESULTS);
    }, [dispatch, address]);
    // item for customising the spinner
    const antIcon = <Icon type="loading" className="loader" spin />;
    // manipulation of data to be used for age distribution of voters
    // get the number of each age group vote
    const voterAgeDist = voters.reduce(countAge, {
        '18-25': 0, '26-40': 0, '41-60': 0, '60+': 0,
    });
        // get the number of each gender vote
    const genderCount = voters.reduce(countGender, [0, 0]);
    // manipulation of data required to be used for the map
    // get the candidates id for the maps, and assign each candidate a color
    const candidatesIds = candidates.map(candidate => candidate.id);
    function mapCandidateToColor(candidateIds) {
        const colorMap = {};
        candidateIds.forEach(candidateId => {
            colorMap[candidateId] = randomColorGenerator({ seed: candidateId });
        });
        return colorMap;
    }
    function mapCandidateIdToParty(paramCandidates) {
        const idToPartyMap = {};
        paramCandidates.forEach(candidate => {
            idToPartyMap[candidate.id] = candidate.party;
        });
        return idToPartyMap;
    }
    const candidatesColor = mapCandidateToColor(candidatesIds);
    const candidatesPartyToId = mapCandidateIdToParty(candidates);
    const voterLocationMap = voters.map(voter => {
        const voterLatLong = voter.latlong.split('|');
        return {
            color: candidatesColor[voter.votedCandidate],
            keyword: candidatesPartyToId[voter.votedCandidate],
            lat: Number(voterLatLong[0]),
            lon: Number(voterLatLong[1]),
            z: 4,
        };
    });
    // redefine new instances from the chart options, to include data from our state
    const newMapOptions = {
        ...MAP_OPTIONS,
        series: [{
            // Use the gb-all map with no data as a basemap
            borderColor: '#A0A0A0',
            mapData: mapDataIE,
            name: 'Basemap',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false,
        }, {
            // Specify points using lat/lon
            cursor: 'pointer',
            data: voterLocationMap,
            name: 'Location of voters and candidates of choice',
            type: 'mapbubble',
        }],
    };
    // define a new instance for another new chart
    const newAgeOptions = {
        ...AGE_OPTIONS,
        series: [{
            data: Object.values(voterAgeDist),
            name: AGE,
        }],
        xAxis: {
            categories: Object.keys(voterAgeDist),
        },

    };
    // define a new instance for the bar chart
    const newBarOptions = {
        ...BAR_OPTIONS,
        series: [{
            data: genderCount,
            name: NAME,
        }],
    };
    // define an array to be used for mapping
    const chartOptions = [
        { options: newBarOptions, size: '--large' },
        { options: newAgeOptions, size: ' --large' },
    ];
    const hideUntilLoaded = () => ((loading) ? '--hidden' : '');

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
                        <div className="viewResults__share">
                            <a
                                href={`${FACEBOOK_SHARER_URL}?u=${URL}/${address}&quote=${name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="viewResults__shareLink"
                            >
                                <img
                                    className="--small --greyscale"
                                    src={FACEBOOK.src}
                                    alt={FACEBOOK.alt}
                                />
                            </a>
                            <a
                                href={`${TWITTER_SHARE_URL}?text=${name}&url=${URL}/${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="viewResults__shareLink"
                            >
                                <img
                                    className="--small --greyscale"
                                    src={TWITTER.src}
                                    alt={TWITTER.alt}
                                />
                            </a>
                        </div>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={sortedCandidate}
                            expandedRowRender={record => <i>{`'${record.quote}'`}</i>}
                        />
                        <Collapse>
                            <Panel header="Show statistics" key="1">
                                <Card
                                    className={`chart --large ${hideUntilLoaded()}`}
                                    key={Math.random()}
                                >
                                    <HighchartsReact
                                        constructorType="mapChart"
                                        highcharts={Highcharts}
                                        options={newMapOptions}
                                    />
                                </Card>
                                {
                                    chartOptions.map(option => (
                                        <Card
                                            className={`chart ${hideUntilLoaded()} ${option.size}`}
                                            key={Math.random()}
                                        >
                                            <HighchartsReact
                                                highcharts={Highcharts}
                                                options={option.options}
                                            />
                                        </Card>
                                    ))
                                }
                            </Panel>
                        </Collapse>
                        ,
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

