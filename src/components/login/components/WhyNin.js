import React from 'react';
import { Typography } from 'antd';
import './style.css';
import 'antd/dist/antd.css';

const { Title, Text } = Typography;

/**
 * WhyNin component
 * @return {jsx component} WhyNin component
 */
function WhyNin() {
    return (
        <div className="whyNin">
            <Title className="-white" level={3}>Why we neeed your NIN?</Title>
            <Text className="__whyNinText -white">
              We need your NIN number to confirm your identity ,
              and to enforce that you are who you say your are.
              Your data is completely private and safe.
            </Text>
        </div>
    );
}

export default WhyNin;
