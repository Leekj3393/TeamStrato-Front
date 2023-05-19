import { createActions, handleActions } from "redux-actions";

const initialState = {};


const GET_APP_MEMBER_INFO = 'approval/GET_APP_MEMBER_INFO';
const POST_APPROVAL = 'approval/POST_APPROVAL';


export const { approval : { getAppMemberInfo, postApproval}} = createActions({
    [GET_APP_MEMBER_INFO] : res => res.data,
    [POST_APPROVAL] : res => res,
});


const approvalReducer = handleActions (
    {
        [GET_APP_MEMBER_INFO] : (state, {payload}) => ({appMember: payload}),
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
    }
, initialState);

export default approvalReducer;