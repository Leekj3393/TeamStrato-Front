import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_MEMBERS = 'member/GET_MEMBERS';
const POST_LOGIN = 'member/POST_LOGIN';
const RESET_MEMBER = 'member/RESET_MEMBER';
const POST_MEMBER = 'member/POST_MEMBER';

export const { member : {getMembers, postLogin, resetMember, postMember}} = createActions({
    [GET_MEMBERS] : res => res.data,
    [POST_LOGIN] : res => res,
    [RESET_MEMBER] : () => {},
    [POST_MEMBER] : res => res.data,
});

const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, {payload}) => payload,
        [POST_LOGIN] : (state, { payload }) => ({ login : payload }),
        [RESET_MEMBER] : (state, action) => initialState,
        [POST_MEMBER] : (state, {payload}) => ({ member : payload }),
    }
    , initialState);

export default memberReducer;