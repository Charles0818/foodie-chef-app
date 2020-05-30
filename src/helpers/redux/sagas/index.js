import serviceSagas from './service';
import authSagas from './auth';
import chefInfoSagas from './chefInfo'
import bookingSagas from './booking';
import cookBookSagas from './cookbook'
import homeScreenSaga from './home';
import { spawn } from 'redux-saga/effects';

export default function* rootSaga() {
  yield spawn(serviceSagas)
  yield spawn(authSagas)
  yield spawn(chefInfoSagas)
  yield spawn(bookingSagas)
  yield spawn(cookBookSagas)
  yield spawn(homeScreenSaga)
}
