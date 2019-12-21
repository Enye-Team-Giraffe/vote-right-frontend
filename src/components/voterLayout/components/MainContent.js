/* eslint-disable max-lines-per-function */
import React from 'react';
import './MainContent.css';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

import { BODY_CONTENT } from '../constants';

const { Content } = Layout;

const MainContent = () => (
    <Content className="voterLayout">
        {
            BODY_CONTENT.map(contentItem => (
                <Link to={`/user/${contentItem.link}`} key={contentItem.header + contentItem.text}>
                    <div className={contentItem.header}>
                        <div className="voterLayout__election__tab">
                            <div className="voterLayout__election__tab__image">
                                <img
                                    className="voterLayout__election__tab__image"
                                    src={contentItem.src}
                                    alt={contentItem.header}
                                />
                            </div>
                            <div className="voterLayout__election__tab__text">
                                {contentItem.text}
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        }
    </Content>
);

export default MainContent;
