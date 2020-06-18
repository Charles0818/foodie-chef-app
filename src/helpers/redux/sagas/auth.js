import { call, put, takeEvery, takeLatest, spawn} from 'redux-saga/effects';
import { AsyncStorage }  from 'react-native';
// import CookieManager from '@react-native-community/cookies';
import { auth } from '../actions/types';
import { authActions, userActions} from '../actions';
import { sendData, getData, deleteData, apiKey } from './ajax';
// const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
const {
  RESTORE_TOKEN, RESTORE_TOKEN_REQUEST, RESTORE_TOKEN_SUCCESS,
  SIGN_IN, SIGN_IN_REQUEST, SIGN_OUT_REQUEST, SIGN_UP_REQUESTED,
  SIGN_OUT_SUCCESS
} = auth;

const {
  signInSuccess, signOutSuccess,
  restoreTokenSuccess, saveToken, removeToken
} = authActions;
const { restoreUserDetails } = userActions;

// ALl httpRequest functions
const authDBCalls = {
  signIn: async (data) => {
    // RCTNetworking.clearCookies(() => {});
    const response = await sendData(`${apiKey}/chef/login/`, data);
    const { user: { token, user } } = response;
    console.log('signIn', response)
    await saveToken(token)
    return { token, user }
  },
  signOut: async () => {
    // RCTNetworking.clearCookies(() => {});
    await removeToken()
  },
  signUp: async (data) => {
    console.log(data);
    // RCTNetworking.clearCookies(() => {});
    const { message } = await sendData(`${apiKey}/chef/signup/`, data);
    return message;
  },
  restoreToken: async () => {
    const response = await AsyncStorage.getItem('token')
    return response
  }
}

// All generators*
function* signIn({ payload }) {
  const { data, setAnimating, setAjaxStatus, goHome } = payload;
  const message = 'Welcome back';
  try {
    setAnimating(true);
    const response = yield call(authDBCalls.signIn, data);
    console.log(response)
    yield put(signInSuccess(response.token));
    yield put(restoreUserDetails(response.user));
    goHome();
  } catch (err) {
    console.log('an error', err)
    setAnimating(false);
    const { non_field_errors } = err;
    const errorMessage = non_field_errors
      ? non_field_errors[0]
      : 'Unable to login, please check your internet connection'
    setAjaxStatus('error', `${errorMessage}`)
  }
}

function* signOut() {
  try {
    const wish = yield call(authDBCalls.signOut)
    yield put(signOutSuccess())
  } catch (err) {
    console.log(err)
  }
}

function* signUp({ payload }) {
  const { data, setAnimating, setAjaxStatus, replace } = payload;
  setAnimating(true)
  try {
    const message = yield call(authDBCalls.signUp, data);
    replace('ConfirmEmail', { message })
  } catch (err) {
    console.log(err);
    const { email } = err;
    const errorMessage = email ? email[0] : 'Unable to sign up. Please check your internet connection'
    setAnimating(false);
    setAjaxStatus('error', `${errorMessage}`)
  }
}
function* restoreToken() {
  try {
    const response = yield call(authDBCalls.restoreToken);
    yield put(restoreTokenSuccess, response.token)
  } catch (err) {
    console.log(err)
  }
}

export function* signInRequest() {
  yield takeLatest(SIGN_IN_REQUEST, signIn)
}

export function* signOutRequest() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut)
}

export function* restoreTokenRequest() {
  yield takeLatest(RESTORE_TOKEN_REQUEST, restoreToken)
}
export function* signUpRequest() {
  yield takeLatest(SIGN_UP_REQUESTED, signUp)
}

export default function* authSagas() {
  yield spawn(signInRequest)
  yield spawn(signOutRequest)
  yield spawn(restoreTokenRequest)
  yield spawn(signUpRequest)
}