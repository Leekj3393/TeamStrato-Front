import { createActions, handleActions } from 'redux-actions';

// Initial state
// Initial state
const initialState = {
    getMyNotice: '',  // or '', {} 등의 적절한 기본값으로 초기화
    MyNoticeDetail: ''
  };
  

// Action types
const GET_MY_NOTICE = 'MyPage/GET_MY_NOTICE';
const GET_MY_NOTICE_CODE = 'MyPage/GET_MY_NOTICE_CODE';

// Action creators
export const getMyNotice = (noticeData) => {
  console.log('getMyNotice:', noticeData);
  return {
    type: GET_MY_NOTICE,
    payload: noticeData,
  };
};

export const MyNoticeDetail = (noticeCodeData) => {
    console.log('MyNoticeDetail:', noticeCodeData);
    return {
      type: GET_MY_NOTICE_CODE,
      payload: noticeCodeData,
    };
  };

// Reducer
const myPageNoticeReducer = handleActions(
  {
    [GET_MY_NOTICE]: (state, { payload }) => {
      console.log('Reducer getMyNotice:', payload);
      return {
        ...state,
        getMyNotice: payload,
      };
    },

    [GET_MY_NOTICE_CODE]: (state, { payload }) => {
        console.log('Reducer MyNoticeDetail:', payload);
        return {
          ...state,
          MyNoticeDetail: payload.MyNoticeDetail,  // 여기를 수정합니다.
        };
      },
      

  },
  initialState
);

export default myPageNoticeReducer;
