import { call, put, takeEvery, takeLatest, spawn } from 'redux-saga/effects';
import { booking } from '../../actions/types';
import { bookingActions, retrieveToken } from '../../actions';
import { sendData, getData, deleteData, apiKey } from '../ajax';

const {
  GET_ALL_BOOKINGS_REQUEST
} = booking;
const { getAllBookingSuccess
} = bookingActions;


// All httpRequest functions
export const bookingDBCalls = {
  getAllBookings: async () => {
    const token = await retrieveToken()
    const response = await getData(`${apiKey}/chef/my-bookings/`, token);
    console.log('bookings', response)
    return response.results
  },
}

// All generators*
function* getAllBookings({ payload }) {
  try {
    const bookings = yield call(bookingDBCalls.getAllBookings)
    yield put(getAllBookingSuccess(bookings))
  } catch (err) {
    console.log(err)
  }
}



export function* getAllBookingsRequest() {
  yield takeLatest(GET_ALL_BOOKINGS_REQUEST, getAllBookings)
}

export default function* bookingSagas() {
  yield spawn(getAllBookingsRequest)
}