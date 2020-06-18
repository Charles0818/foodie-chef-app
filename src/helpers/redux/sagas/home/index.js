import { call, put, all, takeEvery, takeLatest, spawn } from 'redux-saga/effects';
import { home } from '../../actions/types';
import { chefInfoActions, bookingActions, retrieveToken } from '../../actions';
import { bookingDBCalls } from '../booking';
import { chefInfoDBCalls, getChefInfo } from '../chefInfo';

const { getAllBookingSuccess } = bookingActions;
const { getChefInfoSuccess } = chefInfoActions;
const {
  GET_BOOKING_AND_CHEF_INFO
} = home;

// All generators*
function* initializeHomeData ({ payload }) {
  const { setAnimating, setAjaxStatus } = payload;
  try {
    setAnimating(true)
    console.log('getting Home Data')
    const [bookings] = yield all([
      call(bookingDBCalls.getAllBookings),
      call(getChefInfo)
    ])
    console.log('original bookings', bookings)
    yield put(getAllBookingSuccess(bookings))
  } catch (err) {
      console.log('initializeHome error =>', err);
      setAjaxStatus('error', `${err}`)
  } finally {
    setAnimating(false)
  }
}

export function* initializeHomeDataRequest() {
  yield takeLatest(GET_BOOKING_AND_CHEF_INFO, initializeHomeData)
}

export default function* homeScreenSaga() {
  yield spawn(initializeHomeDataRequest)
}