import { createActions, handleActions } from "redux-actions";

const initialState = [];

const POST_APPLINE = 'approval/POST_APPLINE';
const GET_MEMBERS_FOR_APP = 'approval/GET_MEMBERS_FOR_APP';

export const { approval : { postAppLine, getMembersForApp }} = createActions({
    [POST_APPLINE] : res => res,
    [GET_MEMBERS_FOR_APP] : res => res,
});

const approvalReducer = handleActions (
    {
        [POST_APPLINE] : (state, {payload}) => ({regist: payload}),
        [GET_MEMBERS_FOR_APP] : (state, {payload}) => payload,
    }
, initialState);

export default approvalReducer;