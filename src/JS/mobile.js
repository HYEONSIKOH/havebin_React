import React, { useState, useEffect, useRef } from 'react';
import { Map, MapMarker, MarkerClusterer} from 'react-kakao-maps-sdk'; // MarkerClusterer 추가
import { CATEGORY } from "../Btn/category.js"
import axios from 'axios';
import { IOS } from '../A2HS/ios.js';
import { ANDROID } from '../A2HS/android.js';

function MOBILE({ url }) {
    const [trashcans, setTrashcans] = useState([]);
    const [center, setCenter] = useState({ lat: 37.514634749, lng: 127.104260695 });
    const [openMarkerId, setOpenMarkerId] = useState(null); // 특정 마커 ID를 위한 상태
    const [reportCount, setReportCount] = useState("-");
    const [showModal, setShowModal] = useState(false);
    const [visibility, setVisibility] = useState(true);
    const [error, setError] = useState(null);
    const [logoImgOn, setLogoImgOn] = useState(true);
    const [safeAreaInsetTop, setSafeAreaInsetTop] = useState('env(safe-area-inset-top)');
    const [myPosition, setMyPosition] = useState({ lat: 37.514634749, lng: 127.104260695 });
    const [test, setTest] = useState(false);
    const [state, setState] = useState({
        center: { lat: 36.83449614920156, lng: 127.17936922961768 },
        panto: false
    })


    // 접속 OS및 기기 확인란
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isiOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches; // true: PWA, false: 브라우저

    const infoWindowRef = useRef(null);
    const [buttonBottom, setButtonBottom] = useState('10px');

    useEffect(() => {
        if (infoWindowRef.current) {
            const infoWindowHeight = infoWindowRef.current.offsetHeight;
            setButtonBottom(`${infoWindowHeight + 5}px`);
            console.log("변경")
        } else {
            setButtonBottom(`calc(10px + env(safe-area-inset-bottom))`);
        }
        console.log(infoWindowRef)
        console.log(buttonBottom)
    }, [openMarkerId, infoWindowRef.current]);

    const handleImageClick = () => {
        showModal !== true ? setShowModal(true): setShowModal(false);
    };

    const handleTest = () => {
        !test ? setTest(true): setTest(false);
    }

    useEffect(() => {
        // DOM 요소 생성
        let div = document.createElement('div');
        // 높이 설정
        div.style.height = 'env(safe-area-inset-top)';
        // DOM 요소를 body에 추가
        document.body.appendChild(div);
        // 계산된 높이 가져오기
        let computedHeight = window.getComputedStyle(div).height;
        // DOM 요소 제거
        document.body.removeChild(div);

        // 계산된 높이가 0인지 확인
        if (computedHeight === '0px') {
            // 0인 경우 safeAreaInsetTop 상태를 10px로 설정
            setSafeAreaInsetTop('10px');
        }
    }, []);

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleLogoImgShowChange = () => {
        logoImgOn ? setLogoImgOn(false) : setLogoImgOn(true);
    }

    // 마커 클릭 핸들러
    const handleMarkerClick = (id) => {
        // 클릭된 마커 ID와 현재 열린 마커 ID가 같다면 닫고, 아니면 해당 마커를 연다.
        if (openMarkerId !== id) {
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
        return openMarkerId === id ? 40 : 40;
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
        navigator.geolocation.getCurrentPosition(handleCenterPosition, handleError);
        navigator.geolocation.watchPosition(handleMyPosition, handleError);
      } else {
        setError("내 위치를 가져올 수 없습니다.");
      }
    
      axios.get(url + 'findTrashcans')
          .then((response) => { setTrashcans(response.data); }) // 데이터를 상태에 저장
          .catch((error) => {
            console.error('Error fetching data: ', error);
            console.log('데이터를 가져오는데 실패했습니다.');
          });

      }, [url]);

    function refresh_Trashcan_Data() {
        console.log("새로고침 중...")
      axios.get(url + 'findTrashcans')
          .then((response) => { setTrashcans(response.data); }) // 데이터를 상태에 저장
          .catch((error) => {
            console.error('Error fetching data: ', error);
            console.log('데이터를 가져오는데 실패했습니다.');
          });
    }

    // 지도의 중심을 바꿔주는 코드
    const handleCenterPosition = position => {
        setState( {center:{
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }});

        console.log("내 위치: ")
        console.log(myPosition)
    };

    const moveCenter = () => {
        test ? setTest(false) : setTest(true);

        if (test) {
            setState( ({
                center: { lat: myPosition.lat + 0.00000003, lng: myPosition.lng + 0.00000003  },
                panto: test
            }));
        } else {
            setState( ({
                center: { lat: myPosition.lat, lng: myPosition.lng  },
                panto: test
            }));
        }

        console.log(state)
    }

    // 내 위치를 바꿔주는 코드
    const handleMyPosition = position => {
        setMyPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

        console.log("내 위치: ")
        console.log(myPosition)
    };
    
    const handleError = error => {
        console.error("Geolocation 정보를 가져올 수 없습니다:", error);
        setError("Geolocation 정보를 가져올 수 없습니다.");
    };

    return (
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: 'calc(100% + env(safe-area-inset-top))',
      }}>
        {/* 상단 좌측 로고*/}
        {/*env(safe-area-inset-top) !== 0 ? 'env(safe-area-inset-top + 10%)' :*/}
          { logoImgOn && (
              <div style={{top: safeAreaInsetTop, left: '10px', position: 'absolute', zIndex: '120'}}>
                  <img src="./logo2.svg" alt="logo" style={{width: '15%', height: '22.5%'}}/>
              </div>
          )}

          {/* 아이폰 (홈 화면에 추가) 버튼 */}
          {isiOS && !isStandalone && (
              <IOS onCloseLogo={() => handleLogoImgShowChange()} onClose={() => setVisibility(false)}/>
          )}

          {/*<ANDROID onCloseLogo={() => handleLogoImgShowChange()} onClose={() => setVisibility(false)} />*/}
          {/* 안드로이드 (APK 다운로드) 버튼 */}
          {isAndroid && visibility && (
              <div> test </div>
          )}

          <div>
              <button
                  onClick={moveCenter}
                  style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      padding: '5px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'absolute',
                      bottom: buttonBottom,
                      left: '10px',
                      zIndex: '50',
                      outline: 'none',
                      webkitTapHighlightColor: 'transparent',
                  }}
              >
                  <img src="./moveCenter.svg" alt="button icon"/>
              </button>
              <button
                  onClick={refresh_Trashcan_Data}
                  style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '9px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'absolute',
                      bottom: buttonBottom,
                      right: '10px',
                      zIndex: '50',
                      outline: 'none',
                      fontWeight: 'bold',
                      webkitTapHighlightColor: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'black'
                  }}
              >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Refresh_icon.svg" width={12} height={12} style={{marginRight: 3}}/>새로고침
              </button>
          </div>

          <Map
              center={state.center}
              style={{
                  width: '100%',
                  height: '100%',
                  zIndex: '0',
              }}
              level={3}
              isPanto={state.panto}
          >
              <MapMarker
                  key={'myPosition'}
                  position={myPosition}
                  image={{
                      src: "position.svg", // 마커 이미지 URL
                      size: {width: 30, height: 40}, // 마커 이미지의 크기 설정
                      options: {offset: {x: 27, y: 27}} // 이미지의 오프셋 설정
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
                size: { width: getMarkerSize(trashcan.id), height: getMarkerSize(trashcan.id) }, // 마커 이미지의 크기 설정
                options: { offset: { x: 10, y: 11 }} // 이미지의 오프셋 설정  
              }}
              onClick={() => handleMarkerClick(trashcan.id)}
            >
            </MapMarker>
          ))}
        </MarkerClusterer>

        {showModal && (
        <div 
          className="modal-container" // 모달 컨테이너에 클래스 추가
          style={{
            position: 'fixed', 
            top: '0', // 화면 상단에 고정
            left: '0', // 화면 왼쪽에 고정
            width: '100vw', // 화면 너비만큼
            height: '100vh', // 화면 높이만큼
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검은색 배경
            zIndex: '50', // 화면 상위에 위치
            display: 'flex', // 자식 요소들을 행 방향으로 배열
            justifyContent: 'center', // 가운데 정렬
            alignItems: 'center', // 수직 가운데 정렬
          }}>

          <div style={{ position: 'absolute', width: '95%', top:'10%', height: '55%'}}> {/* 부모 요소 추가 */}
            <img 
              src={trashcans.find((tc) => tc.id === openMarkerId)?.roadviewImgpath} 
              alt="button image" 
              height={'100%'}
              width={'100%'}
            />
            <button 
              onClick={handleCloseModal}
              className="TrashcanIMG" 
              style={{ 
                float: 'left',
                border: 'none',
                background: 'none',
                padding: 0, 
                zIndex: '2'
              }}>
              <CATEGORY mode="닫기" />
            </button>
          </div>
        </div>
      )}

          {/* 클릭된 마커의 정보창 */}
          {openMarkerId !== null && (
            <div
                ref={infoWindowRef}
                className = "infoWindow"
                style={{
              width: '95%', // 가장 큰 콘텐츠에 맞춰 너비 설정
              height: 'auto', // 자동 높이 설정
              zIndex: '1',
              display: 'flex',
              flexDirection: 'row', // 자식 요소들을 가로 방향으로 배열
              background: 'white',
              padding: '10px',
              //paddingBottom: 'env(safe-area-inset-bottom)',
              border: '1px solid #ccc',
              borderTopLeftRadius: '12px', 
              borderTopRightRadius: '12px',
              position: 'absolute',
              bottom: '0',
              left: '50%', // 마커 이미지 중앙에 표시
              transform: 'translateX(-50%)', // 좌우 중앙 정렬
              //boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', // 그림자 효과
              margin: '0 auto',
            }}
          > 
            <hr style = {{width: '56px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '8px', color: '#727272', margin: '0px',
                          border: '0px', borderTop: '2px solid #727272', borderRadius: '7px 7px 7px 7px' }}/>
            <div className = "info" style = {{float: 'left', width: '60%' ,marginTop:'10px', height:'100%'}}>
              <div style={{ marginLeft: '5px' ,fontSize: '18px', marginBottom: '5px' , fontWeight:"bold"}}>
                {trashcans.find((tc) => tc.id === openMarkerId)?.detailAddress !== '.' && (
                  <div style={{ marginLeft: '5px' ,fontSize: '18px', marginBottom: '5px' , fontWeight:"bold", position:'relative', overflowWrap: 'break-word', wordBreak: 'break-all'}}>
                    {trashcans.find((tc) => tc.id === openMarkerId)?.detailAddress}
                  </div>
                )}
              </div>

              <div style={{ marginLeft: '5px', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                {trashcans.find((tc) => tc.id === openMarkerId)?.address}
              </div>

              <div style={{ marginLeft: '5px', fontSize: '14px', color: 'gray', marginBottom: '10px', position: 'absolute', bottom: 'env(safe-area-inset-bottom)'}}>
                <a style={{ fontWeight:'bold' }}>{trashcans.find((tc) => tc.id === openMarkerId)?.nickname}</a>님 께서 발견!
                <div style = {{display: 'flex', marginTop: '10px'}}>
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
            </div>

            <div className = "Trashcan" style={{width: '40%', float: 'right', marginTop: '10px', marginRight: '5px', height: '100%'}}>
              <button 
                className="TrashcanIMG" 
                style={{ 
                  float: 'right', 
                  border: 'none', 
                  background: 'none', 
                  padding: 0 
                }} 
                onClick={handleImageClick}
              >
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
              </button>

              <div className = "ReportBTN" style={{float: 'right', marginBottom: 'env(safe-area-inset-bottom)'}}>
                <div
                  style={{
                    display: 'block', // 버튼을 블록 요소로 설정
                    padding: '8px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '37px',
                    fontSize: '14px',
                  }}
                >
                  <a style={{verticalAlign: 'middle', marginRight: '3px'}}>{reportCount}</a>
                  <img
                    src="Siren.svg" // 이미지 경로
                    alt="buttonImage" // 대체 텍스트
                    width="14px" // 이미지 너비
                    height="14px" // 이미지 높이
                    style={{verticalAlign: 'middle'}}
                  />
                </div>
              </div>
            </div>
          </div>
          )}
        </Map>
      </div>
    )
}

export { MOBILE };