import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});
    const isLargeHeight = useMediaQuery({minDeviceHeight: 899});

    //mouse scroll effect
    const cardRef = useRef(null);
    const timerRef = useRef(null);
    const wheelRef = useRef(0);
    const scrollThreshold = 500;
    
    //Card switch effect
    const [switchState, setSwitchState] = useState(1);
    const [pageBtnState, setPageBtnState] = useState(1);
    const maxPage = 8;

    //--- [Start] Components Styles ---
    const navStyle = {
        maxWidth: isLargeScreen ? 'calc(1180px - 20px)' : '100%',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
    };

    const bodyStyle = {
        maxWidth: isLargeScreen ? '1180px' : '100%',
        height: isLargeHeight? '770px' : 'calc(100vh - 102px)' 
    }

    const cardStyle = {
        width: isLargeScreen ? '1180px' : '100%',
        height: '720px'
    }

    //--- [End] Components Styles ---

    const onClickLogin = () => {
        console.log('login');
    }

    //--- [Start] Switch card handler ---

    useEffect(() => {
        console.log(`page: ${switchState}`);
        if(switchState === 1) {
            setPageBtnState(1);
        }
        else if(switchState === 8) {
            setPageBtnState(2);
        }
        else {
            setPageBtnState(0);
        }
        
    }, [switchState]);

    useEffect(() => {
        console.log(`pb: ${pageBtnState}`);
    }, [pageBtnState])

    const btnUpStyle = {
        opacity: pageBtnState === 1 ? 0 : 1,
        pointerEvents: pageBtnState === 1 ? 'none' : 'auto'
    }

    const btnDownStyle = {
        opacity: pageBtnState === 2 ? 0 : 1,
        pointerEvents: pageBtnState === 2 ? 'none' : 'auto'
    }

    //--- [End] Switch card handler ---

    //--- [Start] Wheel event handler ---
    const handleWheel = useCallback((e) => {
        if(cardRef.current && cardRef.current.contains(e.target)) {
            wheelRef.current += e.deltaY;
                
            if (wheelRef.current > scrollThreshold) {
                wheelRef.current = 0;
                if (switchState+1 <= maxPage)
                    setSwitchState(switchState+1);
                // console.log('next');
            }
            else if (wheelRef.current < 1) {
                wheelRef.current = scrollThreshold;
                if (switchState-1 >= 1)
                    setSwitchState(switchState-1);
                // console.log('prev');
            }
                
            // console.log(`wheel: ${wheelRef.current}`);
        }
    }, [switchState]);
    
    // wheel event debouncer
    const debounceWheelEvent = useCallback((e) => {
        if(cardRef.current && cardRef.current.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            // console.log(Boolean(timerRef.current));
        }
        
        if (!timerRef.current) {
            timerRef.current = setTimeout (() => {
                timerRef.current = null;
                handleWheel(e);
            }, 10);
        }
    }, [handleWheel]);

    useEffect(() => {
        window.addEventListener('wheel', debounceWheelEvent, {passive: false});

        return () => {
            window.removeEventListener('wheel', debounceWheelEvent);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [debounceWheelEvent]);
    
    //--- [End] wheel evnet handler ---

    //--- [Start] Cards ---

    const TitleCard = () => {
        const onClickPortf = () => {
            setSwitchState(2);
        }

        return (
            <div className='Cards' id='titl'>
                <p className='titles' id='title1'>OnionLog<span>_</span></p>
                <div id='titleBtns'>
                    <button className='titleBtn' type='submit' onClick={onClickPortf}>↓포트폴리오</button>
                    <button className='titleBtn' id='toBlog' type='submit' onClick={() => {navigate('/blog')}}>→블로그</button>
                </div>
            </div>
        );
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
                <div className='Card' style={cardStyle} ref={cardRef}>
                    <button className='PageBtn' id='up' type='submit' style={btnUpStyle}>↑</button>
                    {switchState === 1 && <TitleCard></TitleCard>}
                    {switchState === 2 && <p>Page 2 Content</p>}
                    {switchState === 3 && <p>Page 3 Content</p>}
                    {switchState === 4 && <p>Page 4 Content</p>}
                    {switchState === 5 && <p>Page 5 Content</p>}
                    {switchState === 6 && <p>Page 6 Content</p>}
                    {switchState === 7 && <p>Page 7 Content</p>}
                    {switchState === 8 && <p>Page 8 Content</p>}
                    <button className='PageBtn' id='down' type='submit' style={btnDownStyle}>↓</button>
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

export default MainPage;