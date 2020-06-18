import { chefInfo } from '../types';
const {
  GET_CHEF_INFO_REQUEST, GET_CHEF_INFO_SUCCESS,
  CHEF_INFO_PARTIAL_UPDATE_REQUEST, CHEF_INFO_PARTIAL_UPDATE_SUCCESS,
  CHEF_INFO_FULL_UPDATE_REQUEST, CHEF_INFO_FULL_UPDATE_SUCCESS
} = chefInfo;


export const getChefInfoRequest = (setAnimating, setAjaxStatus) => {
  return {
    type: GET_CHEF_INFO_REQUEST,
    payload: { setAnimating, setAjaxStatus }
  }
}

export const getChefInfoSuccess = (chefInfo) => {
  return {
    type: GET_CHEF_INFO_SUCCESS,
    payload: { chefInfo }
  }
}

export const chefInfoPartialUpdateRequest = (data, setAnimating, setAjaxStatus) => {
  console.log('triggered')
  return {
    type: CHEF_INFO_PARTIAL_UPDATE_REQUEST,
    payload: { data, setAnimating, setAjaxStatus }
  }
}

export const chefInfoPartialUpdateSuccess = (chefInfo) => {
  return {
    type: CHEF_INFO_PARTIAL_UPDATE_SUCCESS,
    payload: { chefInfo }
  }
}

export const chefInfoFullUpdateRequest = (data, setAnimating, setAjaxStatus) => {
  return {
    type: CHEF_INFO_FULL_UPDATE_REQUEST,
    payload: { data, setAnimating, setAjaxStatus }
  }
}

export const chefInfoFullUpdateSuccess = (chefInfo) => {
  return {
    type: CHEF_INFO_FULL_UPDATE_SUCCESS,
    payload: { chefInfo }
  }
}