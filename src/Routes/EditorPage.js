import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import './EditorPage.css';
import IMG_SAVE from '../imgs/save.svg';
import IMG_UPLOAD from '../imgs/upload.svg';
import IMG_UPLOAD_BLACK from '../imgs/uploadblack.svg';
import IMG_ADD from '../imgs/add.svg';
import IMG_DROPDOWN from '../imgs/dropdown.svg';

const EditorPage = () => {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery({minWidth: 1180});
    const isLargeHeight = useMediaQuery({minHeight: 899});

    //Browser Detector
    const isFirefox = typeof InstallTrigger !== 'undefined';

    //Editor State
    const editorRef = useRef();

    //Thumnali file upload
    const thumnaliRef = useRef();

    //Series Select
    let curSeries = '';

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };
    
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

    //--- [Start] Thumnail Upload hanlder ---

    const callUpload = () => {
        thumnaliRef.current.click();
    }

    const uploadThumnailFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    }
    //--- [End] Thumnail Upload handler ---

    //--- [Start] Reuseable Components ---

    const DropDownSelect = ({value}) => {

        const [selVal, setSelVal] = useState('');

        const handleSelect = (event) => {
            value = event.target.value;
            setSelVal(value)
            console.log(value);
        }

        return (
            <div className='DropDownWrapper'>
                <select className='DropDownSelect' value={selVal} onChange={handleSelect}>
                    <option value="none">선택</option>
                    <option value='project'>Project</option>
                    <option value='study'>Study</option>
                    <option value='etc'>Etc.</option>
                </select>
                <img className='DropDownIcon' src={IMG_DROPDOWN} alt='dropdown'></img>
                <div className='outline'></div>
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
                    <p id='CurTitle'>글쓰기</p>
                </div>
                <div className='PageConents'>
                    <p className='ETitle'>제목</p>
                    <input id='TitleInput' placeholder='제목을 입력하세요' type='text'></input>
                    <p id='TitleLength'>{`${0}`}/64</p>
                    <div className='EditorTools'>
                        <p className='ETitle BoneMoon'>본문</p>
                        <div className='ToolsBtns'>
                            <button className='ToolsBtn' style={{marginRight: '25px'}} type='submit'>
                                <p>임시저장</p>
                                <img src={IMG_SAVE} alt='save'></img>
                            </button>
                            <button className='ToolsBtn' type='submit'>
                                <p>Upload!</p>
                                <img src={IMG_UPLOAD} alt='upload'></img>
                            </button>
                        </div>
                    </div>
                    <Editor
                        initialValue="내용을 입력하세요"
                        previewStyle="vertical"
                        height="650px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={false}
                        plugins={[colorSyntax]}
                        ref={editorRef}
                        onChange={onChange}
                        language='ko-KR'
                    />
                    <p className='ETitle'>썸네일</p>
                    <div>
                        <button type='file' className='FileUploadBtn' onClick={callUpload}>
                            <p>업로드</p>
                            <img src={IMG_UPLOAD_BLACK}></img>
                        </button>

                        <input
                            type="file"
                            ref={thumnaliRef}
                            style={{ display: 'none' }}
                            onChange={uploadThumnailFile}
                        />
                    </div>
                    <div></div>
                    <p className='ETitle' style={{marginInlineStart: '0.5px',}}>시리즈</p>
                    <DropDownSelect value={curSeries}></DropDownSelect>
                    <p className='ETitle'>태그</p>
                    <div className='TagForm'>
                        <input type='text' placeholder='추가'></input>
                        <button className='AddTag'>
                            <img src={IMG_ADD}></img>
                        </button>
                        <div className='outline'></div>
                    </div>
                    <div></div>
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

export default EditorPage;