import React, { useState, useEffect } from 'react';
import Navbar from '../menu/Navbar';
import ENDPOINT from '../../constants/api-endpoints';
import { Link } from 'react-router-dom';

const LogoutRenderer = () => {
    return (
        <>
            <li><Link to="/login">Login</Link></li>
            <li>|</li>
            <li><Link to="/membership">Register</Link></li>
        </>
    );
}

const LoginRenderer = () => {
    return (
        <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>|</li>
            <li><Link onClick={() => logoutUser() }>Logout</Link></li>
        </>
    );
}

const logoutUser = () => {
    localStorage.removeItem('sessionUser');
    window.location.href = ENDPOINT.APP_BASE_PATH + '/login';
}

const Header = () => {
    const [settingsData, setSettings] = useState([]);
    useEffect(() => {
        fetch(ENDPOINT.SETTINGS_DATA)
            .then((response) => response.json())
            .then((responseData) => {
                setSettings(responseData.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let siteName = '';
    let siteLogo = '';
    let phone = '';
    let socialFacebook = '';
    let socialYelp = '';
    let socialYoutube = '';
    let socialGoogle = '';
    let socialTwitter = '';
    let appointmentLink = '';
    if (settingsData.length !== 0) {
        settingsData.map((item, i) => {
            if (item.slug === 'site-name') { siteName = item.content; }
            if (item.slug === 'site-logo') { siteLogo = item.content; }
            if (item.slug === 'phone') { phone = item.content; }
            if (item.slug === 'facebook') { socialFacebook = item.content; }
            if (item.slug === 'yelp') { socialYelp = item.content; }
            if (item.slug === 'youtube') { socialYoutube = item.content; }
            if (item.slug === 'google') { socialGoogle = item.content; }
            if (item.slug === 'twitter') { socialTwitter = item.content; }
            if (item.slug === 'book-a-appointment') { appointmentLink = item.content; }
        });
    }
    let isLoggedIn = localStorage.getItem('sessionUser');
    let loginLogourButton = '';
    if (isLoggedIn) {
        loginLogourButton = <LoginRenderer />
    } else {
        loginLogourButton = <LogoutRenderer />
    }
    return (
        <header className="full_width header" id="header">
            <div className="head_top" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/npr_hdr_bg.jpg)` }}>
                <div className="container-fluid d-flex align-items-center">
                <div className="logo"><a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/npr_logo.png`} alt="logo" /></a></div>
                <div className="pageTitle">
                    <h1>National Paralegal Registry</h1>
                    <h4>Searchable Paralegal Database & Resources</h4>
                </div>
                </div>
            </div>
            <div className="navigation_sec">
                <div className="container d-flex justify-content-between">
                    <div className="menu_sec">
                        <Navbar />
                    </div>
                    <div className="login-bx">
                        <ul id="top" className="menu">
                            <li><i className="fa fa-user-o" aria-hidden="true"></i></li>
                            {loginLogourButton}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;