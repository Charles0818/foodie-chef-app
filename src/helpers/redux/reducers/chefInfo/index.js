import { chefInfo } from '../../actions/types';
const {
  GET_CHEF_INFO_SUCCESS, CHEF_INFO_FULL_UPDATE_SUCCESS,
  CHEF_INFO_PARTIAL_UPDATE_SUCCESS
} = chefInfo;
export const chefInfoReducer = (prevState = {}, { type, payload }) => {
  switch (type) {
    case GET_CHEF_INFO_SUCCESS:
      return payload.chefInfo;
    case CHEF_INFO_PARTIAL_UPDATE_SUCCESS:
      return {...prevState, ...payload.chefInfo }
    case CHEF_INFO_FULL_UPDATE_SUCCESS:
      return payload.chefInfo
    default:
      return prevState
  }
}

