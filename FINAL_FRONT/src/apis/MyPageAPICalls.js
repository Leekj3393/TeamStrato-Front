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

// 마이페이지 멤버 조회
export const callMyPageMemberAPI = ({ id = 0 }) => {
  const reqeustURL = `${PRE_URL}/members/${id}`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(reqeustURL);
      const result = await response.json();

      if (response.status === 200) {
        console.log('Member data:', result.data.membersData); // 로그 추가
        dispatch({ type: 'MyPage/GET_MY_MEMBERS', payload: { membersData: result.data } });
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


export const callGoToWorkAPI = ({id = 0}) => {
  const requestURL = `${PRE_URL}/attendance/${id}`;


  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {method: 'POST'});
      // const result = await response.json();

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/POST_GO_TO_WORK', payload: {time: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


export const callEndWorkAPI = ({id = 0}) => {
  const requestURL = `${PRE_URL}/attendance/endTime/${id}`;

  const endTime = new Date().toISOString();

  return async (dispatch, getState) => {
    try {
      console.log(requestURL)

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endTime }),  // 서버에 퇴근 시간을 전달
      });

      if (response.status === 200) {
        dispatch({type: 'MyPage/END_WORK', payload: {endTime}});  // 리듀서에 퇴근 시간을 전달
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
    }
  };



};

export const callOutWorkAPI = ({id = 0}) => {
  const requestURL = `${PRE_URL}/attendance/outTime/${id}`;

  const outTime = new Date().toISOString();

  return async (dispatch, getState) => {
    try {
      console.log(requestURL)

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ outTime }),  // 서버에 퇴근 시간을 전달
      });

      if (response.status === 200) {
        dispatch({type: 'MyPage/OUT_WORK', payload: {outTime}});  // 리듀서에 퇴근 시간을 전달
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
    }
  };
};



export const callReturnWorkAPI = ({id = 0}) => {
  const requestURL = `${PRE_URL}/attendance/returnTime/${id}`;

  const returnTime = new Date().toISOString();

  return async (dispatch, getState) => {
    try {
      console.log(requestURL)

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ outTime }),  // 서버에 퇴근 시간을 전달
      });

      if (response.status === 200) {
        dispatch({type: 'MyPage/RETURN_WORK', payload: {returnTime}});  // 리듀서에 퇴근 시간을 전달
      }

      console.log(response)
    } catch (error) {
      console.log(error)
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




export const callInsertRequestAPI = ({id = 0,requestReason, requestStart, requestEnd}) => {
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
          requsetType: "some type"
        }),
      });

      if (response.status === 200) {
        console.log('response', response)
        dispatch({type: 'MyPage/INSERT_REQUEST', payload: {selectedDates1}});  // 리듀서에 퇴근 시간을 전달
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
    }
  };
};


