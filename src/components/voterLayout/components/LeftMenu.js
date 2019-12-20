/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Button, Drawer, Icon } from 'antd';
import './LeftMenu.css';

const LeftMenu = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => setVisible(true);

    const onClose = () => setVisible(false);

    return (
        <div>
            <Button
                className="leftMenu__menuBar"
                onClick={showDrawer}
            >
                <Icon type="menu" />
            </Button>
            <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
};

export default LeftMenu;
