import { booking } from '../types';
const { GET_ALL_BOOKINGS_REQUEST, GET_ALL_BOOKINGS_SUCCESS
} = booking;


export const getAllBookingRequest = (setAnimating, setAjaxStatus) => {
  return {
    type: GET_ALL_BOOKINGS_REQUEST,
    payload: { setAnimating, setAjaxStatus }
  }
}

export const getAllBookingSuccess = (bookings) => {
  return {
    type: GET_ALL_BOOKINGS_SUCCESS,
    payload: { bookings }
  }
}
