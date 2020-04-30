import serviceSagas from './service';
import authSagas from './auth';
import { spawn } from 'redux-saga/effects';

export default function* rootSaga() {
  yield spawn(serviceSagas)
  yield spawn(authSagas)
}
