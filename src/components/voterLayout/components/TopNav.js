/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';
import { Layout, Button } from 'antd';
import {actions} from "../../dashboard"
import { VOTERIGHT, LOGOUT } from '../constants';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';


const { Header } = Layout;

/**
 * Navbar for voterLayout
 *
 * @component
 * @return {component} - Navbar for voterLayout
 */
const TopNav = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    // a function to logout the user
    const logoutUser = (e)=>{
        dispatch(actions.logoutUser(history));
    }
    return (

        <Header className="topNav">
            <div className="topNav__logo">
                <Link to="/">
                    <span className="topNav__logo-text --cursivefont">{VOTERIGHT}</span>
                </Link>
            </div>

            <Button onClick={logoutUser} className="topNav__logout --white --mediumsized --boldfont ">
                {LOGOUT}
            </Button>
        </Header>

    )
};

export default TopNav;
