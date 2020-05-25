import { call, put, takeEvery, takeLatest, spawn} from 'redux-saga/effects';
import { AsyncStorage }  from 'react-native';
import { auth } from '../actions/types';
import { authActions } from '../actions';
import { sendData, getData, deleteData, apiKey } from './ajax';

const {
  RESTORE_TOKEN, RESTORE_TOKEN_REQUEST, RESTORE_TOKEN_SUCCESS,
  SIGN_IN, SIGN_IN_REQUEST, SIGN_OUT_REQUEST, SIGN_UP_REQUESTED,
  SIGN_OUT_SUCCESS
} = auth;
const {
  signInSuccess, signOutSuccess,
  restoreTokenSuccess, saveToken
} = authActions;


// ALl httpRequest functions
const authDBCalls = {
  signIn: async (data) => {
    const response = await sendData(`${apiKey}/chef/login/`, data);
    console.log('signIn', response)
    const token = '45566tyHjgnkn6'
    await saveToken(token)
    return  { token }
  },
  signOut: async () => {
    const response = await AsyncStorage.removeItem('token')
    return response
  },
  signUp: async (data) => {
    const response = await sendData(`${apiKey}/chef/signup`, data);
    return response;
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
    yield put(signInSuccess(response.token));
    setAnimating(false);
    setAjaxStatus('success', message);
    goHome();
    console.log('done')
  } catch (err) {
    console.log(err)
    setAnimating(false);
    setAjaxStatus('error', `${err}`)
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
  const { data, setAnimating, setAjaxStatus, loginScreen } = payload;
  setAnimating(true)
  try {
    const response = yield call(authDBCalls.signUp, data);
    console.log('signUp', response);
  } catch (err) {
    console.log(err);
    setAnimating(false);
    setAjaxStatus('error', `${err}`)
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