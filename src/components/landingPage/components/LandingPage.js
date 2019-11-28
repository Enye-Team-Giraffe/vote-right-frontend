/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Button } from 'antd';
import './LandingPage.css';
import Facebook from '../../../static/icons/facebook.svg';
import Instagram from '../../../static/icons/instagram.svg';
import Twitter from '../../../static/icons/twitter.svg';
import Youtube from '../../../static/icons/youtube.svg';
import {
    FACEBOOK_PAGE, INSTAGRAM_PAGE, TWITTER_PAGE, YOUTUBE_PAGE
} from '../constants';

const {
    Header, Footer, Content,
} = Layout;

const LandingPage = () => (
    <Layout>
        <Header className="header-class">
            <NavLink to="/"><div className="navbar1">Vote Right</div></NavLink>
            <NavLink to="/login"><div className="navbar2">Login</div></NavLink>
        </Header>
        <Content>
            <section className="hero">
                <h2 className="hero-title">
                    Vote Right is a voting technology based on blockchain.
                </h2>
                <p>
                    A secured, decentralized auditable and open platform
                        for e-voting and vote counting that everybody can trust.
                </p>
                <div>
                    <NavLink to="/login">
                        <Button className="button-class" type="primary">Login</Button>
                    </NavLink>
                </div>
            </section>
        </Content>

        <Footer>
            <div className="footer-content1"><p className="credits">Vote Right | Copyright &copy; Team Giraffe 2019</p></div>
            <div className="footer-content2">
                <a href={FACEBOOK_PAGE}>
                    <img src={Facebook} alt="Facebook" />
                </a>
                <a href={INSTAGRAM_PAGE}>
                    <img src={Instagram} alt="Instagram" />
                </a>
                <a href={TWITTER_PAGE}>
                    <img src={Twitter} alt="Twitter" />
                </a>
                <a href={YOUTUBE_PAGE}>
                    <img src={Youtube} alt="Youtube" />
                </a>
            </div>
        </Footer>
    </Layout>
);

export default LandingPage;
