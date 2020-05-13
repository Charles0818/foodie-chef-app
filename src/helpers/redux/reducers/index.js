import { combineReducers } from 'redux';
import * as AccountReducers from './Account/index';
import * as SettingsReducers from './settings';
export const allReducers = combineReducers({
  ...AccountReducers,
  ...SettingsReducers
})