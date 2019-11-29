import React from 'react';
import Particles from 'react-particles-js';
import './layout.css';
import { particleParameters } from './constants';

// style for the item which we put over the animation
const overlay = {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    fontSize: '20px',
    height: '100%',
    justifyContent: 'center',
};

// style for the particle which we want to display
const particleStyle = {
    height: '100%',
    left: 0,
    paddingBottom: '3%',
    paddingTop: '3%',
    position: 'absolute',
    top: 0,
    width: '100%',
};

/**
 * Default layout for pages
 *
 * @function
 * @param {func} ComponentOne - one of two component to display
 * @param {func} ComponentTwo - one of two component to display
 * @return {Component} the jsx component for default page layout
 */
const withLayout = (ComponentOne = 'div', ComponentTwo = 'div') => () => (
    <div>
        <div className="layout">
            <div className="whiteSection">
                <ComponentOne />
            </div>
            <div className="blueSection -blue">
                <ComponentTwo style={overlay} />
                <Particles
                    params={particleParameters}
                    style={particleStyle}
                />
            </div>
        </div>
    </div>
);

export default withLayout;
