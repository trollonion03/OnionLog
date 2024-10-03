import React, { useEffect, useState, useRef, useCallback, useInsertionEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import './PostPage.css';
import IMG_STUDY_BLACK from '../imgs/study_black.svg';
import IMG_PROJECT_BLACK from '../imgs/project_black.svg';
import IMG_ETC_BLACK from '../imgs/etc_black.svg';
import IMG_SEARCH from '../imgs/search.svg';
import IMG_TAG from '../imgs/tag.svg';
import IMG_CLOCK_BLACK from '../imgs/clock_black.svg';
import IMG_CLOCK_GRAY from '../imgs/clockgray.svg';
import IMG_DOG from '../imgs/dog.png';
import IMG_TAG_GRAY from '../imgs/tag_gray.svg';
import IMG_COMMENT from '../imgs/comment.svg';

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

    //Viewer Test
    const testPost = `<p>여러분 우리 귀여운 강아지좀 보고가세요~</p><div data-language="c++" class="toastui-editor-ww-code-block"><pre><code data-language="c++">dog dog1 = new dog();</code></pre></div>`;
    const testComment = `그래, 나빠지지는 말아야지, 그거면 됐지.`;

    //Comment handler
    const commentRef = useRef(null);
    const [cmtTxtCnt, setCmtTxtCnt] = useState(0);
    const [isCmtEmpty, setIsCmtEmpty] = useState(true);
    const [isNameEmpty, setIsNameEmpty] = useState(true);
    const cmtBtnWrpRef = useRef(null);
    const cmtBtnRef = useRef(null);

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
    
    const postStyle = {
        width: isLargeScreen ? '740px' : '100%',
        // paddingRight: isLargeScreen ? '25px' : '0px',
    }

    const managerStyle = {
        display : isLargeScreen ? 'block' : 'none',
    }

    //--- [End] Components Styles ---

    //--- [Start] Comment area resize & Count handler ---

    const handleInput = (e) => {
        const textarea = commentRef.current;
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight > 36 ? textarea.scrollHeight + 'px' : '36px';
        textarea.style.height = newHeight;
        setCmtTxtCnt(e.target.value.length);
        if (cmtTxtCnt > 1)
            setIsCmtEmpty(false);
        else
            setIsCmtEmpty(true)
    }

    const handleNameInput = (e) => {
        if(e.target.value.length > 0) {
            setIsNameEmpty(false)
        }
        else {
            setIsNameEmpty(true);
        }
    }

    useEffect(()=>{
        if(isCmtEmpty === false && isNameEmpty === false) {
            if (cmtBtnRef.current) {
                cmtBtnRef.current.style.background = 'linear-gradient(90deg, #E95148 0%, #ED3C7C 47%, #DB38F5 100%)';
                cmtBtnRef.current.style.webkitBackgroundClip = 'text';
                cmtBtnRef.current.style.color = 'transparent';
                cmtBtnRef.current.disabled = false;
            }
        }
        else if(isCmtEmpty === true || isNameEmpty === true) {
            if (cmtBtnRef.current) {
                cmtBtnRef.current.style.background = 'none';
                cmtBtnRef.current.style.color = '#707070';
                cmtBtnRef.current.disabled = true;
            }
        }
            
    }, [isCmtEmpty, isNameEmpty])

    //--- [End] Comment area resize & Count handler ---

    //--- [Start] Reuseable Components ---

    const PostTag = ({type, tagName}) => {
        
        const linkStyle = {
            textDecoration: 'none',
            color: '#707070',
            fontFamily: 'galmuri11',
            fontSize: '20px',
            float: 'left',
            marginLeft: type ? '5px' : '0px',
        }

        return (
            <div className='TagWrapper' style={{lineHeight: type ? '32px' : '26px'}}>
                <img style={{display: type ? 'block' : 'none'}} src={IMG_TAG_GRAY} alt='tags'></img>
                <Link style={linkStyle} reloadDocument to='/blog/'>{tagName}</Link>
            </div>
        );
    }

    const Comments = ({nickname, body, timestamp}) => {
        return (
            <div className='Comments'>
                <div style={{display: 'flow-root'}}>
                    <p className='Nickname'>{`${nickname} :`}</p>
                    <p className='CommentBody'>{body}</p>
                </div>
                <div className='CmtTimestamp'>
                    <img src={IMG_CLOCK_GRAY} alt='commentTimestamp'></img>
                    <p>{timestamp}</p>
                </div>
                
            </div>
        )
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
                            <img src={IMG_CLOCK_BLACK} style={{float: 'left'}} alt='info'></img>
                            <p style={{float: 'left', marginLeft: '10px'}}>{`${2024}.${'06'}.${12}.`}</p>
                            <div className='ForMaintenance' style={{float: 'left'}}>
                                <Link style={{float: 'left', color: '#707070', fontSize: '18px'}}to='/blog/editor'>수정</Link>
                                <button className='DeleteBtn' onClick={() => {console.log('delete')}}><Link style={{color: '#707070', fontFamily: 'galmuri11', fontSize: '18px'}}>삭제</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className='PostContainer' style={{marginTop: '0px'}}>
                        <div className='PostWrapper' style={postStyle}>
                            <img src={IMG_DOG} alt='thumnail' style={{width: '100%'}}></img>
                            <Viewer
                                initialValue={testPost}
                                width='100%'
                            />
                            <p className='ETitle'>태그</p>
                            <div className='TagContainerOnPost'>
                                <PostTag type={true} tagName={'강아지'}></PostTag>
                            </div>
                            <div style={{display: 'flow-root', marginTop: '25px', width: '100%'}}>
                                <p className='ETitle' style={{float: 'left', margin: '0px'}}>댓글</p>
                                <p style={{float:'left', fontFamily: 'galmuri11', fontSize: '32px', color: '#707070', margin: `${52.8 - 43.2}px 0 0 10px`}}>{1}</p>
                            </div>
                            <textarea id='CommentInput' ref={commentRef} row='1' onInput={handleInput} maxlength='256' placeholder='여기에 댓글 입력' type='text'></textarea>
                            <p id='TitleLength'>{`${cmtTxtCnt}`}/256</p>
                            <div style={{display: 'flow-root', marginTop: '15px'}}>
                                <div className='NameWrapper' style={{float: 'left'}}>
                                    <input id='NameInput' onInput={handleNameInput} style={{height: '45px', width: '305px', padding: '0', float: 'none'}} placeholder='이름'></input>
                                </div>
                                <div className='NameWrapper CmtBtnWrapper' ref={cmtBtnWrpRef} style={{float: 'right'}}>
                                    <button id='CommentBtn' ref={cmtBtnRef}>
                                        <p>등록</p>
                                        <img src={IMG_COMMENT} alt='comment'></img>
                                    </button>
                                </div>
                            </div>
                            <div className='CommentContainer'>
                                <Comments nickname={'Null'} body={testComment} timestamp={`${24}.${'06'}.${15}.`}></Comments>
                            </div>
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
                                    <PostTag type={false} tagName={'강아지'}></PostTag>
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