import { auth } from './types';
import { AsyncStorage } from 'react-native';
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
    await AsyncStorage.setItem('userToken', JSON.stringify(token));
    console.log('heyyyy')
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
