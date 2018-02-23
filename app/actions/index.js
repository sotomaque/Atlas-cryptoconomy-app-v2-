// redux actions

export function updateFilter( filter ){
	return {
		type : filter
	}
}

export function sendChartData( val ){
	return {
		type: 'SEND_DATA',
		payload: val
	}
}
