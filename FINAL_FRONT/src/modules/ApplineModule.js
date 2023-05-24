import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_APPLINE_MEMBERS = 'appline/GET_APPLINE_MEMBERS';
const GET_APPLINE_MEMBER = 'appline/GET_APPLINE_MEMBER';
const POST_APPLINE = 'appline/POST_APPLINE';



export const { appline : {getApplineMembers, getApplineMember, postAppline}} = createActions({
    [GET_APPLINE_MEMBERS] : res => res.data,
    [GET_APPLINE_MEMBER] : res => res.data,
    [POST_APPLINE] : res => res,
    
}); 

const applineReducer = handleActions(
    {
        [GET_APPLINE_MEMBERS] : (state, {payload}) => ({accessors: payload}),
        [GET_APPLINE_MEMBER] : (state, {payload}) => ({selectedMem: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist2: payload}),
        
    }
    , initialState);

export default applineReducer;