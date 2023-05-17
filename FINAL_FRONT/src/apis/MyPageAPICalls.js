// MyPageAPICalls.js
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/myPage`;

//카운
export const callMyPageAPI = () => {
  const requestURL = `${PRE_URL}/membersAll`;


  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL);
      const result = await response.json();

      if (response.status === 200) {
        // 요부분 타입은 만든 액션으로 바꾸기 
        dispatch({type: 'MyPage/GET_MEMBERS_ALL', payload: {totalMemberCount: result.data.totalMemberCount}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

// 마이페이지 기본 정보 조회
export const callMyPageMemberAPI = () => {
  const reqeustURL = `${PRE_URL}/membersInfo`;

  return async (dispatch, getState) => {

    const response = await fetch(reqeustURL,{
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
      }
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_MEMBERS', payload: { membersData: result.data } });
    }
  };
};

export const callDocuMember = () => {
  const requestURL = `${PRE_URL}/request`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL);
      const result = await response.json();

      if (response.status === 200) {
        console.log('memberRequest:', result); // 로그 추가
        dispatch({ type: 'request/GET_DOCU_REQUEST_MEMBER', payload: { memberRequest: result } });
      }

      // 여기서 Promise를 반환합니다.
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to fetch member list:', error);
      // 에러 발생 시에도 Promise를 반환합니다.
      return Promise.reject(error);
    }
  };
};



//로그인 된 사람의 정보로 출근하기
export const callGoToWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/POST_GO_TO_WORK', payload: {time: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


//로그인 된 사람의 정보로 퇴근하기
export const callEndWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/endTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/END_WORK', payload: {endTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


//외출
export const callOutWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/outTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/OUT_WORK', payload: {outTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

//복귀
export const callReturnWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/returnTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/RETURN_WORK', payload: {returnTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

//정보수정
export const updateMemberAPI = ({ id = 0, phone }) => {
  const modifyURL = `${PRE_URL}/members/modify/${id}`;

  return async (dispatch, getState) => {
    try {
      console.log(modifyURL);

      const response = await fetch(modifyURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          phone,
        }),
      });

      if (response.status === 200) {
        console.log('response', response);
        dispatch({ type: 'MyPage/PUT_MODIFY_MYMEMBER', payload: { phone } }); // 리듀서에 수정된 휴대폰 번호 전달
      }
    } catch (error) {
      console.log(error);
      console.error('Failed to update member:', error);
    }
  };
};


//리퀘스트 전체조회
export const callMyPageAllRequestAPI = () => {
  const reqeustURL = `${PRE_URL}/request`;

  return async (dispatch, getState) => {

    const response = await fetch(reqeustURL,{
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
      }
    });

    const result = await response.json();

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_ALL_REQUEST', payload: { getAllRequest: result.data } });
    }
  };
};



export const callInsertRequestAPI = ({id = 0,requestReason, requestStart, requestEnd, requestType}) => {
  const requestURL = `${PRE_URL}/request/insert/${id}`;
  const selectedDates1 = new Date().toISOString();

  return async (dispatch, getState) => {
    try {
      console.log(requestURL)

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          requestReason,
          requestStart,
          requestEnd,
          requsetType: requestType
        }),
      });

      if (response.ok) {  
        console.log('response', response)
        dispatch({type: 'MyPage/INSERT_REQUEST', payload: {selectedDates1}});  
        alert(requestType + ' 완료되었습니다');
      } else {  
        const message = await response.text();
        alert(message);
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
    }
  };
};




//출근한 정보 얻어오기
export const callWorkInfoAPI = () => {
  const requestURL = `${PRE_URL}/workInfo`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // result는 fetch 호출에서 반환된 응답의 내용을 담는 변수입니다.
        const result = await response.json();

        // workInfo는 result를 파싱한 결과를 담는 변수입니다.
        const workInfo = result; //이 부분은 실제 응답 형식에 맞게 수정해야 합니다.

        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/GET_INFO_WORK', payload: {workInfo}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};