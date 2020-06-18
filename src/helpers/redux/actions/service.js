import { service } from './types';

const {
  ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_SUCCESS, REMOVE_SERVICE_REQUEST,
  GET_SERVICES, INITIALIZE_SERVICES
} = service;

export const addServiceRequest = (data) => {
  return {
    type: ADD_SERVICE_REQUEST,
    payload: { data }
  }
}

export const addServiceSuccess = (service) => {
  return {
    type: ADD_SERVICE_SUCCESS,
    payload: { service }
  }
}

export const removeServiceRequest = (data) => {
  return {
    type: REMOVE_SERVICE_REQUEST,
    payload: { data }
  }
}

export const removeServiceSuccess = (id) => {
  return {
    type: REMOVE_SERVICE_SUCCESS,
    payload: { id }
  }
}

export const initializeServices = (services) => {
  return {
    type: INITIALIZE_SERVICES,
    payload: { services }
  }
}

export const getServices = () => {
  return {
    type: GET_SERVICES
  }
}

