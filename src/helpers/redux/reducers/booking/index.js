import { booking } from '../../actions/types';
const { GET_ALL_BOOKINGS_SUCCESS } = booking;
export const bookingReducer = (prevState = [], { type, payload }) => {
  switch (type) {
    case GET_ALL_BOOKINGS_SUCCESS:
      return payload.bookings;
    default:
      return prevState
  }
}

