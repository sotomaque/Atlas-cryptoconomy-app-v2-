// For our full screen view of a single coin.
// We want to grab Ticker, Name, and use this to
// To grab news, price, etc. -Pedro
import { SEND_TICKER_AND_NAME } from '../config/constants';


const initialState = {
  ticker: '',
  name: '',
  fetchinData: false,
  fetchedData: false,
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_TICKER_AND_NAME: {
      const { ticker, name } = action.payload;
      return { ...state, ticker, name };
      }
    default:
      return state;
  }
}
