import { service } from '../actions/types';

const { ADD_SERVICE_SUCCESS, REMOVE_SERVICE_SUCCESS, INITIALIZE_SERVICES } = service;
export const serviceReducer = (prevState = [], { type, payload }) => {
  switch(type) {
    case ADD_SERVICE_SUCCESS:
      return [payload.service, ...prevState ]
    case REMOVE_SERVICE_SUCCESS:
      const services = prevState.filter(service => service.id !== payload.id)
      return services
    case INITIALIZE_SERVICES:
      return payload.services
    default:
      return prevState;
  }
}

export const serviceRequests = (prevState = [], { type, payload }) => {
  switch(type) {
    
  }
}