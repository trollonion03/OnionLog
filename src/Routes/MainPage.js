import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';

const MainPage = () => {
    const isLargeScreen = useMediaQuery({minDeviceWidth: 1180});
    const isLargeHeight = useMediaQuery({minDeviceHeight: 899});

    //mouse scroll effect
    const cardRef = useRef(null);
    const timerRef = useRef(null);
    const wheelRef = useRef(0);
    const scrollThreshold = 500;
    
    //Card switch effect
    const [switchState, setSwitchState] = useState(1);
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
    }, [switchState]);

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
        const cardHeight = document.getElementsByClassName('titleDiv').height;
        const titleHeight = document.getElementsByClassName('titles').height;

        const titleStyle = {
            marginTop: `${cardHeight/2-titleHeight}`, 
            height: '720px'
        }

        return (
            <div className='Cards'>
                <div id='titleDiv'>
                    <p className='titles' id='title1'>OnionLog_</p>
                </div>
                <button className='titleBtn' type='submit' onClick={() => {}}>↓포트폴리오</button>
                <button className='titleBtn' type='submit' onClick={() => {}}>→블로그</button>
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
                    <button className='PageBtn' id='up' type='submit'>↑</button>
                    {switchState === 1 && <TitleCard></TitleCard>}
                    {switchState === 2 && <p>Page 2 Content</p>}
                    {switchState === 3 && <p>Page 3 Content</p>}
                    {switchState === 4 && <p>Page 4 Content</p>}
                    {switchState === 5 && <p>Page 5 Content</p>}
                    {switchState === 6 && <p>Page 6 Content</p>}
                    {switchState === 7 && <p>Page 7 Content</p>}
                    {switchState === 8 && <p>Page 8 Content</p>}
                    <button className='PageBtn' id='down' type='submit'>↓</button>
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