import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarCss from '../../components/calendar/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callCalendarAPI } from '../../apis/CalendarAPICalls';

function Calendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode); // 로그인 정보에서 memberCode를 가져옴
  const {calendar} = useSelector((state) => state.calendarReducer);

  const [state, setState] = useState({
    memberCode: loggedInMember, // 현재 로그인된 객체의 memberCode로 설정
  });

  console.log("현재 로그인 memberCode : ",loggedInMember);

  useEffect(() => {
    if (loggedInMember) { // loggedInMember가 정의되어 있는지 확인
      setState(prevState => ({
        ...prevState,
        memberCode: loggedInMember, // 로그인 정보가 변경되면 memberCode를 업데이트
      }));
    }
  }, [loggedInMember]);


  const personalCalClick = () => {
    dispatch(callCalendarAPI(state));
  };

  useEffect(() => {
    dispatch(callCalendarAPI(state));
  }, []);

  console.log("state : ",state);

  const companyCalClick = () => {
    navigate('/calendar/companycal');
  };
  console.log("캘린더 정보 calendarReducer : ", calendar);
    return(

    <div className={CalendarCss} >
        <div className='personalCal' onClick={ personalCalClick } style={ {backgroundColor: 'skyblue'} }>개인</div>
        <div className='companyCal' onClick={ companyCalClick }>부서</div>
        <div className='insertSch'>일정등록</div>
        <div id='Calendar'>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height={770}
        events={calendar && calendar.map((memberCode) => ({
          title: memberCode.title,
          start: memberCode.start,
          end: memberCode.end,
          color: memberCode.color
       }))}
        
      />
      </div>
    </div>
  );
}

export default Calendar;