import { settings } from './types';
const {
  ENABLE_NEWSLETTER, ENABLE_PHONE_CALLS, ENABLE_TEXT_MESSAGES,
  SET_CURRENCY, SET_PAYMENT_METHOD, TOGGLE_PUSH_NOTIFICATION,
  UPDATE_COORDINATES
} = settings;

export const enableNewsletter = (isEnabled) => {
  return {
    type: ENABLE_NEWSLETTER,
    payload: { isEnabled }
  }
}

export const enablePhoneCalls = (isEnabled) => {
  return {
    type: ENABLE_PHONE_CALLS,
    payload: { isEnabled }
  }
}

export const enableTextMessages = (isEnabled) => {
  return {
    type: ENABLE_TEXT_MESSAGES,
    payload: { isEnabled }
  }
}

export const setCurrency = (currency) => {
  return {
    type: SET_CURRENCY,
    payload: { currency }
  }
}

export const setPaymentMethod = (paymentMethod) => {
  return {
    type: SET_PAYMENT_METHOD,
    payload: { paymentMethod }
  }
}

export const togglePushNotification = (isEnabled) => {
  return {
    type: TOGGLE_PUSH_NOTIFICATION,
    payload: { isEnabled }
  }
}

export const updateCoordinates = (coordinates) => {
  return {
    type: UPDATE_COORDINATES,
    payload: { coordinates }
  }
}