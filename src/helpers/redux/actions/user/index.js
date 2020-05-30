import { user } from '../types';

const {
  RESTORE_USER_DETAILS, USER_PARTIAL_UPDATE_REQUEST,
  USER_PARTIAL_UPDATE_SUCCESS
} = user;

export const restoreUserDetails = (user) => {
  return {
    type: RESTORE_USER_DETAILS,
    payload: { user }
  }
}

export const userPartialUpdateRequest = (data, setAnimating, setAjaxStatus) => {
  return {
    type: USER_PARTIAL_UPDATE_REQUEST,
    payload: { data, setAnimating, setAjaxStatus}
  }
}

export const userPartialUpdateSuccess = (user) => {
  return {
    type: USER_PARTIAL_UPDATE_REQUEST,
    payload: { user }
  }
}