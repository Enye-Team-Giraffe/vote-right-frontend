export const WAIT_TIME = 2.0;
export const LARGE_GAS = 3000000;
export const BAR_OPTIONS = {
    chart: {
        type: 'column',
    },
    subtitle: {
        text: 'A bar chart of all the votes by gender'
    },
    series: [{
        data: [107, 150],
        name: 'gender',
    }],
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
    subtitle: {
        text: 'The ccandidates and the number of votes they currently have'
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
    title: {
        text: 'Candidates and number of votes',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
    },
};

export const AGE_OPTIONS ={
    chart: {
        type: 'column',
    },
    subtitle: {
        text: 'The Distribution of the age of people who voted'
    },
    title: {
        text: 'Age distribution of voters.'
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
    series: [{
        name:"Age of voter",
        data: [29.9, 71.5, 106.4, 129.2]
    }]
}
export const AGE_GROUP={
    chart: {
        type: 'column'
    },
    title: {
        text: 'Choice of Genders'
    },
    subtitle: {
        text: 'The count of the choice of each gender'
    },
    xAxis: {
        categories: ["Names of candidates1","Name of candidate2"],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} votes</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    series: [{
        name: 'Male',
        data: [0, 0]

    }, {
        name: 'Female',
        data: [0, 0]

    }]
}
export const NAME = "VOTES"
export const AGE = "AGE"
