import { combineReducers } from 'redux';
import * as AccountReducers from './Account/index';
import { settingsReducer } from './settings';
import { bookingReducer } from './booking';
import { cookBookReducer } from './cookbook';
import { chefInfoReducer } from './chefInfo';
export const allReducers = combineReducers({
  bookingReducer,
  settingsReducer,
  cookBookReducer,
  chefInfoReducer,
  ...AccountReducers,
})