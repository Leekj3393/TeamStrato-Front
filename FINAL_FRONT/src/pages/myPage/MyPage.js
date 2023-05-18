import MyPageCSS from '../../components/main/MyPage.css';
import React, { useState, useEffect } from 'react';
import { callMyPageAPI, callGoToWorkAPI, callEndWorkAPI, callOutWorkAPI, callReturnWorkAPI, callMyPageMemberAPI, updateMemberAPI, callWorkInfoAPI } from '../../apis/MyPageAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, differenceInMonths } from 'date-fns';


const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}


function MyPage() {
  const dispatch = useDispatch();
  const membersData = useSelector(state => state.myPageReducer.membersData);
  const workInfo = useSelector(state => state.myPageReducer.workInfo);
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState(membersData ? membersData.phone : '');

  console.log("membersData",membersData); //여기로 조회해오게
  console.log("workInfo",workInfo);

  useEffect(() => {
    dispatch(callMyPageAPI());
    dispatch(callMyPageMemberAPI());
    dispatch(callWorkInfoAPI());
  }, []);



  const handlePhoneClick = () => {
    setEditMode(true);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpdateClick = () => {
    const updatedData = {
      id: 1,
      phone,
    };
    dispatch(updateMemberAPI(updatedData));
    setEditMode(false);
  };

  

  //useSelector를 사용해서 화면에 데이터를 보여주기 
  // 추가적으로 지금 여러 리듀서가 있어서 만든 리듀서만 가져오도록 한 로직
  
  const {totalMemberCount, time, endTime,outTime,returnTime} = useSelector(state => state.myPageReducer);
  const [activeModal, setActiveModal] = useState(null);


  

  const date = workInfo && workInfo[0] && workInfo[0].startTime ? new Date(workInfo[0].startTime) : null;
  const goToWorkDate = date ? getDate(date) : '';
  const goToWorkTime = date ? `${date.getHours()}:${date.getMinutes()}` : '';

  const endDate = workInfo && workInfo[0] && workInfo[0].endTime ? new Date(workInfo[0].endTime) : null;
  const endWorkDate = endDate ? getDate(endDate) : '';
  const endWorkTime = endDate ? `${endDate.getHours()}:${endDate.getMinutes()}` : '';
  
  
  const returnDate = workInfo && workInfo[0] && workInfo[0].returnTime ? new Date(workInfo[0].returnTime) : null;
  const returnWorkDate = returnDate ? getDate(returnDate) : '';
  const returnWorkTime = returnDate ? `${returnDate.getHours()}:${returnDate.getMinutes()}` : '';
  
  
  const outDate = workInfo && workInfo[0] && workInfo[0].outTime ? new Date(workInfo[0].outTime) : null;
  const outWorkDate = outDate ? getDate(outDate) : '';
  const outWorkTime = outDate ? `${outDate.getHours()}:${outDate.getMinutes()}` : '';
  
  
  // const endDate = new Date(endTime)
  // const endWorkDate = getDate(endDate)
  // const endWorkTime = `${endDate.getHours()}:${endDate.getMinutes()}`

  // const outDate = new Date(outTime)
  // const outWorkDate = getDate(outDate)
  // const outWorkTime = `${outDate.getHours()}:${outDate.getMinutes()}`

  // const returnDate = new Date(returnTime)
  // const returnWorkDate = getDate(returnDate)
  // const returnWorkTime = `${returnDate.getHours()}:${returnDate.getMinutes()}`
  
  //근속 시간 계산
  const hireDate = membersData ? parseISO(membersData.memberHireDate) : null;
  const currentDate = new Date();
  const duration = hireDate ? differenceInMonths(currentDate, hireDate) : null;
  
  const years = Math.floor(duration / 12);
const months = duration % 12;

console.log("Duration:", duration);
console.log("Years:", years);
console.log("Months:", months);

  
  const openModal = (modalIndex) => {
    setActiveModal(modalIndex);
  };

  const closeModal = () => {
    setActiveModal(null);
  };


  const handleWorknClick = () => {
    dispatch(callGoToWorkAPI())
  }
  

  const handleEndOnClick = () => {
    dispatch(callEndWorkAPI())
  }

  const handleOutOnClick = () => {
    dispatch(callOutWorkAPI())
  }

  const handleReturnOnClick = () => {
    dispatch(callReturnWorkAPI())
  }

    return (
        <div className={MyPageCSS}>
            <div className="employeetitle">
                <div class="employeeStatus">
                Strato 직원 현황
                </div>
                <div class="employeeAll">
                전체 직원: {totalMemberCount}명
                </div>

                <div class="Explanation">
                자신의 업무에 맞게 필요한 직원을 검색하고 확인해 보세요!<br/>
                스카이리프트는 빠르게 직원을 검색하고 찾을 수 있습니다.
                </div>
                <div class="work">
                <div class="workTitle" onClick={handleWorknClick}>
                    출근하기
                </div>
                <img className="workImg" src="image/image 416.png"/>
                <div class="workNemo">
                <div class="workNemoTitle1">{goToWorkDate}</div> 
                <div class="workNemoTitle2">{goToWorkTime}</div>
                </div>
            </div>

            <div class="getoffwork">
                <div class="getoffworkTitle" onClick={handleEndOnClick}>
                    퇴근하기
                </div>
                <img className="getoffworkImg" src="image/image 418.png"/>
                <div class="getoffworkNemo">
                <div class="workNemoTitle1">{endWorkDate  || '' }</div> 
                   <div class="workNemoTitle2">{endWorkTime || '' }</div> 
                    
                </div>
            </div>

            <div class="going">
                <div class="outTitle" onClick={handleOutOnClick}>
                    외출  /
                </div>
                
                <div class="comeTitle" onClick={handleReturnOnClick}>
                    복귀
                </div>
                <img className="goingImg" src="image/image 419.png"/>
                <div class="goingNemo">
                   <div class="returnTitle1">{outWorkDate || ''  }</div> 
                   <div class="returnTitle2">{outWorkTime || ''  }<br/><br/><br/> ~</div> 
                <div class="outTitle1">{returnWorkDate || ''  }</div> 
                   <div class="outTitle2">{returnWorkTime || '' }</div> 
                    
                </div>
            </div>

            </div>
            <div class="employeeMyPage">
                <div class="info">
                    기본 정보
                </div>
                <div class="modi modal-button" onClick={() => openModal(1)}>
                    수정
                </div>
                <div class="vy">
                
                <div class="table">

<table>
  <tr>
    <th>이름 </th>
    <td> {membersData ? membersData.memberName : '직원 정보를 가져오는 중입니다.'}</td>
    <th>성별</th>
    <td>{membersData ? (membersData.gender === 'M' ? '남자' : '여자') : '직원 정보를 가져오는 중입니다.'}</td>

  </tr>
  <tr>
    <th>생년월일</th>
    <td>
  {membersData ? `${membersData.residentNo.slice(0, 4)}년 ${membersData.residentNo.slice(4, 6)}월 ${membersData.residentNo.slice(6, 8)}일` : '직원 정보를 가져오는 중입니다.'}
</td>



    <th>급여 계좌</th>
    <td> {membersData ? membersData.bankName : '직원 정보를 가져오는 중입니다.'} {membersData ? membersData.bankNo : '직원 정보를 가져오는 중입니다.'}</td>
  </tr>
  <tr>
    <th>휴대폰 번호</th>
    <td> {membersData ? membersData.phone : '직원 정보를 가져오는 중입니다.'}</td>
    <th>부서</th>
    <td> {membersData ? membersData.department.deptName : '직원 정보를 가져오는 중입니다.'}</td>

  </tr>
  <tr>
    <th>입사년월일</th>
    <td>
   {membersData ? `${membersData.residentNo.slice(0, 4)}년 ${membersData.residentNo.slice(4, 6)}월 ${membersData.residentNo.slice(6, 8)}일` : '직원 정보를 가져오는 중입니다.'}
</td>

    <th>직급</th>
    <td>{membersData ? membersData.job.jobName : '직원 정보를 가져오는 중입니다.'}</td>
  </tr>
  <tr>
    <th rowspan="2">주소</th>
    <td rowspan="2">{membersData ? membersData.address : '직원 정보를 가져오는 중입니다.'}</td>
    <th>상태</th>
    <td>{membersData ? membersData.memberStatus : '직원 정보를 가져오는 중입니다.'}</td>
  </tr>
  <tr>
    <th>근속 기간</th>
    <td>
    {(workInfo && workInfo.length > 0) ? workInfo[0].status : '사유를 가져오는중입니다.'}


</td>
  </tr>
</table>
                </div>

                </div>
            </div>

            <div className="modalButton">

      <div className="modal-button">
        {activeModal === 1 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={closeModal}>&times;</button>
              <h2>기본 정보 수정하기</h2>
              <h5>수정 할 정보를 클릭하세요. 수정이 안되는 정보는 인사관리자를 통해서 수정 가능합니다.</h5>
                             
                <div class="table2">

                <table>
                <tr>
                    <th>이름</th>
                    <td> {membersData ? membersData.memberName : '직원 정보를 가져오는 중입니다.'}</td>
                    <th>성별</th>
                    <td>{membersData ? (membersData.gender === 'M' ? '남자' : '여자') : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td>  {membersData ? `${membersData.residentNo.slice(0, 4)}년 ${membersData.residentNo.slice(4, 6)}월 ${membersData.residentNo.slice(6, 8)}일` : '직원 정보를 가져오는 중입니다.'}</td>
                    <th>급여 계좌</th>
                    <td> {membersData ? membersData.bankName : '직원 정보를 가져오는 중입니다.'} {membersData ? membersData.bankNo : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                <tr>
                <th>휴대폰 번호</th>
                {editMode ? (
                      <td>
                        <input type="text" value={phone} onChange={handlePhoneChange} />
                      </td>
                    ) : (
                      <td onClick={handlePhoneClick}>{membersData ? membersData.phone : '직원 정보를 가져오는 중입니다.'}</td>
                    )}


                    <th>부서</th>
                    <td> {membersData ? membersData.department.deptName : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                <tr>
                    <th>입사년월일</th>
                    <td>
   {membersData ? `${membersData.residentNo.slice(0, 4)}년 ${membersData.residentNo.slice(4, 6)}월 ${membersData.residentNo.slice(6, 8)}일` : '직원 정보를 가져오는 중입니다.'}
</td>
                    <th>직급</th>
                    <td>{membersData ? membersData.job.jobName : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                <tr>
                    <th rowspan="2">주소</th>
                    <td rowspan="2">{membersData ? membersData.address : '직원 정보를 가져오는 중입니다.'}</td>
                    <th>상태</th>
                    <td>{membersData ? membersData.memberStatus : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                <tr>
                    <th>근속 기간</th>
                    <td>{membersData ? `${years}년 ${months}개월` : '직원 정보를 가져오는 중입니다.'}</td>
                </tr>
                </table>
                </div>
    {editMode && (
                <div class="modiFianl" onClick={handleUpdateClick}>
                수정완료
            </div>
    )}
            </div>
          </div>
        )}
        </div>
</div>
            </div>
    
    );
}

export default MyPage;