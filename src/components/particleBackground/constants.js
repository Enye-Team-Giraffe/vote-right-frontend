export const PARTICLE_STYLE = {
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
};
export const particleParameters = {
    particles: {
        color: {
            value: ['#05052d'],
        },
        line_linked: {
            color: '#0D3578',
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            enable: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 150,
            },
            value: 5,
        },
        opacity: {
            anim: {
                enable: false,
                opacity_min: 0.1,
                speed: 1,
                sync: false,
            },
            random: true,
            value: 0.7,
        },
        shape: {
            polygon: {
                nb_sides: 2,
            },
            stroke: {
                color: '#145ea8',
                width: 1,
            },
            type: 'circle',
        },
        size: {
            random: true,
            value: 9,
        },
    },
    retina_detect: true,
};
