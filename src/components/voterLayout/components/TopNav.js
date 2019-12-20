/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';
import { Layout, Menu, Button } from 'antd';
import LeftMenu from './LeftMenu';
import { VOTERIGHT, MENU, LOGOUT } from '../constants';

const { Header } = Layout;

/**
 * Navbar for voterLayout
 *
 * @component
 * @return {component} - Navbar for voterLayout
 */
const TopNav = () => (
    <Header className="topNav">
        <div className="topNav__logo">
            <Link to="/">
                <span className="topNav__logo-text">{VOTERIGHT}</span>
            </Link>
        </div>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['']}
            className="topNav__menu"
        >
            {Object.keys(MENU).map(key => {
                const [name, route] = MENU[key];
                return (
                    <Menu.Item key={key}>
                        <Link to={`/voter/${route}`}>
                            <span className="topNav__menuText">{name}</span>
                        </Link>
                    </Menu.Item>
                );
            })}
        </Menu>
        <LeftMenu />
        <Button className="topNav__logout">
            {LOGOUT}
        </Button>
    </Header>
);

export default TopNav;
