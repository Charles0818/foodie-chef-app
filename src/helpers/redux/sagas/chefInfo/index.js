import { call, put, takeEvery, takeLatest, spawn } from 'redux-saga/effects';
import { chefInfo } from '../../actions/types';
import { chefInfoActions, userActions,  retrieveToken } from '../../actions';
import { sendData, getData, deleteData, apiKey, modifyData, patchData } from '../ajax';

const {
  GET_CHEF_INFO_REQUEST, CHEF_INFO_FULL_UPDATE_REQUEST,
  CHEF_INFO_PARTIAL_UPDATE_REQUEST
} = chefInfo;
const {
  getChefInfoSuccess, chefInfoFullUpdateSuccess,
  chefInfoPartialUpdateSuccess
} = chefInfoActions;
const { restoreUserDetails } = userActions;

const retrieveData = (response) => {
  const { 
    avatar_url, cookbook, fan, serves, wallet,
    banner_avatar, restaurant_name, hourly_rate,
    city, state, address, coord, active, type, status, user
   } = response;
   const chefInfo = {
    avatar_url, cookbook, fan, serves, wallet,
    banner_avatar, restaurant_name, hourly_rate,
    city, state, address, coord, active, type, status
  }
   return {
    chefInfo, user
   }
}

// All httpRequest functions
export const chefInfoDBCalls = {
  getChefInfo: async () => {
    const token = await retrieveToken()
    const response = await getData(`${apiKey}/chef/info/`, token);
    const { chefInfo, user } = await retrieveData(response)
    console.log('chefInfo', chefInfo)
    return { chefInfo, user }
  },
  chefInfoPartialUpdate: async (data) => {
    const formData = new FormData()
    for(const property in data) {
      formData.append(`${property}`, data[property])
    }
    console.log('field to be updated', formData)
    const token = await retrieveToken()
    console.log('token being sent along =>  ', token)
    const response = await patchData(`${apiKey}/chef/info/`, formData, token, true);
    const { chefInfo } = retrieveData(response)
    console.log('response =>', chefInfo)
    return chefInfo
  },
  chefInfoFullUpdate: async (data) => {
    const token = await retrieveToken()
    const response = await modifyData(`${apiKey}/chef/info/`, data, token)
    const { chefInfo } = retrieveData(response)
    return chefInfo
  }
}

// All generators*
export function* getChefInfo() {
  try {
    const { chefInfo, user } = yield call(chefInfoDBCalls.getChefInfo);
    console.log('original chefInfo', chefInfo)
    yield put(getChefInfoSuccess(chefInfo))
    yield put(restoreUserDetails(user));
  } catch (err) {
    console.log(err)
  } 
}

function* chefInfoPartialUpdate({ payload }) {
  const { data, setAnimating, setAjaxStatus } = payload;
  setAnimating(true)
  try {
    const chefInfo = yield call(chefInfoDBCalls.chefInfoPartialUpdate, data)
    yield put(chefInfoPartialUpdateSuccess(chefInfo))
  } catch (err) {
    console.log(err);
    console.warn(err)
    setAjaxStatus(true)
  } finally {
    setAnimating(false)
  }
}

function* chefInfoFullUpdate({ payload }) {
  const { data, setAnimating, setAjaxStatus } = payload;
  setAnimating(true)
  try {
    const chefInfo = yield call(chefInfoDBCalls.chefInfoFullUpdate, data)
    yield put(chefInfoFullUpdateSuccess(chefInfo))
  } catch (err) {
    console.log(err);
    setAjaxStatus()
  } finally {
    setAnimating(false)
  }
}

export function* getChefInfoRequest() {
  yield takeLatest(GET_CHEF_INFO_REQUEST, getChefInfo)
}

export function* chefInfoPartialUpdateRequest() {
  yield takeLatest(CHEF_INFO_PARTIAL_UPDATE_REQUEST, chefInfoPartialUpdate)
}

export function* chefInfoFullUpdateRequest() {
  yield takeLatest(CHEF_INFO_FULL_UPDATE_REQUEST, chefInfoFullUpdate)
}
export default function* chefInfoSagas() {
  yield spawn(getChefInfoRequest)
  yield spawn(chefInfoPartialUpdateRequest)
  yield spawn(chefInfoFullUpdateRequest)
}