import React, { useState } from 'react';

function ANDROID(props) {
    const [visibility, setVisibility] = useState(true);

    const handleVisibilityChange = () => {
        setVisibility(!visibility);
    };

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
                        <div onClick={props.onClose}>
                            <img src="closeBtn.svg" width= '20px' height='20px' style = {{position: 'absolute', right: '20px', top: '20px'}}/>
                        </div>

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
                                marginBottom: '10px',
                                marginTop: '30px',
                                }}
                            >
                            <a href="https://play.google.com/store/apps/details?id=com.kakao.talk&hl=ko&gl=US" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style = {{display: 'flex', alignItems: 'center'}}>
                                    <img src='../store.svg' width='15px' height='15px' style={{marginRight: '5px'}}/>
                                    스토어에서 설치
                                </div>
                            </a>
                        </div>
                        <div 
                            style={{ color: '#bbbbbb', textDecoration: 'underline', textAlign: "center", fontSize: '9pt', marginBottom: '20px' }}
                            onClick={props.onClose}
                        > 
                            그냥 웹에서 간단하게 볼래요. 
                        </div>
                    </div>

            </div>
    )
}

export { ANDROID }
