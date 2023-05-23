import { createActions, handleActions } from 'redux-actions';


const initialState = [];

const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const GET_CATEGORY = 'equipment/GET_CATEGORY';
const GET_MODIFY = 'equipment/GET_MODIFY';
const GET_CATEGORYS = 'equipment/GET_CATEGORYS';
const POST_EQUIPMENT = 'equipment/POST_EQUIPMENT';

export const { equipment : { getEquipments , getEquipment , getCategory , postEquipment , getModify , getCategorys} } = createActions({
    [GET_EQUIPMENTS] : res => res.data,
    [GET_EQUIPMENT] : res => res.data,
    [GET_CATEGORY] : res => res.data,
    [GET_MODIFY] : res => res.data,
    [GET_CATEGORYS] : res => res.data,
    [POST_EQUIPMENT] : res => res,
});

const equipmentReducer = handleActions({
    [GET_EQUIPMENTS] : (state,{ payload }) => payload,
    [GET_EQUIPMENT] : (state , { payload }) => ({detail : payload}),
    [GET_CATEGORY] : (state, { payload }) => ({category : payload }),
    [GET_MODIFY] : (state , { payload }) => ({equipments : payload}),
    [GET_CATEGORYS] : (state , { payload }) => ({...state , categorys : payload}),
    [POST_EQUIPMENT] : (state, { payload }) => ({ regist : payload }),
},initialState);

export default equipmentReducer;