/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'antd';
import './LandingPage.css';
// import Facebook from '../../../static/icons/facebook.svg';
// import Instagram from '../../../static/icons/instagram.svg';
// import Twitter from '../../../static/icons/twitter.svg';
// import Youtube from '../../../static/icons/youtube.svg';
// import {
//     FACEBOOK_PAGE, INSTAGRAM_PAGE, TWITTER_PAGE, YOUTUBE_PAGE
// } from '../constants';

const { Title, Text } = Typography;

const LandingPage = () => (

    <div className="homepage-wrapper">

        {/* the section for the header */}
        <div className="homepage-wrapper__header">

            {/* the icon/logo for voteright */}
            <div className="homepage-wrapper__header__icon">
                <Title level={1} className="icon">
                    <span className="heading-logo --white --cursivefont">ONE TWO</span>
                </Title>
            </div>
            {/* the icon/logo for voteright */}

            {/* the other options for voteright's home page */}
            <div className="homepage-wrapper__header__options">
                <NavLink to="/login">
                    <Text class="--white --mediumsized --boldfont" strong>
                        Login
                    </Text>
                </NavLink>
            </div>
            {/* the other options for voteright's home page */}

        </div>
        {/* the section for the header */}

        {/* content for displaying on the home page */}
        <div className="homepage-wrapper__content --white --boldfont --mediumsized">
            <div className="description">Worldclass</div>
            <div className="description --bolder">Blockchain Solution</div>
            <div className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nam laboriosam explicabo voluptatem fugit obcaecati,
                asperiores tempora neque voluptate excepturi eveniet itaque ullam ad,
                corporis nihil facere fuga quod perferendis quidem!
            </div>
        </div>
        {/* content for displaying on the home page */}
    </div>
);

export default LandingPage;
