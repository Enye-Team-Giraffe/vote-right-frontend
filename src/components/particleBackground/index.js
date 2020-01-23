import React from 'react';
import Particles from 'react-particles-js';
import { particleParameters, PARTICLE_STYLE } from './constants';


export default function ParticleBG() {
    return (
        <Particles
            params={particleParameters}
            style={PARTICLE_STYLE}
        />
    )
}
