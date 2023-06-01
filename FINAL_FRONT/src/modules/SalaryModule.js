import { createActions, handleActions } from "redux-actions"


const initialState = [];

const GET_LIST = 'salary/GET_LIST';
const GET_SEARCH = 'salary/GET_SEARCH';
const GET_MEMBER = 'salary/GET_MEMBER';

export const {salary : { getList ,getSearch , getMember}} = createActions({
    [GET_LIST] : res => res.data,
    [GET_SEARCH] : res => res,
    [GET_MEMBER] : res => res,
});

const SalaryReducer = handleActions({
    [GET_LIST] : (state , { payload }) => ({ list : payload }),
    [GET_SEARCH] : (state , { payload }) => ({ searchEmp : payload}),
    [GET_MEMBER] : (state , {payload}) => ({member : payload}),
},initialState);

export default SalaryReducer;

