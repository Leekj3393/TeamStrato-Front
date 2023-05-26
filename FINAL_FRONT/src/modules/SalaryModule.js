import { createActions, handleActions } from "redux-actions"


const initialState = [];

const GET_LIST = 'salary/GET_LIST';

export const {salary : { getList }} = createActions({
    [GET_LIST] : res => res.data,
});

const SalaryReducer = handleActions({
    [GET_LIST] : (state , { payload }) => ({ list : payload }),
},initialState);

export default SalaryReducer;

