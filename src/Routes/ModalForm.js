import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
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
    let userId;
    let userPw;

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
        console.log(`${userId} : ${userPw}`);
        axiost.post('auth/login/', {
            email: userId,
            password: userPw,
        })
        .then(response => {
    
        }).catch(error => {
            console.log(error)
        });
    }

    //--- [End] Login Handler ---

    //--- [Start] Reuseable Components ---
    const LoginBtn = () => {
        return (
            <button className='LoginBtn' type='submit' onClick={openModal}>로그인</button>
        );
    }

    const LoginForm = () => {
        return (
            <div className='LoginForm'>
                <p id='LoginTitle'>OnionLog<span>_</span></p>
                <div className='LoginInputWrapper' id='LoginID'>
                    <input className='LoginInput' placeholder='ID' onChange={onChangeId}></input>
                </div>
                <div className='LoginInputWrapper' id='LoginPW'>
                <input className='LoginInput' placeholder='Password' type='password' onChange={onChangePw}></input>
                </div>
                <button id='LoginSubmit' onClick={() => {onLogin()}}><p>로그인</p></button>
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