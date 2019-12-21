/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button, Drawer, Icon, Menu
} from 'antd';
import './LeftMenu.css';
import { MENU, LOGOUT } from '../constants';

/**
 * LeftMenu for voterLayout

 * @component
 * @return {component} - LeftMenu for voterLayout
 */
const LeftMenu = () => {
    const [visible, setVisible] = useState(false);

    /**
     * Show/hide left drawer
     *
     * @function
     * @return {void}
     */
    const showDrawer = () => setVisible(true);

    /**
     * Close left drawer
     * @function
     * @return {void}
     */
    const onClose = () => setVisible(false);

    return (
        <div className="leftMenu">
            <Button
                className="leftMenu__menuBar"
                onClick={showDrawer}
            >
                <Icon type="menu" />
            </Button>
            <Drawer
                className="leftMenu__drawer"
                placement="left"
                onClose={onClose}
                visible={visible}
            >
                <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={['']}
                    className="leftMenu__menu"
                >
                    {Object.keys(MENU).map(key => {
                        const [name, route] = MENU[key];
                        return (
                            <Menu.Item key={key}>
                                <Link to={`/voter/${route}`}>
                                    <span className="leftMenu__menuText">{name}</span>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
                <Button className="leftMenu__logout">
                    {LOGOUT}
                </Button>
            </Drawer>
        </div>
    );
};

export default LeftMenu;
