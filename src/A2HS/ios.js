import React, { useState } from 'react';
import '../CSS/ios.css';
import { NUMCIR } from "../Btn/numCir.js"

function IOS() {
    const [isOn, setIsOn] = useState(false);

    // { 설치없이 앱으로 시작 } 버튼 누르면 ON으로 바뀜
    const handleVisibilityChange = () => {
        isOn ? setIsOn(false) : setIsOn(true);
    }

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
                            backgroundColor: isOn ? '#F6F6F6' : '#FFFFFF', 
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

                        <div style={{margin: '0 auto', width: 'max-content', height: 'max-content', marginTop: '30px', marginBottom: '20px'}}>
                            <img src='../havebin_profile.svg' width='70px' height='70px'/>
                        </div>

                        <p style={{ fontSize: '11pt', fontWeight: '500' ,textAlign: 'center' }}>
                            홈 화면에 <a style={{ fontSize: '12pt', fontWeight:'1000' }}>여따버려</a>를 추가하면 더 원할하게 사용하실 수 있습니다.
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
                                marginBottom: '30px',
                                marginTop: '30px',
                                }}
                            onClick={handleVisibilityChange}
                            >
                            설치없이 앱으로 시작
                        </div>
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
                        
                        <button style={{position: 'absolute', left: '5%', top: '3%', outline: 'none', border: 'none', background: 'none', padding: 0 }} onClick={handleVisibilityChange}>
                            <img src='./ArrowLeft.svg'/>
                        </button>

                        <div style = {{fontSize: '14pt', fontWeight: '900', marginTop: '30%', marginBottom:'10%', lineHeight: '22pt', display: 'flex', alignItems: ''}}>
                            <img src='./logo.svg' style={{height: '17pt' }}/>
                            <div>를 홈화면에 추가해보세요!</div>
                        </div>

                        <div className='box'>
                            <div style = {{display: 'flex', alignItems: 'center'}}>
                                <NUMCIR num = {1}/><a style={{color: 'gray', fontWeight: '500'}}> 브라우저 하단 <a style={{fontWeight: 'bold', color: '#000'}}>공유 버튼</a></a>
                            </div>
                            <img src="./footer_bar.png" width="100%" height="auto" style={{ borderRadius: '12px', marginTop: '10px' }}/>
                        </div>

                        <div className='box'>
                            <div style = {{display: 'flex', alignItems: 'center'}}>
                                <NUMCIR num = {2}/> <a style={{color: 'gray', fontWeight: '500'}}><a style={{fontWeight: 'bold', color: '#000'}}> 홈 화면에 추가</a> 선택</a>
                            </div>
                            <img src="./share_bar.png" width="100%" height="auto" style={{ borderRadius: '12px', marginTop: '10px' }}/>
                        </div>
                    </div>
                )}
            </div>
    )
}

export { IOS }
