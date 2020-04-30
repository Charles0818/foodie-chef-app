import { combineReducers } from 'redux';
import * as AccountReducers from './Account/index';
export const allReducers = combineReducers({
  ...AccountReducers,
})