import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import noticeReducer from "./NoticeModule";

const rootReducer = combineReducers({
    memberReducer, noticeReducer
import equipmentReducer from "./EquipmentModule";

const rootReducer = combineReducers({
    memberReducer , equipmentReducer
});

export default rootReducer;