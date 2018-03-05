import cryptoApi from '../../app/lib/crypto-compare-api';
// import coinList	from '../../app/lib/coin-list';
import {
	CHANGE_FILTER_VALUE,
	RESET_TO_USER_TRANSACTIONS,
	RESET_CHART,
	SEND_VALUE_FROM_POINT,
} from '../config/constants.js';

const initialState = {
	filter: 'DAY',
	selectedCoin: 'BTC',
	stockList: [0],
	stockData: [0, 0],
	selectedPoint: 0,	// Selected Value, an x-value of the graph that is grabbed from the PanResponder
	endPoint: 0,
	// this data is for the changes under the ticker
	chartAmountChange: 0,
	chartPercentChange: 0,
	chartTimeInterval: '',
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
    case 'DAY':
				return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
    case 'WEEK':
        return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
    case 'MONTH':
        return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
    case '3MONTH':
        return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
    case '6MONTH':
        return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
    case '1YEAR':
        return {
					...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: state.filter }),
				};
		case 'SEND_DATA': {
				return {
					...state,
					stockData: action.payload.stockData,
					endPoint: action.payload.stockData.slice(-1).pop(),
					chartAmountChange: action.payload.chartAmountChange,
					chartPercentChange: action.payload.chartPercentChange,
					chartTimeInterval: action.payload.chartTimeInterval,
				};
				}
		case SEND_VALUE_FROM_POINT:
				return {
					...state,
					selectedPoint: action.payload,
				};
		case 'SEND_STOCK_LIST_DATA': {
				return {
					...state,
					stockList: action.payload,
				};
		}
		case RESET_TO_USER_TRANSACTIONS: {
			/*
			coinList
						.getUserHistoryData().then((res) => {
				return {
					...state,
					stockList: res,
				};
			}); */
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
