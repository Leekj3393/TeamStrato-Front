import { createActions, handleActions } from 'redux-actions';


const initialState = [];

const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';
const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT';
const GET_CATEGORY = 'equipment/GET_CATEGORY';

export const { equipment : { getEquipments , getEquipment , getCategory} } = createActions({
    [GET_EQUIPMENTS] : res => res.data,
    [GET_EQUIPMENT] : res => res.data,
    [GET_CATEGORY] : res => res.data,
});

const equipmentReducer = handleActions({
    [GET_EQUIPMENTS] : (state,{ payload }) => payload,
    [GET_EQUIPMENT] : (state , { payload }) => ({detail : payload}),
    [GET_CATEGORY] : (state, { payload }) => ({category : payload }),
},initialState);

export default equipmentReducer;