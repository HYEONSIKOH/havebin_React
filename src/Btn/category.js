import React, { useState, useEffect } from 'react';

function CATEGORY({mode}) {
    return (
        <div style={{marginRight: '5px',fontSize: '14px', color: '#555', width: 'auto' }}>
                <div className = "ReportBTN">
                  <div
                    style={{
                      display: 'block', // 버튼을 블록 요소로 설정
                      padding: '2px 10px',
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '37px',
                      fontSize: '12px',
                      width: 'fit-content' // 내용에 맞게 너비를 조정
                    }}
                  >
                    <a style={{verticalAlign: 'middle'}}>{mode}</a>
                  </div>
                </div>
        </div>
    );
}

export { CATEGORY };