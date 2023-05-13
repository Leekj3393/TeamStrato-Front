import { createActions, handleActions } from 'redux-actions';

// 리덕스는 공통의 저장공간
// 에이피아이 호출한걸 단순히 리덕스에 담고 불러오는 모듈

// Initial state
const initialState = {
  totalMemberCount: 0,
  time: '',
  endTime:'',
  membersData:''
};

// Action types
const GET_MEMBERS_ALL = 'MyPage/GET_MEMBERS_ALL';
const GET_MY_MEMBERS = 'MyPage/GET_MY_MEMBERS'
const POST_GO_TO_WORK = 'MyPage/POST_GO_TO_WORK';
const PATCH_END_WORK = 'MyPage/END_WORK';

// Action creators
export const data = createActions({
  [GET_MEMBERS_ALL]: (totalMemberCount) => {
    console.log(totalMemberCount)
    return ({ totalMemberCount })
  }, 

  [GET_MY_MEMBERS]: (membersData) => {
    console.log(membersData)
    return ({membersData})
  },

  [POST_GO_TO_WORK]: (data) => {
    console.log(data)
    return ({})
  },

  [PATCH_END_WORK]: (endTime) => {
    console.log(endTime)
    return ({})
  }
});

// Reducer
const myPageReducer = handleActions(
  {
    [GET_MEMBERS_ALL]: (state, {payload: {totalMemberCount}}) => {
      return ({
      ...state,
      totalMemberCount,
      })
    },

    [GET_MY_MEMBERS]: (state, {payload: {membersData}}) => {
      return ({
      ...state,
      membersData,
      })
    },

    [POST_GO_TO_WORK]: (state, {payload: {time}}) => {
      return ({
        ...state,
        time,
      })
    },
    [PATCH_END_WORK]: (state, {payload: {endTime}}) => {
      return ({
        ...state,
        endTime,
      })
    },
  },
  initialState
);


export default myPageReducer;