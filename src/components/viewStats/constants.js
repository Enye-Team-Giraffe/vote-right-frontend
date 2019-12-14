export const WAIT_TIME = 2.0;
export const LARGE_GAS = 3000000;
export const BAR_OPTIONS = {
    chart: {
        type: 'column',
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
            align: 'high',
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
    title: {
        text: 'Candidates and number of votes',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
};
