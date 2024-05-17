import React, { useState } from 'react';
import '../CSS/ios.css';

function ANDROID(props) {
    const [visibility, setVisibility] = useState(true);
    const [isOn, setIsOn] = useState(false);

    // { 설치없이 앱으로 시작 } 버튼 누르면 ON으로 바뀜
    const handleIsOnChange = () => {
        isOn ? setIsOn(false) : setIsOn(true);
    }
    
    // const handleVisibilityChange = () => {
    //     setVisibility(!visibility);
    // };

    return (
        <div style={{ 
            zIndex: '100', 
            position: 'absolute', 
            width: '100%',
            height: 'calc(100% + env(safe-area-inset-top))', 
            backgroundColor: 'rgba(128, 128, 128, 0.7)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-end', // 아래로 정렬
        }}>
                {!isOn && (
                    <div 
                        style={{
                            backgroundColor: '#FFFFFF',
                            width: '70%', 
                            height: 'auto', // 변경된 부분
                            paddingRight: '20px',
                            paddingLeft: '20px',
                            zIndex: '101', 
                            position: 'relative', // 부모 요소에 대해 상대 위치 설정
                            border: '1px solid #ccc',
                            borderRadius: '30px',
                            marginBottom: '5%',
                        }}
                    >   
                        {/* <div onClick={props.onClose}>
                            <img src="closeBtn.svg" width= '20px' height='20px' style = {{position: 'absolute', right: '20px', top: '20px'}}/>
                        </div> */}

                        <div style={{margin: '0 auto', width: 'max-content', height: 'max-content', marginTop: '30px', marginBottom: '20px'}}>
                            <img src='../havebin_profile.svg' width='70px' height='70px'/>
                        </div>

                        <p style={{ fontSize: '11pt', fontWeight: '500', textAlign: 'center' }}>
                            <a style={{ fontSize: '12pt', fontWeight:'1000' }}>여따버려</a>를 설치하시면 다양한 기능들을 사용하실 수 있습니다.
                        </p>

                        <div 
                            style={{ 
                                display: 'flex', 
                                margin: '0 auto',
                                backgroundColor: '#97C751',
                                border: '1px solid #ccc',
                                paddingRight: '45px',
                                paddingLeft: '45px',
                                paddingTop: '15px',
                                paddingBottom: '15px',
                                borderRadius: '30px',
                                width: 'max-content',
                                color: '#ffffff',
                                fontSize: '12pt',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                marginTop: '30px',
                                }}
                            >
                            <a style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style = {{display: 'flex', alignItems: 'center'}} onClick={handleIsOnChange} >
                                    <img src='../store.svg' width='15px' height='15px' style={{marginRight: '5px'}}/>
                                    스토어에서 설치
                                </div>
                            </a>
                        </div>
                        {/* <div 
                            style={{ color: '#bbbbbb', textDecoration: 'underline', textAlign: "center", fontSize: '9pt', marginBottom: '20px' }}
                            onClick={props.onClose}
                        > 
                            그냥 웹에서 간단하게 볼래요. 
                        </div> */}
                    </div>
                )}

                {isOn && (
                    <div 
                        style = {{
                            width: '100%',
                            height: 'calc(100%)',
                            backgroundColor: '#F6F6F6',
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '5%',
                        }}>
                        
                        <button style={{position: 'absolute', left: '5%', top: '3%', outline: 'none', border: 'none', background: 'none', padding: 0 }} onClick={handleIsOnChange}>
                            <img src='./ArrowLeft.svg'/>
                        </button>

                        <div style = {{fontSize: '14pt', fontWeight: '900', margin: '0 auto', marginTop: '30%', marginBottom:'10%', lineHeight: '22pt', display: 'flex', alignItems: ''}}>
                            <img src='./logo.svg' style={{height: '17pt' }}/>
                            <div>를 APK로 다운받으세요!</div>
                        </div>

                        <div className='box' style={{margin: '0 auto', width: '95%'}}>
                            <div style = {{display: 'flex', alignItems: 'center'}}>
                                <a style={{color: 'gray', fontWeight: '500'}}> 죄송합니다. <br/><br/><br/>
                                현재 배포가 완료되지 않아서<br/><br/>
                                <a style={{fontWeight: 'bold', color: '#000'}}>APK</a> 로 설치 부탁드리겠습니다 ㅠㅠㅠ<br/><br/>
                                최대한 빠른 시일 내에 배포 완료하겠습니다.<br/><br/><br/>
                                감사합니다!!</a>
                            </div>
                        </div>

                        <div 
                            style={{ 
                                display: 'flex', 
                                margin: '0 auto',
                                backgroundColor: '#97C751',
                                border: '1px solid #ccc',
                                paddingRight: '45px',
                                paddingLeft: '45px',
                                paddingTop: '15px',
                                paddingBottom: '15px',
                                borderRadius: '30px',
                                width: 'max-content',
                                marginBottom: '10px',
                                marginTop: '30px',
                                fontSize: '12pt',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                }}
                            >
                                <a href="https://havebin.s3.ap-northeast-2.amazonaws.com/APK/havebin_Beta+1.0.apk" style={{textDecoration: 'none', color: 'inherit'}}>    
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <img src="../apk.svg" width="20px" height="20px" style={{marginRight: '5px'}} alt="APK 아이콘" />
                                        APK 다운로드
                                    </div>
                                </a>
                        </div>
                    </div>
                )}
                    </div>
    )
}

export { ANDROID }
