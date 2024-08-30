import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './BlogPage.css'

const BlogPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});
    const isLargeHeight = useMediaQuery({minDeviceHeight: 899});

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //--- [Start] Components Styles ---
    const navStyle = {
        maxWidth: isLargeScreen ? 'calc(1180px - 20px)' : '100%',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
    };

    const bodyStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
        height: isLargeHeight? '770px' : 'calc(100vh - 102px)',
        display: 'block',
    }

    //--- [End] Components Styles ---

    const onClickLogin = () => {
        console.log('login');
    }

    return (
        <div className='MainPage'>
            <header>
                <div className='NavBar' style={navStyle}>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} reloadDocument to='/'>OnionLog_</Link>
                        <Link style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '63px' }} to='/blog'>블로그</Link>
                    </div>
                    <button type='submit' onClick={onClickLogin}>로그인</button>
                </div>
            </header>
            <div className='MainBody' style={bodyStyle}>
                <div className='PageTitle'>
                    <p id='BlogTitle'>OnionLog<span>_</span></p>
                    <p id='CurTitle'>블로그</p>
                </div>
            </div>
            <footer>
                <div className='FooterBar' style={divStyle}>
                    © 2024, Hyoungeon Kim
                </div>
            </footer>
        </div>
    );
};

export default BlogPage;