import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_MEMBERS_FOR_APPLINE = 'aprovalMember/GET_MEMBERS_FOR_APPLINE';


export const { approvalMember : { getMembersForAppline }} = createActions({
    [GET_MEMBERS_FOR_APPLINE] : res => res.data,
});


const approvalMemberReducer = handleActions (
    {
        [GET_MEMBERS_FOR_APPLINE] : (state, {payload}) => ({members : payload}),
    }
, initialState);

export default approvalMemberReducer;