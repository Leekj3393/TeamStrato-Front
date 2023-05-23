import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_EDUCATION = "education/POST_EDUCATION";

export const { education : {postEducation}} = createActions({
    [POST_EDUCATION] : res => res.data,
})

const educationReducer = handleActions(
    {
        [POST_EDUCATION] : (state, {payload}) => ({eduAdd : payload}),
    }
,initialState)

export default educationReducer;