// MyPageAPICalls.js
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/myPage`;

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

//멤버 상세페이지 조회 이렇게 멤버 상세 조회해야하는데요
// 이거 쓰는데가 없어요 아

export const callMyPageMemberAPI = ({id = 0}) => {

  const reqeustURL = `${PRE_URL}/members/${id}`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(reqeustURL);
      const result = await response.json();

      if (response.status === 200) {
        // 요부분 타입은 만든 액션으로 바꾸기 
        dispatch({type: 'MyPage/GET_MY_MEMBERS', payload: {membersData: result.data.membersData}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }

  }
}

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
        // 내려오는 데이터가 없으면 여기가 필요없어서요 아 네 맞아요  ! 
        //내려오는데이터가 이미 있어야 하는데이터 말인가요?
        // 원하시는게 조회+수정아니였나요? 아 맞아요!! 맞아요 데이터 아직 안넣어서
        //시간이 없을거 같아서 일단 insert만 해보려고 한거였어요!! 지금 전 조회하는줄 알았네요 휴ㅡ뮤.ㅠㅠㅠ 어엇 ㅠㅠ 
        // 빠르게 신청눌렀을때 기능 만들어볼게요 
        dispatch({type: 'MyPage/INSERT_REQUEST', payload: {selectedDates1}});  // 리듀서에 퇴근 시간을 전달
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
    }
  };
};


