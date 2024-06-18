import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';

const MainPage = () => {
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});
    const isLargeHeight = useMediaQuery({maxDeviceHeight: 899});

    const navStyle = {
        maxWidth: isLargeScreen ? 'calc(1180px - 20px)' : '100%',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
    };

    const cardStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
        height: isLargeHeight ? '720px' : 'inherit'
    }

    const onClickLogin = () => {
        console.log('login');
    }

    return (
        <div className='MainPage'>
            <header>
                <div className='NavBar' style={navStyle}>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>OnionLog</Link>
                        <Link style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '63px', fontFamily: 'inter-thin'}} to='blog'>블로그</Link>
                    </div>
                    <button type='submit' onClick={onClickLogin}>로그인</button>
                </div>
            </header>
            <div className='MainBody' style={divStyle}>
                <div className='Card' style={cardStyle}>

                </div>
            </div>
            <footer>
                <div className='FooterBar' style={divStyle}>

                </div>
            </footer>
        </div>
    );
};

export default MainPage;