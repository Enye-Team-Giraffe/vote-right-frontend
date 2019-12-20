import React from 'react';
import { Layout } from 'antd';
import TopNav from './TopNav';
import MainContent from './MainContent';

const VoterLayout = () => (
    <Layout>
        <TopNav />
        <MainContent />
    </Layout>
);

export default VoterLayout;
