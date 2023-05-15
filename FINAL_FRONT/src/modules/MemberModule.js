import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_MEMBERS = 'member/GET_MEMBERS';
const POST_LOGIN = 'member/POST_LOGIN';
const RESET_MEMBER = 'member/RESET_MEMBER';

export const { member : {getMembers, postLogin, resetMember}} = createActions({
    [GET_MEMBERS] : res => res.data,
    [POST_LOGIN] : res => res,
    [RESET_MEMBER] : () => {},
});

const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, {payload}) => payload,
        [POST_LOGIN] : (state, { payload }) => ({ login : payload }),
        [RESET_MEMBER] : (state, action) => initialState,
    }
    , initialState);

export default memberReducer;