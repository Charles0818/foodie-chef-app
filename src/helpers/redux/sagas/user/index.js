import { call, put, takeEvery, takeLatest, spawn} from 'redux-saga/effects';
import { user } from '../../actions/types';
import { userActions, retrieveToken} from '../../actions';
import { sendData, getData, deleteData, patchData, apiKey } from '../ajax';

const {
  USER_PARTIAL_UPDATE_REQUEST
} = user;

const { userPartialUpdateSuccess } = userActions;

// ALl httpRequest functions
const userDBCalls = {
  userPartialUpdate: async (data) => {
    const token = await retrieveToken()
    const { user } = await patchData(`${apiKey}/accounts/update-user/`, data, token);
    return user
  },
  getUser: async (username) => {
    const { user } = await getData(`${apiKey}/accounts/update-user/?username=${username}`)
    return user
  }
}

// All generators*
function* userPartialUpdate({ payload }) {
  const { data, setAnimating, setAjaxStatus } = payload;
  try {
    setAnimating(true);
    const user = yield call(userDBCalls.userPartialUpdate, data);
    yield put(userPartialUpdateSuccess(user));
  } catch (err) {
    console.log('an error', err)
    setAjaxStatus('error', 'unable to update account. Please try again')
  } finally {
    setAnimating(false);
  }
}

export function* getUserRequest() {
  const { data, setAnimating, setAjaxStatus } = payload;
  try {
    setAnimating(true);
    const user = yield call(userDBCalls.userPartialUpdate, data);
    yield put(userPartialUpdateSuccess(user));
  } catch (err) {
    console.log('an error', err)
    setAjaxStatus('error', 'unable to update account. Please try again')
  } finally {
    setAnimating(false);
  }
}

export function* userPartialUpdateRequest() {
  yield takeLatest(USER_PARTIAL_UPDATE_REQUEST, userPartialUpdate)
}

export default function* authSagas() {
  yield spawn(userPartialUpdateRequest)
}