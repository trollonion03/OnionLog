import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //--- [Start] Components Styles ---
    const navStyle = {
        maxWidth: isLargeScreen ? 'calc(1180px - 20px)' : '100%',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
    };

    //Override Mainpage Style
    const bodyStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
        height: 'auto',
        minHeight: 'calc(100vh - 204px)',
        display: 'block',
        padding: '25px 0 0',
    }
    
    const listStyle = {
        width: isLargeScreen ? '740px' : '100%',
        paddingRight: isLargeScreen ? '25px' : '0px',
    }

    const managerStyle = {
        display : isLargeScreen ? 'block' : 'none',
    }

    const linkStyle = {
        textDecoration: 'none',
        color: '#707070',
        fontFamily: 'galmuri11',
        fontSize: '20px'
    }

    //--- [End] Components Styles ---

    //--- [Start] Reuseable Components ---
    const LoginForm = () => {
        return (
            <div>
                <p>OnionLog<span>_</span></p>
                <input placeholder='ID'></input>
                <input placeholder='Password'></input>
                <button>로그인</button>
            </div>
        )
    }

    const CheckForm = () => {
        return (
            <div>
                
            </div>
        )   
    }

    //--- [End] Reuseable Components ---

    return (
        <div className='FloatingForm'>
            
        </div>
    );
};

export default LoginForm;