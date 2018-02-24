// redux actions
export function sendChartData(val) {
	return {
		type: 'SEND_DATA',
		payload: val
	};
}

// Sends value from selected point in a graph.
export function sendValueFromPoint(val) {
	return {
		type: 'SEND_VALUE_FROM_POINT',
		payload: val
	};
}
