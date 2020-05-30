import { auth } from './types';
import { AsyncStorage } from 'react-native';
const { SIGN_IN_REQUEST, SIGN_UP_REQUESTED, SIGNIN_FAILURE,
  SIGN_IN_SUCCESS, RESTORE_TOKEN_SUCCESS, RESTORE_TOKEN_REQUESTED,
  SIGN_OUT
} = auth;


export const signInRequest = (data, setAnimating, setAjaxStatus, goHome) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: { data, setAnimating, setAjaxStatus, goHome }
  }
}

export const signUpRequest = (data, setAnimating, setAjaxStatus, replace) => {
  return {
    type: SIGN_UP_REQUESTED,
    payload: { data, setAnimating, setAjaxStatus, replace }
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

export const storeFirstTimeKey = async () => {
  try {
    await AsyncStorage.setItem('isFirstTime', JSON.stringify(true));
    console.log('added')
  } catch (error) {
    console.log(error)
  }
}

export const getFirstTimeKey = async () => {
  try {
    const isFirstTime = await AsyncStorage.getItem('isFirstTime');
    if(isFirstTime === null) return true
    return false
  } catch (error) {
    console.log(error)
  }
}

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token, () => console.log('token saved successfully'));
  } catch (error) {
    console.log(error);
  }
}
export const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if(token === null) return false;
    return token
  } catch (error) {
    console.log(error)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken')
  } catch (error) {
    console(error)
  }
}
export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove(['userToken', 'isFirstTime'])
  } catch (error) {
    console.log(error)
  }
}