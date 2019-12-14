export const WAIT_TIME = 2.0;
export const LARGE_GAS = 3000000;
export const OPTIONS = {
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
            text: 'Population',
        },
    },
};
