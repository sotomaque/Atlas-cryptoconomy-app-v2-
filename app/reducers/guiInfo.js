//  Usually used to store any info we hide from the user, for example we don't
//  want the user switching tabs when configuring profile or such.
//  Depending on Navigation routes this Reducer might not be necessary. -Pedro
import { SWITCH_SCROLLING } from '../config/constants';


const initialState = {
  scrollingEnabled: true,
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_SCROLLING:
      return { ...state, scrollingEnabled: action.payload };
    default:
      return state;
  }
}
