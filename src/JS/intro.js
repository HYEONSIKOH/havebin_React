import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoadingAnimation.css'; // 로딩 애니메이션 관련 스타일 파일

function INTRO() {
  const navigate = useNavigate();
  const [redirectToMain, setRedirectToMain] = useState(false);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowDots(prevShowDots => !prevShowDots); // 점 3개를 나타내거나 숨김
    }, 1000); // 1초마다 애니메이션 변경

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectToMain(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirectToMain) {
      navigate('/main');
    }
  }, [redirectToMain, navigate]);

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}>
        <img src="./intro.svg" alt="Intro Img" className="logo-image" style = {{marginBottom: '20px'}}/>
        <div style = {{marginTop: '20px', height: '40px'}}>
          {showDots && (
            <div className="dot-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { INTRO };
