import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './ModalForm.css';

const ModalForm = ({type}) => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //Modal handler
    const modalRef = useRef(null);
    const [propState, setPropState] = useState(1);

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
        // <div className='FloatingForm'>
            
        // </div>
        <div>
            <button className='LoginBtn' type='submit' onClick={openModal}>로그인</button>
            <dialog ref={modalRef} className={`GlobalModal ${propState == 0 ? 'LoginModal' : 'ConfirmModal'}`}>
                <h1>hi</h1>
                <button onClick={closeModal}>닫기</button>
            </dialog>
        </div>
    );
};

export default ModalForm;