import { auth } from './types';
const { SIGN_IN_REQUESTED, SIGNIN_FAILURE, SIGN_IN_SUCCESS, RESTORE_TOKEN_SUCCESS, RESTORE_TOKEN_REQUESTED, SIGN_OUT } = auth;


export const signInRequest = (data) => {
  return {
    type: SIGN_IN_REQUESTED,
    payload: data
  }
}

export const signInSuccess = (token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { token }
  }
}

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT
  }
}

export const restoreTokenSuccess = (token) => {
  return {
    type: RESTORE_TOKEN_SUCCESS,
    payload: { token },
  }
}

export const restoreTokenRequest = () => {
  return {
    type: RESTORE_TOKEN_REQUESTED
  }
}