import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import myPageReducer from "./MyPageModule";
import noticeReducer from "./NoticeModule";
import equipmentReducer from "./EquipmentModule";

const rootReducer = combineReducers({
    memberReducer,
    myPageReducer,  
     noticeReducer,
     equipmentReducer
});

export default rootReducer;