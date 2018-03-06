// redux actions
import {
	SEND_TICKER_AND_NAME,
	RESET_TO_USER_TRANSACTIONS,
	CHART_TIME_INTERVAL,
	RESET_CHART,
	SWITCH_SCROLLING,
	CHANGE_SIGN_IN,
	CHANGE_FILTER_VALUE,
	RESET_MINI_CHART_DATA,
	DID_REST_MINI_CHART_DATA,
	SET_ADJUSTED_CHART,
	SEND_VALUE_FROM_POINT,
} from '../config/constants.js';
import coinList from '../../app/lib/coin-list.js';

export function sendChartData(val, filter) {
	// additionalData required
	const chartData = coinList.getChartStat(val);

	const payload = {
		stockData: val,
		chartAmountChange: chartData.amountChange,
		chartPercentChange: chartData.percentChange,
		chartTimeInterval: CHART_TIME_INTERVAL[filter],
	};
	return {
		type: 'SEND_DATA',
		payload,
	};
}

// Sends value from selected point in a graph.
export function sendValueFromPoint(val) {
	return {
		type: SEND_VALUE_FROM_POINT,
		payload: val,
	};
}

export function changeFilter(val) {
	return {
		type: CHANGE_FILTER_VALUE,
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

export function resetToUserHistory() {
	return {
		type: RESET_TO_USER_TRANSACTIONS,	// WILL HAVE PAYLOAD OF USER EVENTUALLY(?)
	};
}

export function resetChart() {	// Sets stockData array to [0]
	return {
		type: RESET_CHART,
	};
}

export function scrollingisEnabled(value) {	// Used when user pans on chart
	return {
		type: SWITCH_SCROLLING,
		payload: value,
	};
}

export function changeLoggedIn(value) {
	return {
		type: CHANGE_SIGN_IN,
		payload: value,
	};
}

export function resetData(filter) { // first in flow to get mini-graphs
	return {
		type: RESET_MINI_CHART_DATA,
		payload: filter,
	};
}

export function didResetData() {	// last in flow to get mini-graphs
	return {
		type: DID_REST_MINI_CHART_DATA,
	};
}

export function setAdjugestedChart(value) {
	return {
		type: SET_ADJUSTED_CHART,
		payload: value,
	};
}
