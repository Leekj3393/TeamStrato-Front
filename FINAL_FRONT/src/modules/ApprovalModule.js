import { createActions, handleActions } from "redux-actions";

const initialState = [];

const POST_APPROVAL = 'approval/POST_APPROVAL';


export const { approval : { postApproval}} = createActions({
    [POST_APPROVAL] : res => res,
});


const approvalReducer = handleActions (
    {
        [POST_APPROVAL] : (state, {payload}) => ({regist: payload}),
    }
, initialState);

export default approvalReducer;