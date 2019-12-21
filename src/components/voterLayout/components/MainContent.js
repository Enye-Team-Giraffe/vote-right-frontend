import React from 'react';
import './MainContent.css';
import { Layout } from 'antd';

import {BODY_CONTENT} from "../constants"
const { Content } = Layout;

const MainContent = () => (
    <Content className="voterLayout">
            {
                BODY_CONTENT.map(contentItem=>(
                    <div className={contentItem.header}>
                        <div className="voterLayout__election__tab">
                            <div className="voterLayout__election__tab__image">
                                <img className="voterLayout__election__tab__image" src={contentItem.src} alt=""/>
                            </div>
                            <div className="voterLayout__election__tab__text">
                                {contentItem.text}
                            </div>
                        </div>
                    </div>
                ))
            }
    </Content>
);

export default MainContent;
