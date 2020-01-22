import mapDataIE from '@highcharts/map-collection/countries/ng/ng-all.geo.json';
import Facebook from '../../static/icons/facebook.svg';
import Instagram from '../../static/icons/instagram.svg';
import Twitter from '../../static/icons/twitter.svg';

export const LOADING_MESSAGE = 'Loading...';
export const NO_CANDIDATE = 'There are no candidates for this election';
export const TOLERANCE = 0.0001;
export const WINNER = 'Winner';
export const URL = 'https://voteright-e8208.firebaseapp.com/result/';
export const FACEBOOK_SHARER_URL = 'https://www.facebook.com/sharer/sharer.php';
export const TWITTER_SHARE_URL = 'https://twitter.com/share';

export const FACEBOOK = {
    alt: 'facebook',
    src: Facebook,
};
export const INSTAGRAM = {
    alt: 'instagram',
    src: Instagram,
};
export const TWITTER = {
    alt: 'twitter',
    src: Twitter,
};
export const MAP_OPTIONS = {
    chart: {
        map: 'countries/ie/ie-all',
    },
    credits: {
        enabled: false,
    },
    mapNavigation: {
        enabled: true,
    },
    series: [{
        // Use the gb-all map with no data as a basemap
        borderColor: '#A0A0A0',
        mapData: mapDataIE,
        name: 'Basemap',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false,
    }, {
        // Specify points using lat/lon
        color: '#4169E1',
        cursor: 'pointer',
        data: [{
            keyword: 'ikeja', lat: 8.678779, lon: 7.526700, z: 10,
        },
        {
            keyword: 'Lagos', lat: 6.588217, lon: 5.418247, z: 4,
        }],
        name: 'Cities',
        point: {
            events: {
                click() {

                },
            },
        },
        type: 'mapbubble',
    }],
    title: {
        text: 'Map of Nigeria and Votes',
    },
    tooltip: {
        headerFormat: '',
        pointFormat: 'Party:<b>{point.keyword}</b>',
    },
};
export const AGE_OPTIONS = {
    chart: {
        type: 'column',
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2],
        name: 'Age of voter',
    }],
    subtitle: {
        text: 'The Distribution of the age of people who voted',
    },
    title: {
        text: 'Age distribution of voters.',
    },
    xAxis: {
        categories: ['Female', 'Male'],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Age',
        },
    },
};
export const BAR_OPTIONS = {
    chart: {
        type: 'column',
    },
    series: [{
        data: [107, 150],
        name: 'gender',
    }],
    subtitle: {
        text: 'A bar chart of all the votes by gender',
    },
    title: {
        text: 'Male vs Female participation',
    },
    xAxis: {
        categories: ['Female', 'Male'],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes',
        },
    },
};
export const AGE_BRACKETS = ['18-25', '26-40', '41-60', '60+'];
export const AGE = 'AGE';
export const GENDERS = ['Male', 'Female'];
export const NAME = 'VOTES';
export const USER_VIEW_RESULTS = 'USER_VIEW_RESULTS';

