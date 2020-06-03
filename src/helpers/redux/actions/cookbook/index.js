import { cookbook } from '../types';
const {
  GET_ALL_DISHES_REQUEST, GET_ALL_DISHES_SUCCESS,
  CREATE_DISH_REQUEST, CREATE_DISH_SUCCESS,
  UPDATE_DISH_REQUEST, UPDATE_DISH_SUCCESS,
  DELETE_DISH_REQUEST, DELETE_DISH_SUCCESS,
  SEARCH_DISHES_REQUEST
} = cookbook;

export const getAllDishesRequest = (setAnimating) => {
  return {
    type: GET_ALL_DISHES_REQUEST,
    payload: { setAnimating }
  }
}

export const getAllDishesSuccess = (dishes) => {
  return {
    type: GET_ALL_DISHES_SUCCESS,
    payload: { dishes }
  }
}

export const searchDishesRequest = (
  searchQuery, pageNum, setAnimating, setState, setAjaxStatus
) => {
  return {
    type: SEARCH_DISHES_REQUEST,
    payload: {
      searchQuery, pageNum, setAnimating, setState, setAjaxStatus
    }
  }
}
export const createDishRequest = (data, setAnimating, setAjaxStatus, resetFields) => {
  return {
    type: CREATE_DISH_REQUEST,
    payload: { data, setAnimating, setAjaxStatus, resetFields }
  }
}

export const createDishSuccess = (dish) => {
  return {
    type: CREATE_DISH_SUCCESS,
    payload: { dish }
  }
}

export const updateDishRequest = (dish, id, setAnimating) => {
  return {
    type: UPDATE_DISH_REQUEST,
    payload: { dish, id, setAnimating }
  }
}

export const updateDishSuccess = (dish, id) => {
  return {
    type: UPDATE_DISH_SUCCESS,
    payload: { dish, id }
  }
}

export const deleteDishRequest = (id, setAnimating) => {
  return {
    type: DELETE_DISH_REQUEST,
    payload: { id, setAnimating }
  }
}

export const deleteDishSuccess = (id) => {
  return {
    type: DELETE_DISH_SUCCESS,
    payload: { id }
  }
}