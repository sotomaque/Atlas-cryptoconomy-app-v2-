// Default, used for reduxPersist. -Pedro

import {
  /*
  ADD_COIN,
  REMOVE_COIN,
  VIEW_COIN,
  SEARCH_COIN,
  HOME,
  COIN, */
  //FORCE_REHYDRATE
} from '../config/constants';


const initialState = {
  rehydrated: false,
};

export default function persistedState(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
