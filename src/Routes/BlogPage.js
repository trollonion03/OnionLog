import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './BlogPage.css';
import IMG_STUDY from '../imgs/book.svg';
import IMG_PROJECT from '../imgs/code.svg';
import IMG_ETC from '../imgs/folder-open.svg';

const BlogPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    const SERIES_COLOR = new Array('#F99090', '#8DCBF9', '#BBFF86');
    const FLAG_PROJECT = 0;
    const FLAG_STUDY = 1;
    const FLAG_ETC = 2;

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

    //--- [End] Components Styles ---

    //--- [Start] Reuseable Components ---
    const SeriesBtn = ({name, img, color}) => {

        const binderStyle = {
            backgroundColor: color,
        }

        console.log(`color: ${color}`);

        return (
            <button className='SeriesBtn' type='submit' onClick={() => {console.log(name)}}>
                <div className='SeriesBinder' style={binderStyle}></div>
                <div className='SeriesTag'>
                    <img src={img} alt={`${name}`}></img>
                    <p>{`${name}`}</p>
                </div>
            </button>
        );
    }
    //--- [End] Reuseable Components ---

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
                <div className='PageConents'>
                    <p className='SubTitle'>시리즈</p>
                    <div className='SeriesContainer'>
                        <SeriesBtn img={IMG_PROJECT} name={'Project'} color={SERIES_COLOR[FLAG_PROJECT]}></SeriesBtn>
                        <SeriesBtn img={IMG_STUDY} name={'STUDY'} color={SERIES_COLOR[FLAG_STUDY]}></SeriesBtn>
                        <SeriesBtn img={IMG_ETC} name={'Etc.'} color={SERIES_COLOR[FLAG_ETC]}></SeriesBtn>
                    </div>
                    <p className='SubTitle'>글</p>
                    <div className='PostContainer'>
                        <div className='PostList' style={listStyle}>

                        </div>
                        <div className='SearchManager' style={managerStyle}>

                        </div>
                    </div>
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