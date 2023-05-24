import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_CALENDAR = "calendar/POST_CALENDAR";
const POST_COMPANYCAL = "calendar/POST_COMPANYCAL";
const POST_INSERTCAL = "calendar/POST_INSERTCAL";
const POST_UPDATECAL = "calendar/POST_UPDATECAL"

export const {
  calendar : { postCalendar, postCompanycal, postInsertcal, postUpdatecal },
} = createActions({
  [POST_CALENDAR]: res => res.data,
  [POST_COMPANYCAL]: res => res.data,
  [POST_INSERTCAL]: res => res,
  [POST_UPDATECAL]: res => res,
});

/* 리듀서 */
const calendarReducer = handleActions(
  {
    [POST_CALENDAR]: (state, { payload }) => ({ ...state,calendar : payload }),
    [POST_COMPANYCAL]: (state, { payload }) => ({ companycal : payload }),
    [POST_INSERTCAL]: (state, { payload }) => ({ ...state,insert : payload }),
    [POST_UPDATECAL]: (state, { payload }) => ({ ...state,update : payload }),
  },
  initialState
);

export default calendarReducer;