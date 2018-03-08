import cryptoApi from '../../app/lib/crypto-compare-api';
// import coinList	from '../../app/lib/coin-list';
import {
	CHANGE_FILTER_VALUE,
	RESET_TO_USER_TRANSACTIONS,
	RESET_CHART,
} from '../config/constants.js';

const initialState = {
	filter: 'DAY',	// Necessary, decides time frame for chart.
	selectedCoin: 'BTC',	// Necessary, decides what chart displays.
	stockData: [0, 0],
	endPoint: 0,
	// this data is for the changes under the ticker
};

export default function stockFilterReducer(state = initialState, action) {
  switch (action.type) {
		case CHANGE_FILTER_VALUE: {
			return {
				...state,
				filter: action.payload,
			};
		}
		case 'CHANGE_COIN_TYPE': {
			return {
				...state,
				selectedCoin: action.payload,
			};
		}
		case 'SEND_DATA': {
				return {
					...state,
					stockData: action.payload.stockData,
					endPoint: action.payload.stockData.slice(-1).pop(),
				};
				}
		case RESET_TO_USER_TRANSACTIONS: {
			break;
		}
		case RESET_CHART: {
			return {
				...state,
				stockData: [0],
				endPoint: 0,
			};
		}
    default:
      return state;
  }
}
