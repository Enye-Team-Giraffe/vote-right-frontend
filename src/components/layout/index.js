import React from 'react';
import './style.css';

function Layout({ children }) {
    return (
        <div className="layout">
            <div className="whiteSection">
                {children[0]}
            </div>
            <div className="blueSection -blue">
                {children[1]}
            </div>
        </div>
    );
}

export default Layout;
