import { user } from '../../actions/types';
const { RESTORE_USER_DETAILS } = user;
const initialState = { first_name: 'John', last_name: 'Doe' }
export const userReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case RESTORE_USER_DETAILS:
      return { ...payload.user, };
    default:
      return prevState
  }
}

