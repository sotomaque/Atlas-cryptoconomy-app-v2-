// redux actions
import { SEND_TICKER_AND_NAME } from '../config/constants.js';

export function sendChartData(val) {
	return {
		type: 'SEND_DATA',
		payload: val,
	};
}

// Sends value from selected point in a graph.
export function sendValueFromPoint(val) {
	return {
		type: 'SEND_VALUE_FROM_POINT',
		payload: val,
	};
}

// Sends value from selected point in a graph.
export function sendStockListData(val) {
	return {
		type: 'SEND_STOCK_LIST_DATA',
		payload: val,
	};
}

export function getValue(coinName) {
	return {
		type: 'GET_COIN_VALUE',
		payload: coinName,
	};
}

export function changeCoin(coinName) {
	return {
		type: 'CHANGE_COIN_TYPE',
		payload: coinName,
	};
}

export function sendTickerAndName(coinTicker, coinName) {
	return {
		type: SEND_TICKER_AND_NAME,
		payload: { ticker: coinTicker, name: coinName },
	};
}
