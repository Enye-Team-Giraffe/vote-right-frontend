/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import './LandingPage.css';
import {
    LOGO, LOGINETXT, MENUITEMS, ANIMATION_DURATION, FOOTER_ITEMS
} from '../constants';

const { Title, Text } = Typography;

const LandingPage = () => {
    const [currentText, setCurrentText] = useState(MENUITEMS[1]);
    const [stateKey, setStateKey] = useState(0);
    const counter = useRef(currentText.index);

    /**
     * Handles changing the current text on the screen and render the animation
     * @function
     * @param {event} index - the index of this element in the constant array
     */
    const changeCurrentText = index => {
        setCurrentText(MENUITEMS[index]);
        setStateKey(Math.random());
    };
    /**
     * Handles manual changing the current text on the screen and render the animation
     * @function
     * @param {event} index - the index of this element in the constant array
     */
    const manualChange = index => {
        counter.current = index;
        changeCurrentText(index);
    };

    const dummy = () => {
        window.dummy = 'active';
    };
    // run the animation every four seconds
    useEffect(() => {
        setInterval(() => {
            counter.current += 1;
            changeCurrentText(counter.current % MENUITEMS.length);
        }, ANIMATION_DURATION);
    }, []);

    return (
        <div className="homepage-wrapper">
            {/* the section for the header */}
            <div className="homepage-wrapper__header">

                {/* the icon/logo for voteright */}
                <div className="homepage-wrapper__header__icon">
                    <Title level={1} className="icon">
                        <span className="heading-logo --white --cursivefont">{LOGO}</span>
                    </Title>
                </div>
                {/* the icon/logo for voteright */}

                {/* the other options for voteright's home page */}
                <div className="homepage-wrapper__header__options">
                    <NavLink to="/login">
                        <Text className="--white --mediumsized --boldfont --scale" strong>
                            {LOGINETXT}
                        </Text>
                    </NavLink>
                </div>
                {/* the other options for voteright's home page */}

            </div>
            {/* the section for the header */}

            <div className="homepage-wrapper__section">

                {/* content for displaying on the home page */}
                <div className="homepage-wrapper__content --white --boldfont --mediumsized">
                    <div className="homepage-wrapper__content__side-bar">
                        {
                            MENUITEMS.map(menuitem => (
                                <div
                                    aria-label="Mute volume"
                                    onClick={() => manualChange(menuitem.index)}
                                    className={`item ${(menuitem.index === currentText.index) ? 'active' : ''}`}
                                    key={`${menuitem.FIRSTTITLE}-${menuitem.index}`}
                                    onKeyDown={dummy}
                                    role="button"
                                    tabIndex="0"
                                />
                            ))
                        }
                    </div>
                    <div className="homepage-wrapper__content--wrapper --animated" key={stateKey}>
                        <div className="homepage-wrapper__content__description">{currentText.FIRSTTITLE}</div>
                        <div className="homepage-wrapper__content__description --landingbolder">{currentText.SECONDTITLE}</div>
                        <div className="homepage-wrapper__content__text">
                            {currentText.HOMETEXT}
                        </div>
                    </div>
                </div>
                {/* content for displaying on the home page */}

                {/* footer for the homepage */}
                <div className="homepage-wrapper__footer">
                    {
                        FOOTER_ITEMS.map(footerItem => (
                            <a href={footerItem.href} key={`${footerItem.alt}-${Math.random()}`}>
                                <img
                                    className="--small --greyscale"
                                    src={footerItem.src}
                                    alt={footerItem.alt}

                                />
                            </a>
                        ))
                    }

                </div>
                {/* footer for the home page */}
            </div>
        </div>
    );
};

export default LandingPage;
