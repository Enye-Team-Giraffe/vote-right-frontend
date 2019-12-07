/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './SideNav.css';
import { VOTERIGHT, MENU } from '../constants';

const { Sider } = Layout;

/**
 * Component for showing side navigation
 *
 * @component
 * @return {jsx} - left side navifation
 */
const SideNav = () => (
    <Sider
        className="sideNav"
        breakpoint="lg"
        collapsedWidth="0"
    >
        <div className="sideNav__top">
            <Link to="/">
                <span className="sideNav__topLogo ">{VOTERIGHT}</span>
            </Link>
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['']}
            className="menu"
        >
            {Object.keys(MENU).map(key => (
                <Menu.Item key={key}>
                    <Link to="/dashboard">
                        <span className="nav-text">{MENU[key]}</span>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    </Sider>
);

export default SideNav;
