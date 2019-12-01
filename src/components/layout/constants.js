export const particleParameters = {
    interactivity: {
        detect_on: 'canvas',
        events: {
            onclick: {
                enable: true,
                mode: 'push',
            },
            onhover: {
                enable: true,
                mode: 'grab',
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 8,
                size: 40,
                speed: 3,
            },
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                },
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: ['#747880', '#E31C79'],
        },
        line_linked: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
            bounce: false,
            direction: 'none',
            enable: true,
            out_mode: 'out',
            random: false,
            speed: 4,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 250,
            },
            value: 70,
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
                nb_sides: 5,
            },
            stroke: {
                color: '#145ea8',
                width: 2,
            },
            type: 'circle',
        },
        size: {
            anim: {
                enable: false,
                size_min: 0.1,
                speed: 40,
                sync: false,
            },
            random: true,
            value: 10,
        },
    },
    retina_detect: true,
};

