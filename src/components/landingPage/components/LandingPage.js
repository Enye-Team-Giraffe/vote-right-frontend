/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import './LandingPage.css';
import Facebook from '../../../static/icons/facebook.svg';
import Instagram from '../../../static/icons/instagram.svg';
import Twitter from '../../../static/icons/twitter.svg';
import Youtube from '../../../static/icons/youtube.svg';
import {
    FACEBOOK_PAGE, INSTAGRAM_PAGE, TWITTER_PAGE, YOUTUBE_PAGE,
    LOGO, LOGINETXT, MENUITEMS
} from '../constants';

const { Title, Text } = Typography;

const LandingPage = () => {
    const [currentText, setCurrentText] = useState(MENUITEMS[1]);
    const [stateKey, setStateKey] = useState(0);
    const counter = useRef(currentText.index);

    /**
     * Responsible or attaching an eventlistener to  non-button item
     * @function
     * @param {event} index - the index of this element in the constant array
     */
    const dummy = () => {
        window.dummy = 'active';
    };

    /**
     * Handles changing the current text on the screen and render the animation
     * @function
     * @param {event} index - the index of this element in the constant array
     */
    const changeCurrentText = index => {
        setCurrentText(MENUITEMS[index]);
        setStateKey(Math.random());
    };

    // run the animation every four seconds
    useEffect(() => {
        setInterval(() => {
            counter.current += 1;
            changeCurrentText(counter.current % MENUITEMS.length);
        }, 3500);
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
                        <Text className="--white --mediumsized --boldfont" strong>
                            {LOGINETXT}
                        </Text>
                    </NavLink>
                </div>
                {/* the other options for voteright's home page */}

            </div>
            {/* the section for the header */}

            {/* content for displaying on the home page */}
            <div className="homepage-wrapper__content --white --boldfont --mediumsized">
                <div className="homepage-wrapper__content__side-bar">
                    {
                        MENUITEMS.map(menuitem => (
                            <div
                                aria-label="Mute volume"
                                onClick={() => changeCurrentText(menuitem.index)}
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
                    <div className="homepage-wrapper__content__description --bolder">{currentText.SECONDTITLE}</div>
                    <div className="homepage-wrapper__content__text">
                        {currentText.HOMETEXT}
                    </div>
                </div>
            </div>
            {/* content for displaying on the home page */}

            {/* footer for the homepage */}
            <div className="homepage-wrapper__footer">

                <a href={FACEBOOK_PAGE}>
                    <img className="--small" src={Facebook} alt="Facebook" />
                </a>
                <a href={INSTAGRAM_PAGE}>
                    <img className="--small" src={Instagram} alt="Instagram" />
                </a>
                <a href={TWITTER_PAGE}>
                    <img className="--small" src={Twitter} alt="Twitter" />
                </a>
                <a href={YOUTUBE_PAGE}>
                    <img className="--small" src={Youtube} alt="Youtube" />
                </a>
            </div>
            {/* footer for the home page */}
        </div>
    );
};

export default LandingPage;
