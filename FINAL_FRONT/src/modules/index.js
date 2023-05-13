import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import equipmentReducer from "./EquipmentModule";

const rootReducer = combineReducers({
    memberReducer , equipmentReducer
});

export default rootReducer;