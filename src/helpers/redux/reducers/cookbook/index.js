import { cookbook } from '../../actions/types';

const {
  CREATE_DISH_SUCCESS, DELETE_DISH_SUCCESS,
  GET_ALL_DISHES_SUCCESS, UPDATE_DISH_SUCCESS
} = cookbook;
export const cookBookReducer = (prevState = [], { type, payload }) => {
  switch(type) {
    case CREATE_DISH_SUCCESS:
      return [ payload.dish, ...prevState ]
    case UPDATE_DISH_SUCCESS: {
      const dishes = prevState.map(dish => {
        if(dish.id === payload.id) dish = payload.dish;
        return dish
      })
      return dishes
    }
    case DELETE_DISH_SUCCESS:
      const dishes = prevState.filter(dish => dish.id !== payload.id)
      return dishes
    case GET_ALL_DISHES_SUCCESS:
      return payload.dishes
    default:
      return prevState;
  }
}