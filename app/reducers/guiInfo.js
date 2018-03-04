//  Usually used to store any info we hide from the user, for example we don't
//  want the user switching tabs when configuring profile or such.
//  Depending on Navigation routes this Reducer might not be necessary. -Pedro
import { SWITCH_SCROLLING, RESET_MINI_CHART_DATA, DID_REST_MINI_CHART_DATA } from '../config/constants';


const initialState = {
  scrollingEnabled: true,
  should_reset_data: false, // resets data on mini-graphs
  did_reset_data: true,
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_SCROLLING:
      return { ...state, scrollingEnabled: action.payload };
    case RESET_MINI_CHART_DATA:
      return { ...state, should_reset_data: true, did_reset_data: false };
    case DID_REST_MINI_CHART_DATA:
      return { ...state, should_reset_data: false, did_reset_data: true };
    default:
      return state;
  }
}
