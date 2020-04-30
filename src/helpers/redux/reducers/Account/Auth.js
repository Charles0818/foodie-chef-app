import { auth } from '../../actions/types';
const { SIGN_IN_SUCCESS, SIGN_OUT, RESTORE_TOKEN } = auth;
const initialState = {
  isLoading: true,
  isLoggedIn: false,
  userToken: null,
}
export const AuthReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: payload.token,
        isLoading: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...prevState,
        isLoggedIn: true,
        userToken: payload.token,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        isLoggedIn: false,
        userToken: null,
      };
    default:
    return prevState
  }
}

