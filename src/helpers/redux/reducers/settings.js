import { settings } from '../actions/types';

const { SET_CURRENCY, SET_PAYMENT_METHOD, ENABLE_NEWSLETTER, ENABLE_PHONE_CALLS, ENABLE_TEXT_MESSAGES, TOGGLE_PUSH_NOTIFICATION, UPDATE_COORDINATES } = settings;
export const settingsReducer = (prevState = { }, { type, payload }) => {
  switch(type) {
    case SET_CURRENCY:
      const { currency } = payload;
      return {...prevState, currency }
    case SET_PAYMENT_METHOD:
      const { paymentMethod } = payload;
      return {...prevState, paymentMethod}
    case ENABLE_NEWSLETTER:
      return {...prevState, enableNewsletter: payload.isEnabled}
    case ENABLE_PHONE_CALLS:
      return {...prevState, enablePhoneCalls: payload.isEnabled}
    case ENABLE_TEXT_MESSAGES:
      return {...prevState, enableTextMessages: payload.isEnabled}
    case TOGGLE_PUSH_NOTIFICATION:
      return {...prevState, enablePushNotification: payload.isEnabled}
    case UPDATE_COORDINATES:
      const { coordinates } = payload;
      return {...prevState, coordinates}
    default:
      return prevState;
  }
}