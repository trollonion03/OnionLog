import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate, useFetcher } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axiost from "../AxiosInstance";
import './ModalForm.css';

const ModalForm = ({prop}) => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //Modal handler
    const modalRef = useRef(null);
    const [propState, setPropState] = useState(prop);

    //Login handler
    const loginBtnRef = useRef(null);
    const [msgState, setMsgState] = useState('');
    let userId = '';
    let userPw = '';

    //Session Storage
    const s_isLogin = window.sessionStorage.getItem("isLogin");
    const [isLogin, setIsLogin] = useState(s_isLogin ? s_isLogin : 'false');

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

    //--- [Start] Modal Handler ---
    const openModal = () => {
        modalRef.current?.showModal();
    }

    const closeModal = () => {
        modalRef.current?.close();
    }

    useEffect(() => {
        if(modalRef.current) {
            const target = modalRef.current;

            target.addEventListener('click', (e) => {
                const targetArea = target.getBoundingClientRect();
                if(e.clientX < targetArea.left || e.clientX > targetArea.right || e.clientY < targetArea.top || e.clientY > targetArea.bottom)
                    target.close(); 
            });
        }
    }, [])

    //--- [End] Modal Handler ---

    //--- [Start] Login Handler ---

    const onChangeId = (e) => {
        userId = e.target.value;
    }

    const onChangePw = (e) => {
        userPw = e.target.value;
    }

    const onLogin = () => {
        if(String(userId).length < 2 && String(userPw).length < 2) {
            setMsgState('아이디와 비밀번호를 입력하시오');
            return;
        }
        
        axiost.post('auth/login/', {
            email: userId,
            password: userPw,
        })
        .then(response => {
            let token = response.data.token.access;
            axiost.defaults.headers.common['Authorization'] = `JWT ${token}`;
            
            if(response.status === 200) {
                setIsLogin('true')
                setMsgState('');
                closeModal();
            }
            else
                throw new Error('login failed');
            
        }).catch(error => {
            console.log(error)
            setMsgState('문제가 발생하였습니다')
        });
    }

    useEffect(() => {
        window.sessionStorage.setItem("isLogin", isLogin);
    });

    const onActivateEnter = (e) => {
        if(e.key === "Enter") {
          loginBtnRef.current.click()
        }
      }

    //--- [End] Login Handler ---

    //--- [Start] Reuseable Components ---
    const LoginBtn = () => {
        return (
            <button className='LoginBtn' type='submit' onClick={openModal}>{isLogin === 'true' ? '메뉴' : '로그인'}</button>
        );
    }

    const LoginForm = () => {
        return (
            <div className='LoginForm'>
                <p id='LoginTitle'>OnionLog<span>_</span></p>
                <div className='LoginInputWrapper' id='LoginID'>
                    <input className='LoginInput' placeholder='ID' onChange={onChangeId} onKeyDown={onActivateEnter}></input>
                </div>
                <div className='LoginInputWrapper' id='LoginPW'>
                <input className='LoginInput' placeholder='Password' type='password' onChange={onChangePw} onKeyDown={onActivateEnter}></input>
                </div>
                <p id='LoginErrorMsg' style={{marginTop: msgState.length > 0 ? '15px' : '0px'}}>{msgState}</p>
                <button id='LoginSubmit' style={{marginTop: msgState.length > 0 ? '15px' : '25px'}} ref={loginBtnRef} onClick={() => {onLogin()}}><p>로그인</p></button>
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
        <div>
            {propState === 0 && <LoginBtn></LoginBtn>}
            <dialog ref={modalRef} className={`GlobalModal ${propState == 0 ? 'LoginModal' : 'ConfirmModal'}`}>
                {propState === 0 && <LoginForm></LoginForm>}
                {propState === 1 && <CheckForm></CheckForm>}
            </dialog>
        </div>
    );
};

export default ModalForm;