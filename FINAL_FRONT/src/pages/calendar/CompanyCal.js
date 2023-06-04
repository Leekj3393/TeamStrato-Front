import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarCss from '../../components/calendar/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callCalendarAPI, callCompanyCalAPI } from '../../apis/CalendarAPICalls';
import DeptInsertModal from "./DeptInsertModal";
import CalendarUpdateModal from './UpdateModal';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarDeptUpdateModal from './DeptUpdateModal';

function CompanyCal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode);
  const department = useSelector(state => state.myPageReducer.membersData.department);
  const { companycal } = useSelector((state) => state.calendarReducer);
  const [calUpdateModalOpen, setUpdateCalendarModalOpen] = useState(false);
  const [calModalOpen, setCalendarModalOpen] = useState(false);
  const [calendarCode, setCalendarCode] = useState(null);
  const isAdmin = true; /* 권한 추가시 const [isAdmin, setIsAdmin] = useState(false); 로 수정하고,
                          useEffect(() => {
  // 로그인 정보에서 isAdmin 값을 확인하고 업데이트
  const isAdminUser = // 로그인 정보에서 isAdmin 값 확인하는 로직
  setIsAdmin(isAdminUser); 추가
}, []); */

  // const [state, setState] = useState({
  //   department: department, // 현재 로그인된 객체의 memberCode로 설정
  //   division: '부서',
  // });

  const [state, setState] = useState({
    memberCode: loggedInMember, // 현재 로그인된 객체의 memberCode로 설정
    division: "부서",
    deptCode: department?.deptCode,
  });

  console.log("state에는 뭐가 있나: ", state);
  console.log("department에는 뭐가 있나: ", department);
  if (department) {
    console.log("현재 로그인 유저의 부서 deptCode : ", department.deptCode);
    console.log("현재 로그인 유저의 부서 이름 : ", department.deptName);
  }
  console.log("현재 로그인 유저의 코드 : ", loggedInMember);

  useEffect(() => {
    if (department) { // loggedInMember가 정의되어 있는지 확인
      setState(prevState => ({
        ...prevState,
        department: department, // 로그인 정보가 변경되면 dpteCode를 업데이트
      }));
    }
  }, [department]);

  const personalCalClick = () => {
    navigate("/calendar");
  };

  useEffect(() => {
    dispatch(callCompanyCalAPI(state));
  }, [dispatch, state]);

  console.log("state : ", state);

  const companyCalClick = () => {
    dispatch(callCompanyCalAPI(state));
  };
  console.log("캘린더 정보 calendarReducer : ", companycal);

  const InsertCalClick = () => {
    setCalendarModalOpen(true);
  };

  const eventClickHandler = (e) => {
    const calendarCode = e.event.id;
    console.log("event = ", e.event);
    console.log("calendarCode = ", calendarCode);
    setCalendarCode(calendarCode); // calendarCode 상태 업데이트
    setUpdateCalendarModalOpen(true); // 모달창 열기
  };

  return (
    <>
      <div>
        {calModalOpen &&
          <div>
            <DeptInsertModal
              department={department}
              setCalendarModalOpen={setCalendarModalOpen}
            />
          </div>}
      </div>
      <div>
        {calUpdateModalOpen &&
          <div>
            <CalendarDeptUpdateModal
              department={department}
              setUpdateCalendarModalOpen={setUpdateCalendarModalOpen}
              calendarCode={calendarCode}
            />
          </div>}
      </div>

      <div className={CalendarCss}>
        <div className='personalCal' onClick={personalCalClick}>개인</div>
        <div className='companyCal' onClick={companyCalClick} style={{ backgroundColor: '#2A4090', color: 'white' }}>부서</div>
        <div className='insertSch' onClick={InsertCalClick}>일정등록</div>
        <div id='Calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            height={770}
            events={companycal && companycal.map((department) => ({
              id: department.calendarCode,
              title: department.title,
              start: department.start,
              end: department.end,
              color: department.color
            }))}
            eventClick={isAdmin ? (e) => eventClickHandler(e) : null}
          />
        </div>
      </div>
    </>
  );
}

export default CompanyCal;
