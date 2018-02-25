import cryptoApi from '../../app/lib/crypto-compare-api';

const initialState = {
	filter: 'DAY',
	//stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: 'DAY', enableTime : true}),
	stockList: [0],
	stockData: [0, 0],
	selectedPoint: 0,	// Selected Value, an x-value of the graph that is grabbed from the PanResponder
	endPoint: 0
};

export default function stockFilterReducer(state = initialState, action) {

  switch (action.type) {
    case 'DAY':
				return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: 'DAY' }) };
    case 'WEEK':
        return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: 'WEEK' }) };
    case 'MONTH':
        return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: 'MONTH' }) };
    case '3MONTH':
        return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: '3MONTH' }) };
    case '6MONTH':
        return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: '6MONTH' }) };
    case '1YEAR':
        return { ...state,
					stockList: cryptoApi.getHistoricalData({ coinName: 'BTC', filter: '1YEAR' }) };
		case 'SEND_DATA': {
				return { ...state,
					stockData: action.payload,
					endPoint: action.payload.slice(-1).pop() };
				}
		case 'SEND_VALUE_FROM_POINT':
				return { ...state,
					selectedPoint: action.payload };
		case 'SEND_STOCK_LIST_DATA': {
				return {
					...state, 
					stockList: action.payload
				};
		}
    default:
      return state;
  }
}
