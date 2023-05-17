import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import myPageReducer from "./MyPageModule";
import noticeReducer from "./NoticeModule";
import equipmentReducer from "./EquipmentModule";
import approvalReducer from "./ApprovalModule";
import memberFileReducer from "./MemberFileModule";

const rootReducer = combineReducers({
    memberReducer,
    myPageReducer,  
    noticeReducer,
    equipmentReducer,
    approvalReducer,
    memberFileReducer,
});

export default rootReducer;