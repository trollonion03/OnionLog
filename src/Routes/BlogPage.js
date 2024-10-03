import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './BlogPage.css';
import IMG_STUDY from '../imgs/book.svg';
import IMG_PROJECT from '../imgs/code.svg';
import IMG_ETC from '../imgs/folder-open.svg';
import IMG_CLOCK from '../imgs/clock.svg';
import IMG_DOG from '../imgs/dog.png';
import IMG_SEARCH from '../imgs/search.svg';
import IMG_TAG from '../imgs/tag.svg';
import IMG_ARCHIVE from '../imgs/archive.svg';

const BlogPage = () => {
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

    // Posts
    const PostTitles = ({title, desc, link, date, binder}) => {
        const binderStyle = {
            backgroundColor: SERIES_COLOR[binder],
        }

        const binderStyleGlobal = {
            color: SERIES_COLOR[binder],
        }

        return (
            <button className='PostBtn' type='submit' onClick={() => {navigate(`post/${link}`)}}>
                <p className='ListTitle'>{title}</p>
                <div className='ListBinderContainer' style={binderStyleGlobal}>
                    <p>{SERIES_TAG[binder]}</p>
                    <div className='ListBinder' style={binderStyle}></div>
                </div>
                <p className='ListDesc'>{desc}</p>
                <div className='TimeStamp'>
                    <img src={IMG_CLOCK} alt=''></img>
                    <p>{date}</p>
                </div>
            </button>
        );
    }

    const ImgPostTitle = ({img, title, desc, link, date, binder}) => {
        const binderStyle = {
            backgroundColor: SERIES_COLOR[binder],
        }

        const binderStyleGlobal = {
            color: SERIES_COLOR[binder],
        }

        return (
            <button className='PostImgBtn' type='submit' onClick={() => {navigate(`post/${link}`)}}>
                <img className='PostImg' src={img} alt={title}></img>
                <div className='PostBtn PostBtnPos'>
                    <p className='ListTitle'>{title}</p>
                    <div className='ListBinderContainer' style={binderStyleGlobal}>
                        <p>{SERIES_TAG[binder]}</p>
                        <div className='ListBinder' style={binderStyle}></div>
                    </div>
                    <p className='ListDesc'>{desc}</p>
                    <div className='TimeStamp'>
                        <img src={IMG_CLOCK} alt=''></img>
                        <p>{date}</p>
                    </div>
                </div>
        </button>
        );
    }

    const ArchiveBtns = ({years}) => {
        return (
            <button type='submit' className='ArchiveBtn'>
                <p className={`Years`} id={`a${years}`}>{years}</p>
                <p className='Go'>→</p>
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
                            <PostTitles title={'글은 글이지'} desc={'진짜 뭐라쓰지?'} link={`${1}`} date={`${2024}.${'06'}.${12}.`} binder={FLAG_ETC}></PostTitles>
                            <ImgPostTitle img={IMG_DOG} title={'썸네일이 들어간 게시물'} desc={'강아지 귀여워'} link={`${2}`} date={`${2024}.${'06'}.${12}.`} binder={FLAG_PROJECT}></ImgPostTitle>
                            <PostTitles title={'설명도 안들어간 게시물'} desc={''} link={`${1}`} date={`${2024}.${'06'}.${12}.`} binder={FLAG_STUDY}></PostTitles>
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
                            <div className='ManagerList ArchiveList'>
                                <div className='TagTitle'>
                                    <img src={IMG_ARCHIVE} alt='tag'></img>
                                    <p>Archives</p>
                                </div>
                                <div id='ArchiveContainer'>
                                    <ArchiveBtns years={2024}></ArchiveBtns>
                                    <ArchiveBtns years={2023}></ArchiveBtns>
                                    <ArchiveBtns years={2022}></ArchiveBtns>
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

export default BlogPage;