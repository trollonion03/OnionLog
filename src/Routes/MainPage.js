import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';

const MainPage = () => {
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});
    const isLargeHeight = useMediaQuery({minDeviceHeight: 899});

    const navStyle = {
        maxWidth: isLargeScreen ? 'calc(1180px - 20px)' : '100%',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
    };

    const bodyStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100px',
        height: isLargeHeight? '770px' : 'calc(100vh - 102px)' 
    }

    const cardStyle = {
        width: isLargeScreen ? '1180px' : '100%',
        height: '720px'
    }


    const onClickLogin = () => {
        console.log('login');
    }

    return (
        <div className='MainPage'>
            <header>
                <div className='NavBar' style={navStyle}>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>OnionLog_</Link>
                        <Link style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '63px' }} to='blog'>블로그</Link>
                    </div>
                    <button type='submit' onClick={onClickLogin}>로그인</button>
                </div>
            </header>
            <div className='MainBody' style={bodyStyle}>
                <div className='Card' style={cardStyle}></div>
            </div>
            <footer>
                <div className='FooterBar' style={divStyle}>
                    <h>© 2024, Hyoungeon Kim</h>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;