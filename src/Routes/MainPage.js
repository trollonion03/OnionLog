import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './MainPage.css';
import TROLLONION from '../imgs/trollonion.webp'
import GITHUB from '../imgs/github.svg';
import C from '../imgs/c.png';
import CPP from '../imgs/cpp.png';
import KOTLIN from '../imgs/kotlin.png';
import JAVA from '../imgs/java.png';
import PYTHON from '../imgs/python.png';
import ANDROID from '../imgs/android.png';
import DJANGO from '../imgs/django.png';
import MFC from '../imgs/mfc.png';
import QT from '../imgs/qt.png';
import DEFAULT_IMG from '../imgs/none.png';


const MainPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({maxWidth: 1200});
    const isLargeHeight = useMediaQuery({minHeight: 900});
    const notMobileHeader = useMediaQuery({minWidth: 430});
    const isMinCardWidth = useMediaQuery({maxWidth: 1000});

    useEffect(() => {
        console.log(`Current screen size: ${window.innerWidth}px`);
    }, [isLargeScreen, isLargeHeight]);

    //mouse scroll effect
    const cardRef = useRef(null);
    const timerRef = useRef(null);
    const wheelRef = useRef(0);
    const scrollThreshold = 500;
    
    //Card switch effect
    const [animationClass, setAnimationClass] = useState('');
    const [switchState, setSwitchState] = useState(1);
    const [pageBtnState, setPageBtnState] = useState(1);
    const maxPage = 6;

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //--- [Start] Components Styles ---
    const navStyle = {
        maxWidth: isLargeScreen ?  '100vw' : 'calc(1180px - 20px)',
    };

    const divStyle = {
        maxWidth: isLargeScreen ? '100%' : '1180px',
    };

    const bodyStyle = {
        maxWidth: isLargeScreen ? '100%' : '1180px',
        height: 'calc(100vh - 77px - 25px - 77px)' 
    };

    const cardStyle = {
        width: isLargeScreen ?  '100%' : '1180px',
        height: isLargeHeight ? '720px' : 'calc(100vh - 77px - 25px - 77px - 20px)'
    }

    const subTitleStyle = {
        width: isMinCardWidth ? 'calc(100% - 50px)' : '905px',
    }

    const resumeContentStyle = {
        width: isMinCardWidth ? 'calc(100% - 50px)' : '905px',
        height: isLargeHeight ? '420px' : '',
        marginBottom: notMobileHeader ? '52px' : '42px'
    }

    const resumeTextStyle1 = {
        fontSize: notMobileHeader ? '40px' : '32px',
    }

    const resumeTextStyle2 = {
        fontSize: notMobileHeader ? '32px' : '24px',
    }

    const resumeTextStyle3 = {
        fontSize: notMobileHeader ? '24px' : '16px',
    }

    //40 40 32 24
    //32 32 24 16

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
        else if(switchState === 6) {
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
                if (switchState+1 <= maxPage) {
                    setAnimationClass('card-slide-bottom');
                    setSwitchState(switchState+1);
                }
                // console.log('next');
            }
            else if (wheelRef.current < 1) {
                wheelRef.current = scrollThreshold;
                if (switchState-1 >= 1) {
                    setAnimationClass('card-slide-top');
                    setSwitchState(switchState-1);
                }
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
            console.log(Boolean(timerRef.current));
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

    useEffect(() => {
        const handleAnimationEnd = () => {
            setAnimationClass('');
        };

        const cardElement = cardRef.current;
        if (cardElement) {
            cardElement.addEventListener('animationend', handleAnimationEnd);
        }

        return () => {
            if (cardElement) {
                cardElement.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, [animationClass]);
    
    //--- [End] wheel evnet handler ---

    //--- [Start] Cards ---

    const TitleCard = () => {
        const isLargeWidthCards = useMediaQuery({minWidth: 400});
        const isLargeHeightCards = useMediaQuery({minHeight: 750});

        const titleTextStyle = {
            fontSize: isLargeWidthCards ? '64px' : '56px',
        };

        const titleBtnTextStyle = {
            fontSize: isLargeWidthCards ? '32px' : '24px',
        };

        const titleBtnStyle = {
            marginTop: isLargeHeightCards ? '52px': '30px',
        }


        const onClickPortf = () => {
            setSwitchState(2);
        }

        return (
            <div className={`Cards ${animationClass}`} id='titl'>
                <p className={`titles ${isFirefox ? 'firefox' : ''}`} style={titleTextStyle} id='title1' data='OnionLog'>OnionLog<span>_</span></p>
                <div id='titleBtns' style={titleBtnStyle}>
                    <button className='titleBtn' style={titleBtnTextStyle} id='toDown' type='submit' onClick={onClickPortf}>↓포트폴리오</button>
                    <button className='titleBtn' style={titleBtnTextStyle} id='toBlog' type='submit' onClick={() => {navigate('/blog')}}>→블로그</button>
                </div>
            </div>
        );
    }

    const TitleCard2 = () => {
        const isIntrMinWidth = useMediaQuery({minWidth: 954});
        const isMinImgWidth = useMediaQuery({minWidth: 860})
        const isLargeHeightCards = useMediaQuery({minHeight: 750});

        const imgStyle = {
            display: isMinImgWidth ? '' : 'none',
        }

        const displayStyle = {
            float: isIntrMinWidth ? '' : 'none',
        }

        const cardSizeStyle = {
            width: isIntrMinWidth ? '' : 'calc(100% - 50px)',
            height: isLargeHeightCards ? '' : 'calc(100% - 89px*2 - 50px)',
        }

        const fontStyle1 = {
            fontSize: isIntrMinWidth ? '' : '32px',
        }

        const fontStyle2 = {
            fontSize: isIntrMinWidth ? '' : '24px',
        }

        const fontStyle3 = {
            fontSize: isIntrMinWidth ? '' : '16px',
            marginTop: isLargeHeightCards ? '' : '25px',
        }

        const btnStyle = {
            marginTop: isLargeHeightCards ? '' : '25px',
        }

        //40 28 16 16

        return (
            <div className={`Cards ${animationClass}`}>
                <div id='intr' style={cardSizeStyle}>
                    <img src={TROLLONION} id='trollpa' style={imgStyle} alt='trollonion'></img>
                    <div id='intro' style={displayStyle}>
                        <p id='intro1' style={fontStyle1}>Hello World!</p>
                        <p id='intro2' style={fontStyle2}>임베디드 SW 개발자 김형언입니다!</p>
                        <p id='intro3' style={fontStyle3}>건국대학교 컴퓨터공학부 재학 &#40;2022.03.~&#41;<br></br>ASPL INC. &#40;2022.01.~&#41;</p>
                        <button id='toGithub' type='submit' onClick={() => {window.open('https://www.Github.com/trollonion03', '_blank');}} style={btnStyle}>
                            <img src={GITHUB} alt='Github'></img><p>Github</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const StackIconContainer = ({src, description, style}) =>{
        return (
            <div className='icon-container' style={style}>
                <img src={src} alt={description}></img>
                <p>{description}</p>
            </div>
        )
    }

    const mainStackStyle = {
        marginLeft: '20px',
        float: 'right'
    }

    const mainStackDummy = {
        marginLeft: '20px',
        float: 'right',
        opacity: '0'
    }

    const subStackStyle = {
        marginRight: '20px',
        float: 'left'
    }

    const subStackStyleLong = {
        marginRight: '20px',
        float: 'left',
        letterSpacing: '-1px'
    }

    const subStackStyleLong2 = {
        marginRight: '20px',
        float: 'left',
        letterSpacing: '-2.5px'
    }

    const subStackDummy = {
        marginRight: '20px',
        float: 'left',
        opacity: '0'
    }

    const SkillCard = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container'>
                    <p className='Contents-title' id='ct1'>Skills</p>
                </div>
                <div className='Contents'>
                    <p className='Contents-Subtitle' id='cst1'>Languages</p>
                    <div className='Stacks-Container'>
                        <div className='main-stacks'>
                            <p>Main Stacks</p>
                            <div className='icons'>
                                <StackIconContainer src={CPP} description={'C++'} style={mainStackStyle}></StackIconContainer>
                                <StackIconContainer src={C} description={'C'} style={mainStackStyle}></StackIconContainer>
                                <StackIconContainer src={DEFAULT_IMG} description={'none'} style={mainStackDummy}></StackIconContainer>
                            </div>
                        </div>
                        <div className='Splitter'></div>
                        <div className='sub-stacks'>
                            <p>Sub Stacks</p>
                            <div className='icons'>
                                <StackIconContainer src={KOTLIN} description={'Kotlin'} style={subStackStyle}></StackIconContainer>
                                <StackIconContainer src={JAVA} description={'Java'} style={subStackStyle}></StackIconContainer>
                                <StackIconContainer src={PYTHON} description={'Python'} style={subStackStyle}></StackIconContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SkillCard2 = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container'>
                    <p className='Contents-title' id='ct1'>Skills</p>
                </div>
                <div className='Contents'>
                    <p className='Contents-Subtitle' id='cst2'>Flatforms &#38; Frameworks</p>
                    <div className='Stacks-Container'>
                        <div className='main-stacks'>
                            <p>Main Stacks</p>
                            <div className='icons'>
                                <StackIconContainer src={MFC} description={'MFC'} style={mainStackStyle}></StackIconContainer>
                                <StackIconContainer src={QT} description={'QT'} style={mainStackStyle}></StackIconContainer>
                                <StackIconContainer src={DEFAULT_IMG} description={'C2000'} style={mainStackStyle}></StackIconContainer>
                            </div>
                        </div>
                        <div className='Splitter'></div>
                        <div className='sub-stacks'>
                            <p>Sub Stacks</p>
                            <div className='icons'>
                                <StackIconContainer src={DJANGO} description={'Django'} style={subStackStyleLong}></StackIconContainer>
                                <StackIconContainer src={ANDROID} description={'Android'} style={subStackStyleLong2}></StackIconContainer>
                                <StackIconContainer src={DEFAULT_IMG} description={'none'} style={subStackDummy}></StackIconContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const ResumeCard = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container' style={subTitleStyle}>
                    <p className='Contents-title' id='rt1' style={resumeTextStyle1}>Activity</p>
                </div>
                <div className='Contents' style={resumeContentStyle}>
                    <p className='Contents-Subtitle' id='ry1' style={resumeTextStyle1}>2023</p>
                    <div className='Resume-Right'>
                        <p className='Resume-Category' style={resumeTextStyle2}>ASPL INC.</p>
                        <p style={resumeTextStyle3}>실시간 데이터 획득 시스템 UI 개발</p>
                    </div>
                    <div className='Resume-Left'>
                        <p className='Resume-Category' style={resumeTextStyle2}>Personal</p>
                        <p style={resumeTextStyle3}>
                            Shouter - Whisper AI 기반 분산 처리 자막 생성 서비스<br></br>
                            PySide6 기반 LMS 자동수강 프로그램<br></br>
                            Turtlebot3를 이용한 디지털 트윈 주행 프로젝트
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const ResumeCard2 = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container' style={subTitleStyle}>
                    <p className='Contents-title' id='rt1' style={resumeTextStyle1}>Activity</p>
                </div>
                <div className='Contents' style={resumeContentStyle}>
                    <p className='Contents-Subtitle' id='ry2' style={resumeTextStyle1}>2022</p>
                    <div className='Resume-Right'>
                        <p className='Resume-Category' style={resumeTextStyle2}>ASPL INC.</p>
                        <p style={resumeTextStyle3}>변압기 제어 소프트웨어 개발</p>
                    </div>
                    <div className='Resume-Left'>
                        <p className='Resume-Category' style={resumeTextStyle2}>Personal</p>
                        <p style={resumeTextStyle3}>
                            KNSU 로켓 발사제어 시스템 개발
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const ResumeCard3 = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container' style={subTitleStyle}>
                    <p className='Contents-title' id='rt1' style={resumeTextStyle1}>Activity</p>
                </div>
                <div className='Contents' style={resumeContentStyle}>
                    <p className='Contents-Subtitle' id='ry3' style={resumeTextStyle1}>2020~2021</p>
                    <div className='Resume-Right'>
                        <p className='Resume-Category' style={resumeTextStyle2}>Personal(2021)</p>
                        <p style={resumeTextStyle3}>
                            Iot 기반 스마트 클래스룸 생태계 구축 프로젝트<br></br>
                            Yolo v5 기반 다목적실 내 곰팡이 증식 방지 시스템 개발
                        </p>
                    </div>
                    <div className='Resume-Left'>
                        <p className='Resume-Category' style={resumeTextStyle2}>Personal(2020)</p>
                        <p style={resumeTextStyle3}>
                            차세대 뉴로모픽칩의 특징 및, AI, 자율주행 로봇 활용성에 대한 연구<br></br>
                            대전지역 통합 범죄예방 어플리케이션 개발
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const ResumeCard4 = () => {
        return (
            <div className={`Cards ${animationClass}`}>
                <div className='title-Container' style={subTitleStyle}>
                    <p className='Contents-title' id='rt1' style={resumeTextStyle1}>Activity</p>
                </div>
                <div className='Contents' style={resumeContentStyle}>
                    <p className='Contents-Subtitle' id='ry4' style={resumeTextStyle1}>2019</p>
                    <div className='Resume-Right'>
                        <p className='Resume-Category' style={resumeTextStyle2}>Personal</p>
                        <p style={resumeTextStyle3}>
                            안전 자전거 시스템 개발&#40;2019 한국코드페어 착한상상 부문 출전&#41;
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='MainPage'>
            <header>
                <div className='NavBar' style={navStyle}>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} reloadDocument to='/'>OnionLog_</Link>
                        {notMobileHeader && <Link style={{ textDecoration: 'none', color: 'black', fontSize: '18px', marginLeft: '63px' }} to='/blog'>블로그</Link>}
                    </div>
                    <button type='submit' onClick={onClickLogin}>로그인</button>
                </div>
            </header>
            <div className='MainBody' style={bodyStyle}>
                <div className='Card' style={cardStyle} ref={cardRef}>
                    <button className='PageBtn' id='up' type='submit' style={btnUpStyle} onClick={() => {setSwitchState(switchState-1); setAnimationClass('card-slide-top');}}>↑</button>
                    {switchState === 1 && <TitleCard></TitleCard>}
                    {switchState === 2 && <TitleCard2></TitleCard2>}
                    {/* {switchState === 3 && <SkillCard></SkillCard>} */}
                    {/* {switchState === 4 && <SkillCard2></SkillCard2>} */}
                    {switchState === 3 && <ResumeCard></ResumeCard>}
                    {switchState === 4 && <ResumeCard2></ResumeCard2>}
                    {switchState === 5 && <ResumeCard3></ResumeCard3>}
                    {switchState === 6 && <ResumeCard4></ResumeCard4>}
                    <button className='PageBtn' id='down' type='submit' style={btnDownStyle} onClick={() => {setSwitchState(switchState+1); setAnimationClass('card-slide-bottom');}}>↓</button>
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