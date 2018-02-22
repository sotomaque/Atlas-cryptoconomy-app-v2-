//  Will eventually be used to store any information from the user we want to keep
//  saved on the device as a state, for example Sign In/User info, notification settings,
//  and other local settings. Will be restored by redux-persist.  -Pedro
import {
  CHANGE_SIGN_IN
} from '../config/constants';

const initialState = {
  isSignedIn: false,
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SIGN_IN:
      return { ...state, isSignedIn: action.payload };
    default:
      return state;
  }
}
