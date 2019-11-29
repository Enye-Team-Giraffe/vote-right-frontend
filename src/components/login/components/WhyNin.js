import React from 'react';
import { Typography } from 'antd';
import './WhyNin.css';
import 'antd/dist/antd.css';
import { WHYWENEED, WHYNIN } from '../constants';

const { Title, Text } = Typography;

/**
 * WhyNin component
 * @return {jsx component} WhyNin component
 */
function WhyNin() {
    return (
        <div className="whyNin">
            <Title className="-white" level={3}>{WHYWENEED}</Title>
            <Text className="__whyNinText -white">
                {WHYNIN}
            </Text>
        </div>
    );
}

export default WhyNin;
