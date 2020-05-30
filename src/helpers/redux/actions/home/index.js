import { home } from '../types';
const { GET_BOOKING_AND_CHEF_INFO
} = home;


export const getBookingAndChefInfo = (setAnimating, setAjaxStatus) => {
  return {
    type: GET_BOOKING_AND_CHEF_INFO,
    payload: { setAnimating, setAjaxStatus }
  }
}

