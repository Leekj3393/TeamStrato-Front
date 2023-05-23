import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarCss from '../../components/calendar/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callCalendarAPI, callCompanyCalAPI } from '../../apis/CalendarAPICalls';

function CompanyCal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.department.deptCode);
  const {companycal} = useSelector((state) => state.calendarReducer);

  const [state, setState] = useState({
    deptCode: loggedInMember, // 현재 로그인된 객체의 memberCode로 설정
    division: '2'
  });

  console.log("현재 로그인 유저의 부서 deptCode : ",loggedInMember);

  useEffect(() => {
    if (loggedInMember) { // loggedInMember가 정의되어 있는지 확인
      setState(prevState => ({
        ...prevState,
        deptCode: loggedInMember, // 로그인 정보가 변경되면 memberCode를 업데이트
      }));
    }
  }, [loggedInMember]);


  const personalCalClick = () => {
    navigate('/calendar');
  };

  useEffect(() => {
    dispatch(callCompanyCalAPI(state));
  }, []);

  console.log("state : ",state);

  const companyCalClick = () => {
    dispatch(callCompanyCalAPI(state));
  };
  console.log("캘린더 정보 calendarReducer : ", companycal);
    return(

    <div className={CalendarCss} >
        <div className='personalCal' onClick={ personalCalClick }>개인</div>
        <div className='companyCal' onClick={ companyCalClick } style={ {backgroundColor: 'skyblue'} }>부서</div>
        <div className='insertSch'>일정등록</div>
        <div id='Calendar'>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height={770}
        events={companycal && companycal.map((deptCode) => ({
          title: deptCode.title,
          start: deptCode.start,
          end: deptCode.end,
          color: deptCode.color
       }))}
        
      />
      </div>
    </div>
  );
}

export default CompanyCal;