/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './SideNav.css';
import { VOTERIGHT, MENU } from '../constants';

const { Sider } = Layout;

const SideNav = () => (
    <Sider
        className="sideNav"
        breakpoint="lg"
        collapsedWidth="0"
    >
        {/* Start of Vote right logo section */}
        <div className="sideNav__top">
            <Link to="/">
                <span className="sideNav__topLogo ">{VOTERIGHT}</span>
            </Link>
        </div>
        {/* Start of Vote right logo section */}
        {/* Start of menu */}
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            className="menu"
        >
            <Menu.Item key="1">
                <Link to="/dashboard">
                    <span className="nav-text">{MENU.CREATE}</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/dashboard">
                    <span className="nav-text">{MENU.ONGOING}</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/dashboard">
                    <span className="nav-text">{MENU.CONCLUDED}</span>
                </Link>
            </Menu.Item>
        </Menu>
        {/* End of menu */}
    </Sider>
);

export default SideNav;
