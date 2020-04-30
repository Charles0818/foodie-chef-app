import { call, put, takeEvery, takeLatest, spawn} from 'redux-saga/effects';
import { AsyncStorage }  from 'react-native';
import { auth } from '../actions/types';
import { authActions } from '../actions';
const { RESTORE_TOKEN, RESTORE_TOKEN_REQUEST, RESTORE_TOKEN_SUCCESS, SIGN_IN, SIGN_IN_REQUEST, SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS } = auth;
const { signInSuccess, signOutSuccess, restoreTokenSuccess } = authActions;
import { sendData, getData, deleteData, apiKey } from './ajax';


// ALl httpRequest functions
const authDBCalls = {
  signIn: async (data) => {
    // const response = await sendData(`${apiKey}`, data);
    const token = '45566tyHjgnkn6'
    await AsyncStorage.setItem('token', token)
    return  { token }
  },
  signOut: async () => {
    const response = await AsyncStorage.removeItem('token')
    return response
  },
  restoreToken: async () => {
    const response = await AsyncStorage.getItem('token')
    return response
    
  }
}

// All generators*
function* signIn({ payload }) {
  try {
   
    const response = yield call(authDBCalls.signIn, payload)
    yield put(signInSuccess(response.token));
    console.log('done')
  } catch (err) {
    console.log(err)
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

export default function* authSagas() {
  yield spawn(signInRequest)
  yield spawn(signOutRequest)
  yield spawn(restoreTokenRequest)
}