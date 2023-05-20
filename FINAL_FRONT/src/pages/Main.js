import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MainCSS from "../components/main/Main.css";
import {  callGoToWorkAPI, callEndWorkAPI, callOutWorkAPI, callReturnWorkAPI } from '../apis/MyPageAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { callNoticeListAPI, callNoticeSearchListAPI } from '../apis/NoticeAPICalls';


const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}

function Main() {
  //


  //

  const {data} = useSelector(state => state.noticeReducer);
  const notices = useSelector(state => state.noticeReducer);
  const noticeList = notices.data;
  const pageInfo = notices.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);

  /* 검색어 요청시 사용할 값 */
  const [searchParams] = useSearchParams();
  const search = searchParams.get('value');


  useEffect(
      () => {
          if(search) {
              /* 검색어에 해당하는 게시글에 대한 요청 */
              dispatch(callNoticeSearchListAPI({ search, currentPage }));
          } else {
              /* 모든 게시들에 대한 요청 */
              dispatch(callNoticeListAPI
                ({ currentPage }));
          }
          
      },
      [currentPage, search]
  );

  const dispatch = useDispatch();

  const { time, endTime,outTime,returnTime} = useSelector(state => state.myPageReducer);

  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const date = new Date(time)
  const goToWorkDate = getDate(date)
  const goToWorkTime = `${date.getHours()}:${date.getMinutes()}`

  const endDate = new Date(endTime)
  const endWorkDate = getDate(endDate)
  const endWorkTime = `${endDate.getHours()}:${endDate.getMinutes()}`

  const outDate = new Date(outTime)
  const outWorkDate = getDate(outDate)
  const outWorkTime = `${outDate.getHours()}:${outDate.getMinutes()}`

  const returnDate = new Date(returnTime)
  const returnWorkDate = getDate(returnDate)
  const returnWorkTime = `${returnDate.getHours()}:${returnDate.getMinutes()}`


  const handleWorknClick = () => {
    dispatch(callGoToWorkAPI({id: 6}))
  }

  const handleEndOnClick = () => {
    dispatch(callEndWorkAPI({id: 6}))
  }

  const handleOutOnClick = () => {
    dispatch(callOutWorkAPI({id: 6}))
  }

  const handleReturnOnClick = () => {
    dispatch(callReturnWorkAPI({id: 6}))
  }

  useEffect(() => {  
    const fetchWeatherData = async () => {
      const lat = 37.5665; // 위도ㅇㅇㅇ
      const lon = 126.9780; // 경도
      const apiKey = 'b97fbbf82b4825a7a84c60e92fa201b6'; // OpenWeatherMap API 키

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNewsData = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'kr', // 검색할 국가 코드 (한국: kr)
            category: 'sports', // 검색할 기사 카테고리 (스포츠: sports)
            apiKey: '8e9a4d3df9d24d199a8a89fc8c0db7b6', // 자신의 NewsAPI API 키로 대체해야 함
          },
        });
        setNewsData(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
    fetchNewsData();
  }, []);

  const Weather = () => {
    if (!weatherData) {
      return <div className="loading-text">날씨를 불러오는 중이에요 😚</div>;
    }
    const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2); // 섭씨로 변환 후 소수점 둘째 자리까지 표시

    return (
      <div className="weather" style={{ flex: 1 }}>
        <div className="weather-text">
          <span role="img" aria-label="weather-icon">🌤</span> 오늘의 날씨는 <b>{weatherData.weather[0].description}</b>이에요~
          <span role="img" aria-label="temperature-icon">✨</span> 온도는 <b>{temperatureCelsius}℃</b>입니다.
        </div>
      </div>
    );
  };

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const snowflakes = useRef([]);

  const createSnowflake = () => {
    const x = Math.random() * canvasRef.current.width;
    const y = 0;
    const speed = Math.random() * 3 + 2; // Adjust speed here
    const radius = Math.random() * 4 + 1; // Adjust size here

    snowflakes.current.push({ x, y, speed, radius });
  }

  // ... previous code ...

  const imageOnLoad = () => {
    resize();

    // Initialize snowflakes after image has been loaded
    for (let i = 0; i < 100; i++) {
      createSnowflake();
    }

    animate();
  }

  const drawSnowflake = (snowflake) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  const updateSnowflake = (snowflake) => {
    snowflake.y += snowflake.speed;

    if (snowflake.y > canvasRef.current.height) {
        snowflake.y = 0;
    }
  }

  const animate = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    snowflakes.current.forEach((snowflake) => {
        drawSnowflake(snowflake);
        updateSnowflake(snowflake);
    });

    requestAnimationFrame(animate);
}


  const resize = () => {
    canvasRef.current.width = imageRef.current.width;
    canvasRef.current.height = imageRef.current.height;
  }

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
        createSnowflake();
    }
    animate();
    window.addEventListener('resize', resize);
    return () => {
        window.removeEventListener('resize', resize);
    }
}, []); // 의존성 배열을 빈 배열로 설정

  return (
    <div className={MainCSS}>
      <div style={{ display: "flex" }}>
        <Weather /> {/* Weather 컴포넌트 사용 */}
        {/* 나머지 코드 */}
      </div>
      <div className="todo1" style={{ flex: 1 }}>
        <div className="todoText1">🗓 할 일</div>
        <div className="todoText0">3</div>
        <div className="todoNumber1">뉴뉴뉴</div>
      </div>
      <div className="All">
        <div className="todo2" style={{ flex: 1 }}>
          <div className="todoText2">A 구역 리프트 점검</div>
          <div className="todoMinibar1">진행중</div>
          <div className="todoMinibar2">장치관리</div>
          <div className="todoMinibar3">물청소</div>
        </div>
        <div className="todo3" style={{ flex: 1 }}>
          <div className="todoText3">파트너 관리 교육</div>
          <div className="todoMinibar4">완료</div>
          <div className="todoMinibar5">리프트 교육</div>
          <div className="todoMinibar6">관리</div>
        </div>
      </div>
      <div className="board" style={{ display: "flex", flex: 1 }}>
        <div className="notic" style={{ flex: 1 }}>공지사항</div>
        <div className="noticNemo"></div>
        <div className="boardMinibar1">
          <div className="notic1">

          
          <div className="notic2">
  {data && data.map((notice) => (  
    <tr key={notice.noticeCode}>
      <th><li>{notice.noticeTitle}</li></th>
      <div className={`circle${notice.noticeCode}`}></div>
      <th>new!</th>
    </tr>
  ))}
</div>


                                
          </div>
        </div>
      </div>
      <div className="boardMinibar2">
        <div className="circle10">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[0].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic3">

        </div>
        <div className="circle11">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[1].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic4">


        </div>

        <div className="circle12">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[2].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic5">


        </div>
        <img className="BoradImg" src="image/image 434.png" alt="Board Image" />
      </div>
      <div className="partBoard" style={{ flex: 1 }}>Strato News<div class="animated-news">💡</div></div>
      <div className="att">



            </div>

                

            <div className="edu">
                <div class="edutitle1">내가 해야 할 </div>
                <div class="educircle1"></div><div class="edutitle2">화재 교육</div>
                <img className="img1" src="image/image 188.png"/>
                <div class="ing">진행중</div>
               </div>


      <div className="news">
        <div className="mapText">
           우리 스키장 한 눈에 보기
        </div>
       
      <div id="map-container">
            <canvas id="snow-canvas" ref={canvasRef}></canvas>
            <img id="map-image" ref={imageRef} src="image/스키장.png" alt="Map" onLoad={resize} />
            <div className="info-container" style={{ position: 'absolute', top: '100px', left: '20px' }}>
                <div className="circle" style={{paddingTop: "5px", boxSizing: "border-box"}}>
                 
                ⚪
                    <div className="info-popup">안전교육장</div>
                </div>
            </div>
            <div className="info-container" style={{ position: 'absolute', top: '250px', left: '150px' }}>
                <div className="circle" style={{paddingTop: "5px", boxSizing: "border-box"}}>
                ⚪
                    <div className="info-popup">스케이트장</div>
                </div>
            </div>
            <div className="info-container" style={{ position: 'absolute', top: '130px', left: '200px' }}>
                <div className="circle" style={{paddingTop: "5px", boxSizing: "border-box"}}>
                ⚪
                    <div className="info-popup">식당</div>
                </div>
            </div>
            <div className="info-container" style={{ position: 'absolute', top: '150px', left: '350px' }}>
                <div className="circle" style={{paddingTop: "5px", boxSizing: "border-box"}}>
                    ⚪                <div className="info-popup">장비대여관</div>
                </div>
            </div>
            <div className="info-container" style={{ position: 'absolute', top: '120px', left: '450px' }}>
                <div className="circle" style={{paddingTop: "5px", boxSizing: "border-box"}}>
                    ⚪                <div className="info-popup">휴게실</div>
                </div>
            </div>
        </div>

        </div>
    </div>
    );

  }
export default Main;