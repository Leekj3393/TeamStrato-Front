import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_NOTICES = 'notice/GET_NOTICES';
/* const GET_NOTICES_COUNT = 'notice/GET_NOTICES_COUNT'; */
const GET_NOTICE = 'notice/GET_NOTICE';
const POST_NOTICE = 'notice/POST_NOTICE';
const PUT_NOTICE = 'notice/PUT_NOTICE';

export const { notice : {getNotices, /* getNoticesCount, */ getNotice, postNotice, putNotice } } = createActions({
 [GET_NOTICES] : res => res.data,
 /* [GET_NOTICES_COUNT] : res => res.data, */
 [GET_NOTICE] : res => res.data,
 [POST_NOTICE] : res => res,
 [PUT_NOTICE] : res => res,

});

/* 리듀서 */
const noticeReducer = handleActions (
    {
        [GET_NOTICES] : (state, { payload }) => payload,
        /* [GET_NOTICES_COUNT] : (state, { payload }) => ({noticesCount: payload}), */
        [GET_NOTICE] : (state, { payload }) => ({noticeDetail: payload}),
        [POST_NOTICE] : (state, { payload }) => ({ regist : payload }),
        [PUT_NOTICE] : (state, { payload }) => ({ modify : payload }),
    }
, initialState);

export default noticeReducer;