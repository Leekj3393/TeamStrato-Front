import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_CLASS = "class/POST_CLASS";
const PUT_CLASS = "class/PUT_CLASS";
const GET_CLASS_VIEW ="class/GET_CLASS_VIEW";

export const { class : { postClass, putClass, getClassView }} = createActions({
    [POST_CLASS] : res => res,
    [PUT_CLASS] : res => res,
    [GET_CLASS_VIEW] : res => res.data,
})

const classReducer = handleActions(
    {   
        [POST_CLASS] : (state, {payload}) => ({classRegist : payload}),
        [PUT_CLASS] : (state, {payload}) => ({classUpdate : payload}),
        [GET_CLASS_VIEW] : (state, {payload}) => ({classView : payload}),
    }
,initialState)

export default classReducer;