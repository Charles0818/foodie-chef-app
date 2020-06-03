import { call, put, takeEvery, takeLatest, spawn} from 'redux-saga/effects';
import { AsyncStorage }  from 'react-native';
import { cookbook } from '../../actions/types';
import { cookBookActions, retrieveToken } from '../../actions';
import { sendData, getData, deleteData, apiKey } from '../ajax';

const {
  CREATE_DISH_REQUEST, DELETE_DISH_REQUEST, GET_ALL_DISHES_REQUEST,
  UPDATE_DISH_REQUEST, CREATE_DISH_SUCCESS, DELETE_DISH_SUCCESS,
  GET_ALL_DISHES_SUCCESS, UPDATE_DISH_SUCCESS, SEARCH_DISHES_REQUEST
} = cookbook;
const {
  createDishSuccess, deleteDishSuccess, getAllDishesSuccess, updateDishSuccess
} = cookBookActions;

// ALl httpRequest functions
const cookBookDBCalls = {
  createDish: async (data) => {
    const token = await retrieveToken()
    const response = await sendData(`${apiKey}/chef/cookbook/`, data, token);
    console.log('createDish', response)
    return response;
  },
  getAllDishes: async () => {
    const token = await retrieveToken()
    const response = await getData(`${apiKey}/chef/cookbook/`, token);
    return response.results
  },
  filterDishes: async () => {
    const token = await retrieveToken();
    const response = await getData(`${apiKey}/chef/cookbook/`, token);
    return response.results
  },
  searchDishes: async (searchQuery, pageNum) => {
    const response = await getData(`${apiKey}/chef/cookbook/?search=${searchQuery}&page=${pageNum}`);
    return response;
  },
  updateDish: async (data) => {
    const response = await sendData(`${apiKey}/chef/cookbook/`, data);
    return response;
  },
  deleteDish: async (id) => {
    const response = await deleteData(`${apiKey}/chef/cookbook/`);
    return response
  }
}

// All generators*
function* createDish({ payload }) {
  const { data, setAnimating, setAjaxStatus, resetFields } = payload;
  const message = 'Dish successfully created';
  try {
    setAnimating(true);
    const response = yield call(cookBookDBCalls.createDish, data);
    yield put(createDishSuccess(response));
    setAjaxStatus('success', message);
    resetFields()
    console.log('done')
  } catch (err) {
    console.log(err)
    const { non_field_errors } = err;
    const errorMessage = non_field_errors
      ? non_field_errors[0]
      : 'Unable to create dish. Please check your internet connection'
    setAjaxStatus('error', `${errorMessage}`)
  } finally {
    setAnimating(false);
  }
}

function* getAllDishes({ payload }) {
  const { pageNum, setAnimating, setAjaxStatus } = payload;
  try {
    const dishes = yield call(cookBookDBCalls.getAllDishes)
    yield put(getAllDishesSuccess(dishes))
  } catch (err) {
    console.log(err)
  }
}

function* filterDishes({ payload }) {
  try {
    const dishes = yield call(cookBookDBCalls.filterDishes)
  } catch (err) {
    console.log(err);
  }
}
function* searchDishes({ payload }) {
  const { searchQuery, pageNum, setAnimating, setState, setAjaxStatus } = payload;
  try {
    setAnimating(true);
    const dishes = yield call(cookBookDBCalls.searchDishes, searchQuery, pageNum);
    setState(pageNum > 1 ? prev => [...prev, ...dishes] : dishes);
  } catch (err) {
    console.log(err);
    setAjaxStatus()
  } finally {
    setAnimating(false);
  }
}
function* updateDish({ payload }) {
  const { data, setAnimating, setAjaxStatus } = payload;
  setAnimating(true)
  try {
    const response = yield call(cookBookDBCalls.updateDish, data);
    console.log('updateDish', response);
  } catch (err) {
    console.log(err);
    setAjaxStatus('error', `${err}`)
  }
  finally {
    setAnimating(false);
  }
}

function* deleteDish({ payload }) {
  const { id, setAnimating, setAjaxStatus } = payload;
  setAnimating(true)
  try {
    const response = yield call(cookBookDBCalls.deleteDish, id);
    yield put(deleteDishSuccess(id))
    console.log('updateDish', response);
  } catch (err) {
    console.log(err);
    setAjaxStatus('error', `${err}`)
  }
  finally {
    setAnimating(false);
  }
}

export function* createDishRequest() {
  yield takeLatest(CREATE_DISH_REQUEST, createDish)
}

export function* getAllDishesRequest() {
  yield takeLatest(GET_ALL_DISHES_REQUEST, getAllDishes)
}

export function* searchDishesRequest() {
  yield takeLatest(SEARCH_DISHES_REQUEST, searchDishes)
}

export function* deleteDishRequest() {
  yield takeLatest(DELETE_DISH_REQUEST, deleteDish)
}

export function* updateDishRequest() {
  yield takeLatest(UPDATE_DISH_REQUEST, updateDish)
}

export default function* cookBookSagas() {
  yield spawn(createDishRequest)
  yield spawn(getAllDishesRequest)
  yield spawn(deleteDishRequest)
  yield spawn(updateDishRequest)
  yield spawn(searchDishesRequest)
}