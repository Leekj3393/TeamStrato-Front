import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import myPageReducer from "./MyPageModule";
import noticeReducer from "./NoticeModule";
import equipmentReducer from "./EquipmentModule";
import approvalReducer from "./ApprovalModule";
import memberFileReducer from "./MemberFileModule";
import applineReducer from "./ApplineModule";
import memberRoleReducer from "./MemberRoleModule";
import myPageNoticeReducer from "./MyPageNoticeModule";
import noticeFileReducer from "./NoticeFileModule";
import educationReducer from "./EducationModule";
import calendarReducer from "./CalendarModule";
import mailReducer from "./MailModule";

const rootReducer = combineReducers({
    memberReducer,
    myPageReducer,  
    noticeReducer,
    equipmentReducer,
    approvalReducer,
    memberFileReducer,
    applineReducer,
    memberRoleReducer,
    myPageNoticeReducer,
    noticeFileReducer,
    educationReducer,
    calendarReducer,
    mailReducer,
});

export default rootReducer;