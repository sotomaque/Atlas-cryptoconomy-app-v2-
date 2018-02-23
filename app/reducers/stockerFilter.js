import cryptoApi from '../../app/lib/crypto-compare-api'

const initialState = {
	filter		: 	'DAY'
	,stockList	:	[50,50]
};

export default function stockFilterReducer(state = initialState, action) {
  switch (action.type) {
    case 'DAY':
      return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : 'DAY' })};
    case 'WEEK':
        return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : 'WEEK' })};
    case 'MONTH':
        return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : 'MONTH' })};
    case '3MONTH':
        return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : '3MONTH' })};
    case '6MONTH':
        return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : '6MONTH' })};
    case '1YEAR':
        return { ...state, stockList: cryptoApi.getHistoricalData({ coinName : 'BTC', filter : '1YEAR' })};
    default:
      return state;
  }
}
