import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCSS from "../components/main/Main.css";
import {  callGoToWorkAPI, callEndWorkAPI, callOutWorkAPI, callReturnWorkAPI } from '../apis/MyPageAPICalls';
import { useDispatch, useSelector } from 'react-redux';


const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}

function Main() {

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

  return (
    <div className={MainCSS}>
      <div style={{ display: "flex" }}>
        <Weather /> {/* Weather 컴포넌트 사용 */}
        {/* 나머지 코드 */}
      </div>
      <div className="todo1" style={{ flex: 1 }}>
        <div className="todoText1">할 일</div>
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
            <div className="circle9"></div>
            <div className="notic2">오늘의 부서 회의가 있습니다.</div>
          </div>
        </div>
      </div>
      <div className="boardMinibar2">
        <div className="circle10"></div>
        <div className="notic3">
        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[0].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}
        </div>
        <div className="circle11"></div>
        <div className="notic4">
        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[1].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}

        </div>

        <div className="circle12"></div>
        <div className="notic5">
        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
            <li>{newsData[2].title}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}

        </div>
        <img className="BoradImg" src="image/image 434.png" alt="Board Image" />
      </div>
      <div className="partBoard" style={{ flex: 1 }}>Strato News</div>
      <div className="att">
        <div className="attNemo1">
          <div className="dd" onClick={handleWorknClick}>출근하기</div>
          <img className="imgAtt" src="image/att1.png" alt="Attendance Image" />
        </div>
        <div className="attSubNemo1">
        {goToWorkDate} {goToWorkTime}
                    
                </div>
                


                <div class="attNemo2">
                <div class="dd" onClick={handleEndOnClick}>
                    퇴근하기</div>
                    <img className="imgAtt" src="image/att2.png"/>   
                </div>
                <div class="attSubNemo2">
                {endWorkDate} {endWorkTime}
                    <div class="clock"></div>
                </div>

                <div class="attNemo3">
                <div class="dd" onClick={handleOutOnClick}>
                    외출하기</div>
                    <img className="imgAtt" src="image/att3.png"/>   
                </div>
                <div class="attSubNemo3">
                {outWorkDate} {outWorkTime}
                    <div class="clock">{outWorkTime}</div>
                </div>

                <div class="attNemo4">
                <div class="dd" onClick={handleReturnOnClick}>
                    복귀하기</div>
                    <img className="imgAtt" src="image/att4.png"/>   
                </div>
                <div class="attSubNemo4">
                {returnWorkDate} {returnWorkTime}
                    <div class="clock"></div>
                </div>
                </div>
                

                

            <div className="edu">
                <div class="edutitle1">내가 해야 할 </div>
                <div class="educircle1"></div><div class="edutitle2">화재 교육</div>
                <img className="img1" src="image/image 188.png"/>
                <div class="ing">진행중</div>
               </div>


      <div className="news">
        <div className="cross-container">
          <div className="cross-line"></div>
          <div className="cross-garo"></div>
        </div>
        <div className="tj1">결재문서</div>
        <div className="tjNumber1">1</div>
        <div className="tj2">장비수리</div>
        <div className="tjNumber2">0</div>
        <div className="tj3">기안서</div>
        <div className="tjNumber3">0</div>
        <div className="tj4">장비구매</div>
        <div className="tjNumber4">1</div>
        <img className="grahp" src="image/image 433.png" alt="Graph" />
      </div>
    </div>
    );

  }
export default Main;