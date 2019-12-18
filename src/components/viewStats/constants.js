import mapDataIE from '@highcharts/map-collection/countries/ng/ng-all.geo.json';

export const WAIT_TIME = 2.0;
export const LARGE_GAS = 3000000;
export const LOADING_MESSAGE = "Loading...";
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
export const PIE_OPTIONS = {
    chart: {
        type: 'pie',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
        },
    },
    series: [{
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            sliced: true,
            y: 61.41,
        }, {
            name: 'Internet Explorer',
            y: 11.84,
        },
        ],
        name: 'Candidates',
    }],
    subtitle: {
        text: 'The ccandidates and the number of votes they currently have',
    },
    title: {
        text: 'Candidates and number of votes',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
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
export const GENDER_GROUP = {
    chart: {
        type: 'column',
    },
    series: [{
        data: [0, 0],
        name: 'Male',

    }, {
        data: [0, 0],
        name: 'Female',

    }],
    subtitle: {
        text: 'The count of the choice of each gender',
    },
    title: {
        text: 'Choice of Genders',
    },
    tooltip: {
        footerFormat: '</table>',
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
            + '<td style="padding:0"><b>{point.y:.1f} votes</b></td></tr>',
        shared: true,
        useHTML: true,
    },
    xAxis: {
        categories: ['Names of candidates1', 'Name of candidate2'],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes',
        },
    },
};
export const AGE_GROUP = {
    chart: {
        type: 'column',
    },
    plotOptions: {
        column: {
            borderWidth: 0,
            pointPadding: 0.2,
        },
    },
    series: [{
        data: [49.9, 71.5],
        name: '18-25',

    }, {
        data: [83.6, 78.8],
        name: '26-40',

    }, {
        data: [48.9, 38.8],
        name: '41-60',

    }, {
        data: [42.4, 33.2],
        name: '61+',

    }],
    subtitle: {
        text: 'The age group responsible for the votes of each candidate',
    },
    title: {
        text: 'Age group choice',
    },
    tooltip: {
        footerFormat: '</table>',
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
            + '<td style="padding:0"><b>{point.y:.1f} votes</b></td></tr>',
        shared: true,
        useHTML: true,
    },
    xAxis: {
        categories: [
            'Name of candidate 1',
            'Name of candidate 2',
        ],
        crosshair: true,
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes',
        },
    },

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
            keyword: 'Lagos', lat: 8.678779, lon: 7.526700, z: 10,
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
        pointFormat: `<b>{point.freq}</b><br><b>{point.keyword}</b>                      
        <br>lat: {point.lat}, lon: {point.lon}`,
    },
};

export const NAME = 'VOTES';
export const AGE = 'AGE';
export const GENDERS = ['male', 'female'];
export const AGE_BRACKETS = ['18-25', '26-40', '41-60', '60+'];

