import { createActions, handleActions } from 'redux-actions';


const initialState = [];

const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const GET_CATEGORY = 'equipment/GET_CATEGORY';
const POST_EQUIPMENT = 'equipment/POST_EQUIPMENT';

export const { equipment : { getEquipments , getEquipment , getCategory , postEquipment} } = createActions({
    [GET_EQUIPMENTS] : res => res.data,
    [GET_EQUIPMENT] : res => res.data,
    [GET_CATEGORY] : res => res.data,
    [POST_EQUIPMENT] : res => res,
});

const equipmentReducer = handleActions({
    [GET_EQUIPMENTS] : (state,{ payload }) => payload,
    [GET_EQUIPMENT] : (state , { payload }) => ({detail : payload}),
    [GET_CATEGORY] : (state, { payload }) => ({category : payload }),
    [POST_EQUIPMENT] : (state, { payload }) => ({ regist : payload }),
},initialState);

export default equipmentReducer;