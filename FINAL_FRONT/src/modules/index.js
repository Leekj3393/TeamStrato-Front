import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import noticeReducer from "./NoticeModule";

const rootReducer = combineReducers({
    memberReducer, noticeReducer
});

export default rootReducer;