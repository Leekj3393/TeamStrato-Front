import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_APPLINE_MEMBERS = 'appline/GET_APPLINE_MEMBERS';
const POST_APPLINE = 'appline/POST_APPLINE';


export const { appline : {getApplineMembers, postAppLine}} = createActions({
    [GET_APPLINE_MEMBERS] : res => res.data,
    [POST_APPLINE] : res => res,
});

const applineReducer = handleActions(
    {
        [GET_APPLINE_MEMBERS] : (state, {payload}) => ({applines: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist2: payload}),
    }
    , initialState);

export default applineReducer;