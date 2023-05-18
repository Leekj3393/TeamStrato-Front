import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_MEMBERS = 'member/GET_MEMBERS';
const GET_MEMBER = 'member/GET_MEMBER';
const POST_LOGIN = 'member/POST_LOGIN';
const RESET_MEMBER = 'member/RESET_MEMBER';
const GET_MEMBERSID = 'member/GET_MEMBERSID';
const GET_MEMBERSNAME = 'member/GET_MEMBERSNAME';
const POST_MEMBER = 'member/POST_MEMBER';
const POST_MEMBERS = 'member/POST_MEMBERS';
const PUT_MEMBERS = 'member/PUT_MEMBERS';
const GET_JOBDEPTS = 'member/GET_JOBDEPTS';


export const { member : {getMember , getMembers, postLogin, resetMember, postMember, postMembers, 
    getJobdepts, putMembers,
}} = createActions({
    [GET_MEMBERS] : res => res.data,
    [GET_MEMBER] : res => res.data,
    [POST_LOGIN] : res => res,
    [RESET_MEMBER] : () => {},
    [GET_MEMBERSID] : res => res.data,
    [GET_MEMBERSNAME] : res => res.data,
    [POST_MEMBER] : res => res.data,
    [POST_MEMBERS] : res => res,
    [GET_JOBDEPTS] : res => res.data,
    [PUT_MEMBERS] : res => res,
});

const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, {payload}) => payload,
        [GET_MEMBER] : (state, {payload}) => ({ memberDt : payload}),
        [POST_LOGIN] : (state, { payload }) => ({ login : payload }),
        [RESET_MEMBER] : (state, action) => initialState,
        [GET_MEMBERSID] : (state, {payload}) => payload,
        [GET_MEMBERSNAME] : (state, {payload}) => payload,
        [POST_MEMBER] : (state, {payload}) => ({ member : payload }),
        [POST_MEMBERS] : (state, { payload }) => ({ regist : payload }),
        [GET_JOBDEPTS] : (state, {payload}) => ({ jobDept : payload}),
        [PUT_MEMBERS] : (state, {payload}) => ({ modify : payload}),
    }
    , initialState);

export default memberReducer;