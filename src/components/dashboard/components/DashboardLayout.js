import React from 'react'; import './DashboardLayout.css';
import { Layout, Menu} from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const {
    Header, Content, Sider,
} = Layout;

const DashboardLayout = () => (
    <Layout>
        <Sider
            className="sideNav"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="sideNav_top">
                <span> Vote Right </span>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} className="menu">
                <Menu.Item key="1" >
                    <span className="nav-text">nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span className="nav-text">nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span className="nav-text">nav 3</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span className="nav-text">nav 4</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Content className="content">
                <div>content</div>
            </Content>
        </Layout>
    </Layout>
);

export default DashboardLayout;
