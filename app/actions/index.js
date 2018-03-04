// redux actions
import {
	SEND_TICKER_AND_NAME,
	RESET_TO_USER_TRANSACTIONS,
	CHART_TIME_INTERVAL,
	RESET_CHART,
	SWITCH_SCROLLING,
	CHANGE_SIGN_IN,
	UPDATE_PORTFOLIO,
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

export function resetToUserHistory() {
	return {
		type: RESET_TO_USER_TRANSACTIONS,	// WILL HAVE PAYLOAD OF USER EVENTUALLY(?)
	};
}

export function resetChart() {
	return {
		type: RESET_CHART,
	};
}

export function scrollingisEnabled(value) {
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
