//  Usually used to store any info we hide from the user, for example we don't
//  want the user switching tabs when configuring profile or such.
//  Depending on Navigation routes this Reducer might not be necessary. -Pedro
import {

} from '../config/constants';


const initialState = {
  //menuIsHidden: false
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
