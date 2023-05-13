import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import myPageReducer from "./MyPageModule";

const rootReducer = combineReducers({
    memberReducer,
    myPageReducer
import noticeReducer from "./NoticeModule";

const rootReducer = combineReducers({
    memberReducer, noticeReducer
import equipmentReducer from "./EquipmentModule";

const rootReducer = combineReducers({
    memberReducer , equipmentReducer
});

export default rootReducer;