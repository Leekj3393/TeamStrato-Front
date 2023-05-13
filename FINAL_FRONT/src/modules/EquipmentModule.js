import { createActions, handleActions } from 'redux-actions';


const initialState = [];

const GET_EQUIPMENTS = 'equipment/GET_EQUIPMENTS';

export const { equipment : { getEquipments } } = createActions({
    [GET_EQUIPMENTS] : res => res.data
});

const equipmentReducer = handleActions({
    [GET_EQUIPMENTS] : (state,{ payload }) => payload
},initialState);

export default equipmentReducer;