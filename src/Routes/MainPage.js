import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';

const MainPage = () => {
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});

    console.log(isLargeScreen);

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
        height: '77px',
        margin: '0 auto'
    };

    const bodyStyle = {
        maxWidth: isLargeScreen ? '1180px' :'100%',
    }

    return (
        <div className='MainPage'>
            <header>
                <div className='NavBar' style={divStyle}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>OnionLog</Link>
                </div>
            </header>
            <div className='MainBody' style={bodyStyle}>

            </div>
            <footer>
                <div className='FooterBar' style={divStyle}>

                </div>
            </footer>
        </div>
    );
};

export default MainPage;