import { createActions, handleActions } from 'redux-actions';

// 리덕스는 공통의 저장공간
// 에이피아이 호출한걸 단순히 리덕스에 담고 불러오는 모듈

// Initial state
const initialState = {
  totalMemberCount: 0,
  time: '',
  endTime:'',
  membersData:'',
  workInfo:'',
  memberRequest:'',
  getAllRequest:''
};

// Action types
const GET_MEMBERS_ALL = 'MyPage/GET_MEMBERS_ALL';

const GET_MY_MEMBERS = 'MyPage/GET_MY_MEMBERS';
const PUT_MODIFY_MYMEMBER =  'MyPage/PUT_MODIFY_MYMEMBER';

//docu
const GET_DOCU_REQUEST_MEMBER ='request/GET_DOCU_REQUEST_MEMBER';
const GET_ALL_REQUEST = 'MyPage/GET_ALL_REQUEST';

const POST_GO_TO_WORK = 'MyPage/POST_GO_TO_WORK';
const POST_END_WORK = 'MyPage/END_WORK';
const POST_OUT_WORK = 'MyPage/OUT_WORK';
const POST_RETURN_WORK = 'MyPage/RETURN_WORK';
const GET_INFO_WORK ='MyPage/GET_INFO_WORK';



const POST_INSERT_REQUEST = 'MyPage/INSERT_REQUEST';

// Action creators
export const data = createActions({

  [GET_ALL_REQUEST]: (getAllRequest) => {
    console.log(getAllRequest)
    return ({ getAllRequest })
  }, 

    [GET_DOCU_REQUEST_MEMBER]: (memberRequest) => {
    console.log(memberRequest)
    return ({ memberRequest })
  }, 

  [GET_MEMBERS_ALL]: (totalMemberCount) => {
    console.log(totalMemberCount)
    return ({ totalMemberCount })
  }, 

  [GET_MY_MEMBERS]: (membersData) => {
    console.log('action_GET_MY_MEMBERS', membersData)
    return ({membersData})
  },

  [PUT_MODIFY_MYMEMBER]: (phone) => {
    console.log(phone);
    return { phone };
  },

  [GET_INFO_WORK] : (workInfo) => {
    return {workInfo};
  },

  [POST_GO_TO_WORK]: (data) => {
    console.log(data)
    return ({})
  },


  [POST_INSERT_REQUEST]: (selectedDates1) => {
    console.log(selectedDates1)
    return ({selectedDates1})
  },

  [POST_END_WORK]: (endTime) => {
    console.log(endTime)

    return ({endTime})
  },
  [POST_OUT_WORK]: (outTime) => {

    return ({outTime})
  },
  [POST_RETURN_WORK]: (returnTime) => {

    return ({returnTime})
  }
});

// Reducer
const myPageReducer = handleActions(
  {

    [GET_ALL_REQUEST]: (state, { payload: { getAllRequest } }) => {
      console.log('모듈 getAllRequest:', getAllRequest);
      return {
        ...state,
        getAllRequest,
      };
    },

    [GET_MEMBERS_ALL]: (state, {payload: {totalMemberCount}}) => {
      return ({
      ...state,
      totalMemberCount,
      })
    },

    [GET_DOCU_REQUEST_MEMBER]: (state, { payload: { memberRequest } }) => {
      console.log('모듈 memberRequest:', memberRequest);
      return {
        ...state,
        memberRequest,
      };
    },
    //회원의 정보를 조회하는거 이렇게 하는게 맞나
    [GET_MY_MEMBERS]: (state, {payload: {membersData}}) => {
      console.log('GET_MY_MEMBERS', membersData)
      return ({
      ...state,
      membersData,
      })
    },

    [PUT_MODIFY_MYMEMBER]: (state, { payload: { phone } }) => {
      console.log('GET_MY_MEMBERS', phone)
      return {
        ...state,
        membersData: {
          ...state.membersData,
          phone: phone,
        },
      };
    },

    [GET_INFO_WORK] :(state, {payload : { workInfo}}) =>{
      return{
        ...state,
        workInfo,
      }
    },
  

    [POST_GO_TO_WORK]: (state, {payload: {time}}) => {
      return ({
        ...state,
        time,
      })
    },

    [POST_END_WORK]: (state, {payload: {endTime}}) => {
      return ({
        ...state,
        endTime,
      })
    },

    [POST_OUT_WORK]: (state, {payload: {outTime}}) => {
      return ({
        ...state,
        outTime,
      })
    },
    [POST_RETURN_WORK]: (state, {payload: {returnTime}}) => {
      return ({
        ...state,
        returnTime,
      })
    },
    [POST_INSERT_REQUEST]: (state, {payload: {selectedDates1}}) => {
      return ({
        ...state,
        selectedDates1,
      })
    },
  },
  initialState
);




export default myPageReducer;