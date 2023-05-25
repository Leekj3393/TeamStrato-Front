import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_APPLINE_MEMBERS = 'appline/GET_APPLINE_MEMBERS';
const GET_APPROVAL_INFO = 'appline/GET_APPROVAL_INFO';
const POST_APPLINE = 'appline/POST_APPLINE';



export const { appline : {getApplineMembers, getApprovalInfo, postAppline}} = createActions({
    [GET_APPLINE_MEMBERS] : res => res.data,
    [GET_APPROVAL_INFO] : res => res.data,
    [POST_APPLINE] : res => res,
    
}); 

const applineReducer = handleActions(
    {
        [GET_APPLINE_MEMBERS] : (state, {payload}) => ({accessors: payload}),
        [GET_APPROVAL_INFO] : (state, {payload}) => ({approvalInfo: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist2: payload}),
        
    }
    , initialState);

export default applineReducer;