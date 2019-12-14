export const WAIT_TIME = 2.0;
export const LARGE_GAS = 3000000;
export const OPTIONs = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Male vs Female participation'
    },
    xAxis: {
        categories: ['Female', 'Male'],
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population',
            align: 'high'
        }
    },

    series: [{
        name:"gender",
        data: [107,150]
    }]
}