import { createActions, handleActions } from "redux-actions";

const initialState = [];

const POST_APPLINE = 'approval/POST_APPLINE';

export const { approval : { postAppLine }} = createActions({
    [POST_APPLINE] : res => res,
});

const approvalReducer = handleActions (
    {
        [POST_APPLINE] : (state, {payload}) => ({regist: payload}),
    }
, initialState);

export default approvalReducer;