import { createActions, handleActions } from "redux-actions"


const initialState = [];

const GET_LIST = 'salary/GET_LIST';
const GET_SEARCH = 'salary/GET_SEARCH'

export const {salary : { getList ,getSearch }} = createActions({
    [GET_LIST] : res => res.data,
    [GET_SEARCH] : res => res,
});

const SalaryReducer = handleActions({
    [GET_LIST] : (state , { payload }) => ({ list : payload }),
    [GET_SEARCH] : (state , { payload }) => ({ searchEmp : payload}),
},initialState);

export default SalaryReducer;

