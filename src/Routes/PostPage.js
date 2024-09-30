import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './PostPage.css';
import IMG_STUDY_BLACK from '../imgs/study_black.svg';
import IMG_PROJECT_BLACK from '../imgs/project_black.svg';
import IMG_ETC_BLACK from '../imgs/etc_black.svg';
import IMG_SEARCH from '../imgs/search.svg';
import IMG_TAG from '../imgs/tag.svg';


const PostPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    const SERIES_COLOR = new Array('#F99090', '#8DCBF9', '#BBFF86');
    const SERIES_TAG = new Array('Project', 'Study', 'Etc.');
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

    const linkStyle = {
        textDecoration: 'none',
        color: '#707070',
        fontFamily: 'galmuri11',
        fontSize: '20px'
    }

    //--- [End] Components Styles ---

    //--- [Start] Reuseable Components ---
    
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
                    <p id='CurTitle'>포스트</p>
                </div>
                <div className='PageConents'>
                    <div className='TitleWrapper'>
                        <div className='SeriesWrapper'>
                            <img src={IMG_PROJECT_BLACK} alt='' style={{height: '32px', width: '32px', float: 'left'}}></img>
                            <p style={{float: 'left', marginLeft: '5px', fontSize: '24px'}}>{SERIES_TAG[FLAG_PROJECT]}</p>
                        </div>
                        <p className='PpTitle'>썸네일이 들어간 게시물</p>
                        <div className='InfoWrapper'>

                        </div>
                    </div>
                    <div className='PostContainer' style={{marginTop: '0px'}}>
                        <div className='PostWrapper'>

                        </div>
                        <div className='SearchManager' style={managerStyle}>
                            <div className='SearchBox'>
                                <input type='text' id='PostSearch' placeholder={'Search...'}></input>
                                <img src={IMG_SEARCH} alt='search'></img>
                            </div>
                            <div className='ManagerList'>
                                <div className='TagTitle'>
                                    <img src={IMG_TAG} alt='tag'></img>
                                    <p>Tag</p>
                                </div>
                                <div id='TagContainer'>
                                    <Link style={linkStyle} reloadDocument to='/blog/'>강아지</Link>
                                    <Link style={linkStyle} reloadDocument to='/blog/'>프로젝트</Link>
                                    <Link style={linkStyle} reloadDocument to='/blog/'>아무말</Link>
                                </div>
                            </div>
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

export default PostPage;