import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_MAIL = "mail/POST_MAIL";

export const {
  postMail : { postMail },
} = createActions({
  [POST_MAIL]: res => res,
});

/* 리듀서 */
const purchaseReducer = handleActions(
  {
    [POST_MAIL]: (state, { payload }) => payload
  },
  initialState
);

export default purchaseReducer;