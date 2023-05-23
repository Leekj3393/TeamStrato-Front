import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_CALENDAR = "calendar/POST_CALENDAR";
const POST_COMPANYCAL = "calendar/POST_COMPANYCAL";

export const {
  calendar : { postCalendar, postCompanycal },
} = createActions({
  [POST_CALENDAR]: res => res.data,
  [POST_COMPANYCAL]: res =>res.data,
});

/* 리듀서 */
const calendarReducer = handleActions(
  {
    [POST_CALENDAR]: (state, { payload }) => ({ calendar : payload }),
    [POST_COMPANYCAL]: (state, { payload }) => ({ companycal : payload }),
  },
  initialState
);

export default calendarReducer;