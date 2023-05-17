import { createActions, handleActions } from "redux-actions";

const initialState = [];

const POST_APPROVAL = 'approval/POST_APPROVAL';
const POST_APPLINE = 'approval/POST_APPLINE';
const GET_MEMBERS_FOR_APPLINE = 'aproval/GET_MEMBERS_FOR_APPLINE';


export const { approval : { postApproval, postAppLine, getMembersForAppline }} = createActions({
    [POST_APPROVAL] : res => res,
    [POST_APPLINE] : res => res,
    [GET_MEMBERS_FOR_APPLINE] : res => res.data,
});


const approvalReducer = handleActions (
    {
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist2: payload}),
        [GET_MEMBERS_FOR_APPLINE] : (state, {payload}) => payload,
    }
, initialState);

export default approvalReducer;