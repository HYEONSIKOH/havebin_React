import React from 'react';
import { PC } from './pc.js';
import { MOBILE } from './mobile.js';


function MAIN() {
    const URL = 'http://ec2-43-201-28-219.ap-northeast-2.compute.amazonaws.com:8080/';
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isiOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    return (
      <div>
        {/* PC 컴포넌트 */}
        {!isiOS && !isAndroid && (
          <PC url = {URL}/>
        )}
        
        {/* 모바일 화면 컴포넌트 */}
        {isiOS && (
            <MOBILE url = {URL}/>
        )}

        {/* 모바일 화면 컴포넌트 */}
        {isAndroid && (
            <MOBILE url = {URL}/>
        )}
      </div>
    );
  }
  
  export { MAIN };
