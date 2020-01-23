export const PARTICLE_STYLE = {
    height: '100%',
    left: 0,
    paddingTop: '12%',
    position: 'absolute',
    display:"flex",
    justifyContent:"center",
    top: 0,
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
        number: {
            density: {
                enable: true,
                value_area: 700,
            },
            value: 12,
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
        move: {
            enable: false,
        },
        size: {
            random: true,
            value: 9,
        },
    },
    retina_detect: true,
};