import { createActions, handleActions } from "redux-actions";

const initialState = [];

const POST_APPROVAL = 'approval/POST_APPROVAL';
const POST_APPLINE = 'approval/POST_APPLINE';
const GET_MEMBERS_FOR_APP = 'approval/GET_MEMBERS_FOR_APP';
const GET_DEPARTMENTS_FOR_APP = 'approval/GET_DEPARTMENTS_FOR_APP';


export const { approval : { postApproval, postAppLine, getMembersForApp, getDepartmentsForApp }} = createActions({
    [POST_APPROVAL] : res => res,
    [POST_APPLINE] : res => res,
    [GET_MEMBERS_FOR_APP] : res => res.data,
    [GET_DEPARTMENTS_FOR_APP] : res => res.data,
});

const approvalReducer = handleActions (
    {
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist: payload}),
        [GET_MEMBERS_FOR_APP] : (state, {payload}) => payload,
        [GET_DEPARTMENTS_FOR_APP] : (state, {payload}) => payload,
    }
, initialState);

export default approvalReducer;