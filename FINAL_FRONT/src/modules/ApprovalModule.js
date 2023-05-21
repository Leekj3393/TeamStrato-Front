import { createActions, handleActions } from "redux-actions";

const initialState = {};


const GET_APP_MEMBER_INFO = 'approval/GET_APP_MEMBER_INFO';
const POST_APPROVAL = 'approval/POST_APPROVAL';
const GET_APPROVALS = 'approval/GET_APPROVALS';
const GET_APPROVAL = 'approval/GET_APPROVAL';


export const { approval : { getAppMemberInfo, postApproval, getApprovals, getApproval, putApproval, }} = createActions({
    [GET_APP_MEMBER_INFO] : res => res.data,
    [POST_APPROVAL] : res => res,
    [GET_APPROVALS] : res => res.data,
    [GET_APPROVAL] : res => res.data,
});


const approvalReducer = handleActions (
    {
        [GET_APP_MEMBER_INFO] : (state, {payload}) => ({appMember: payload}),
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
        [GET_APPROVALS] : (state, {payload}) => payload,
        [GET_APPROVAL] : (state, {payload}) => payload,
    }
, initialState);

export default approvalReducer;