import cryptoApi from '../../app/lib/crypto-compare-api';

const initialState = {
	filter: 'DAY',
	selectedCoin: 'BTC',
	// stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: 'DAY', enableTime : true}),
	stockList: [0],
	stockData: [0, 0],
	selectedPoint: 0,	// Selected Value, an x-value of the graph that is grabbed from the PanResponder
	endPoint: 0,
	isPriceDisplayed: true,
};

export default function stockFilterReducer(state = initialState, action) {
  switch (action.type) {
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
					stockData: action.payload,
					endPoint: action.payload.slice(-1).pop(),
				};
				}
		case 'SEND_VALUE_FROM_POINT':
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
		case 'CHANGE_PRICE_DISPLAY': {
				return {
					...state,
					isPriceDisplayed: action.payload,
				};
		}
    default:
      return state;
  }
}
