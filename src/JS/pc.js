import React, { useState, useEffect } from 'react';
import { Map, MapMarker, MarkerClusterer, CustomOverlayMap } from 'react-kakao-maps-sdk'; // MarkerClusterer 추가
import { CATEGORY } from "../Btn/category.js"
import axios from 'axios';

function PC({ url }) {
  const [trashcans, setTrashcans] = useState([]);
  const [center, setCenter] = useState({ lat: 37.514634749, lng: 127.104260695 });
  const [openMarkerId, setOpenMarkerId] = useState(null); // 특정 마커 ID를 위한 상태
  const [reportCount, setReportCount] = useState("-");

  // 마커 클릭 핸들러
  const handleMarkerClick = (id) => {
    // 클릭된 마커 ID와 현재 열린 마커 ID가 같다면 닫고, 아니면 해당 마커를 연다.
    if (openMarkerId != id) {
      getReportCount(id);
    } else {
      setReportCount("-");
    }
    setOpenMarkerId(openMarkerId === id ? null : id);
  };

  const getMarkerImage = (id) => {
    return openMarkerId === id ? "clickTrashcan.svg" : "trashcan.svg";
  };

  const getMarkerSize = (id) => {
    return openMarkerId === id ? 60 : 40;
  }

// 쓰레기통 신고횟수 가져오기
function getReportCount(id) {
  axios.post(url + 'findReportCount', {
    TrashcanId: id
  })
  .then((response) => {
    setReportCount(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data: ', error);
      alert('신고 횟수를 가져오는데 실패했습니다.');
  });
}

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (error) => {
        console.error("Geolocation 정보를 가져올 수 없습니다:", error);
      });
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }

    axios.get(url + 'findTrashcans')
      .then((response) => { setTrashcans(response.data); }) // 데이터를 상태에 저장
      .catch((error) => {
        console.error('Error fetching data: ', error);
        alert('데이터를 가져오는데 실패했습니다.');
      });

  }, []);

  return (
    <div>
     <div style = {{top: 10, left:'10px', position: 'absolute', zIndex: '120'}}> <img src="./logo2.svg" alt="logo" style={{width: '20%', height: '30%'}}/> </div> <Map center={center} style={{ width: '100%', height: '100vh', zIndex: '0' }} level={3}>

        {/* 현 위치 마커 */}
        <MapMarker
          key={'center'}
          position={center}
          image={{
            src: "position.png", // 마커 이미지 URL
            size: { width: 30, height: 40 }, // 마커 이미지의 크기 설정
            options: { offset: { x: 27, y: 27 }} // 이미지의 오프셋 설정  
          }}
        />

        {/* 클러스터링 */}
        <MarkerClusterer averageCenter={true} minLevel={5}>

          {/* 쓰레기통 마커 */}
          {trashcans.map((trashcan) => (
            <MapMarker
              key={trashcan.id}
              position={{ lat: trashcan.latitude, lng: trashcan.longitude }}
              image={{
                src: getMarkerImage(trashcan.id), // 마커 이미지 URL
                size: { width: 40, height: 40 }, // 마커 이미지의 크기 설정
                options: { offset: { x: 27, y: 27 }} // 이미지의 오프셋 설정  
              }}
              onClick={() => handleMarkerClick(trashcan.id)}
            >
            </MapMarker>
          ))}
        </MarkerClusterer>
        
          {/* 클릭된 마커의 정보창 */}
          {openMarkerId !== null && (
            <CustomOverlayMap
            position={{
              lat: trashcans.find((tc) => tc.id === openMarkerId)?.latitude,
              lng: trashcans.find((tc) => tc.id === openMarkerId)?.longitude,
            }}
            yAnchor={1}
            style={{ 
              zIndex: '1'
             }}
            >
            <div
              style={{
                display: 'flex',
                minWidth: '400px', // 최소 너비 설정
                height: '180px',
                background: 'white',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                position: 'absolute',
                bottom: '30px', // 마커 이미지 아래에 여유를 두고 표시
                left: '50%', // 마커 이미지 중앙에 표시
                transform: 'translateX(-50%)', // 좌우 중앙 정렬
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', // 그림자 효과
                zIndex: '0'
              }}
            >
              <div className = "info" /*style = {{float: 'left', minWidth: '210px', width: 'max-content', marginTop:'5px', height:'100%'}}*/>
                {trashcans.find((tc) => tc.id === openMarkerId)?.detailAddress != '.' && (
                  <div style={{ marginLeft: '5px' ,fontSize: '18px', marginBottom: '5px' , fontWeight:"bold", position:'relative', overflowWrap: 'break-word', wordBreak: 'break-all'}}>
                    {trashcans.find((tc) => tc.id === openMarkerId)?.detailAddress}
                  </div>
                )}

                <div style={{ marginLeft: '5px', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                  {trashcans.find((tc) => tc.id === openMarkerId)?.address}
                </div>

                <div style={{ marginLeft: '5px', fontSize: '14px', color: 'gray', marginBottom: '10px', bottom: '30px', position: 'absolute' }}>
                  <a style={{ fontWeight:'bold' }}>{trashcans.find((tc) => tc.id === openMarkerId)?.nickname}</a>님 께서 발견!
                </div>

                <div style = {{display: 'flex', bottom: '10px', position: 'absolute'}}>
                  {trashcans.find((tc) => tc.id === openMarkerId)?.categories === 'general' && (
                    <CATEGORY  mode="일반쓰레기" ></CATEGORY>
                  )}
            
                  {trashcans.find((tc) => tc.id === openMarkerId)?.categories === 'both' && (
                    <>
                      <CATEGORY  mode="일반쓰레기" ></CATEGORY>
                      <CATEGORY  mode="재활용" ></CATEGORY>
                    </>
                  )}
                </div>
            </div>

            <div className = "Trashcan">
              <div className = "TrashcanIMG" style = {{float: 'right', position: 'absolute', right: '10px', marginLeft:'20px'}}>
                <a href={trashcans.find((tc) => tc.id === openMarkerId)?.roadviewImgpath} target="_blank">
                  <img
                    src={trashcans.find((tc) => tc.id === openMarkerId)?.roadviewImgpath}
                    alt="쓰레기통"
                    width="100px"
                    height="100px"
                    style={{
                      display: 'block', // 이미지를 블록 요소로 설정
                      paddingBottom: '30px', // 이미지 아래에 여유 공간 추가
                      marginLeft: '10px', // 이미지와 텍스트 사이 여백 추가
                    }}
                  />
                </a>
              </div>

              <div className = "ReportBTN" style={{bottom: '10px', right: '10px', position: 'absolute', float: 'right'}}>
                <div
                  style={{
                    display: 'block', // 버튼을 블록 요소로 설정
                      padding: '8px 16px',
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '37px',
                      fontSize: '12px',
                      width: 'fit-content', // 내용에 맞게 너비를 조정
                      bottom: '0px'
                  }}
                >
                  <a style={{verticalAlign: 'middle', marginRight: '3px'}}>{reportCount}</a>
                  <img
                    src="Siren.svg" // 이미지 경로
                    alt="button image" // 대체 텍스트
                    width="14px" // 이미지 너비
                    height="14px" // 이미지 높이
                    style={{verticalAlign: 'middle'}}
                  />
                </div>
              </div>
            </div>
            </div>
          </CustomOverlayMap>
          )}
      </Map>
    </div>
  );
}

export { PC };