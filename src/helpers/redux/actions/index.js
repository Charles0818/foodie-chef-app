import * as authActions from './auth';
import * as serviceActions from './service';
import * as settingsActions from './settings';
import * as cookBookActions from './cookbook';
import * as userActions from './user';
import * as bookingActions from './booking';
import * as chefInfoActions from './chefInfo';
import * as homeActions from './home';
const retrieveToken = authActions.retrieveToken
export {
  authActions, serviceActions, settingsActions,
  cookBookActions, userActions, bookingActions,
  chefInfoActions, homeActions, retrieveToken
};
