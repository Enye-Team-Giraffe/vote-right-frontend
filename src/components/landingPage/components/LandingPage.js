/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import './LandingPage.css';
import Facebook from '../../../static/icons/facebook.svg';
import Instagram from '../../../static/icons/instagram.svg';
import Twitter from '../../../static/icons/twitter.svg';
import Youtube from '../../../static/icons/youtube.svg';
import {
    FACEBOOK_PAGE, INSTAGRAM_PAGE, TWITTER_PAGE, YOUTUBE_PAGE,
    LOGO, FIRSTTITLE, SECONDTITLE, HOMETEXT, LOGINETXT
} from '../constants';

const { Title, Text } = Typography;

const LandingPage = () => (

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
                <div className="item" id="one" />
                <div className="item" id="two" />
                <div className="item" id="three" />
                <div className="item" id="four" />
            </div>
            <div className="homepage-wrapper__content--wrapper">
                <div className="description">{FIRSTTITLE}</div>
                <div className="description --bolder">{SECONDTITLE}</div>
                <div className="text">
                    {HOMETEXT}
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

export default LandingPage;
