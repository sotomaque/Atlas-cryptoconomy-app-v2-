/*******************************************************************************
 * @author Qian
 * 
 * @functions getHistoricalData
 * 
 */
let cryptoApi = {

	// define constants
	DEFAULT_ENDPOINT: 'https://min-api.cryptocompare.com/data/',
	HISTORICAL_DATA: 'histo/@FILTER/?fsym=/@COIN_NAME/&tsym=USD&limit=/@LIMIT/&aggregate=/@AGGREGATE/',
	PRICE_DATA: 'pricemultifull?fsyms=/@COIN_NAMES/&tsyms=USD',
	NUM_DATA_POINTS: 2000,
	IS_UNPROCESSED_DATA: 'unprocessedData',

	/**
	 * @param option
	 * @example getHistoricalData { coinName : 'BTC' ,filter : 'DAY' ,enableTime :
	 *          true}
	 * 
	 * @returns promise
	 */
	getHistoricalData(option, isUnprocessedData) {
		// console.log('getHistoricalData', option);
		if (!(option.coinName && option.filter)) {
			// console.error('Coin Name and Filter required')
			return;
		}

		let filter	= '';
		let aggreate	= '';
		let coinName	= option.coinName;
		let limit			= option.limit || cryptoApi.NUM_DATA_POINTS;
		let timeFlag	= option.enableTime || false;

		switch (option.filter) {
			case 'DAY':
				filter 		= 	'minute';
				aggreate	= 	'7';
				limit			=	'200';
				break;
			case 'WEEK':
				filter		=	'hour';
				aggreate	= 	'1';
				limit			=	'168';
				break;
			case 'MONTH':
				filter 		=	'hour';
				aggreate	= '3';
				limit			=	'243';
				break;
			case '3MONTH':
				filter		= 'hour';
				aggreate	= '9';
				limit			=	'243';
				break;
			case '6MONTH':
				filter		= 'day';
				aggreate	= '1';
				limit			=	'180';
				break;
			case '1YEAR':
				filter		=	'day';
				aggreate	=	'1';
				limit			=	'365';
				break;
			case 'MAX':
				filter		= 'day';
				aggreate 	=	'10';
				// allData = 'true';
				break;
			default:
				// console.error('Filter not defined');
				return;
		}


		const finalUrl 	= cryptoApi.HISTORICAL_DATA.replace('/@FILTER/', filter)
												.replace('/@COIN_NAME/', coinName)
												.replace('/@LIMIT/', limit)
												.replace('/@AGGREGATE/', aggreate);
		// console.log('finalUrl', finalUrl);

		if (isUnprocessedData && (isUnprocessedData === cryptoApi.IS_UNPROCESSED_DATA)) {
			return fetch(cryptoApi.DEFAULT_ENDPOINT + finalUrl)
			.then((res) => {
				return res.json();
			});
		} else {
			return fetch(cryptoApi.DEFAULT_ENDPOINT + finalUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				return cryptoApi.getPriceData(option.coinName)
				.then((latest) => {
					// console.log('Adding the latest data point',{
					// 'close':latest.RAW[option.coinName].USD.PRICE,
					// 'time':latest.RAW[option.coinName].USD.LASTUPDATE});
					res.Data.push({
													close: latest.RAW[option.coinName].USD.PRICE,
													time: latest.RAW[option.coinName].USD.LASTUPDATE,
												});
					return res;
				})
				.then((res) => {
					const list = cryptoApi.trimDataSetToList(res.Data, timeFlag, option.filter);
					// console.log('getHistoricalData-dataResponce', list);
					return list;
				});
			});
		}
	}, // getHistoricalData

	getPriceData(coinList) {
		if (!coinList) {
			// console.error('Invalid request');
			return;
		}

		const coinNames = Array.isArray(coinList) ? coinList.join() : coinList;
		const finalUrl	= cryptoApi.PRICE_DATA.replace('/@COIN_NAMES/', coinNames);

		return fetch(cryptoApi.DEFAULT_ENDPOINT + finalUrl)
		.then((res) => {
			return res.json();
		});
	}, // getPriceData

	trimDataSetToList(arr, timeFlag, filter) {
		// console.log('trimDataSetToList', arr ,timeFlag, filter);
		if (timeFlag) {
			if (!filter) {
				// console.error('Cannot process this without proper filter');
				return;
			}
			return arr.map(function( dataPoint ){
				return {
					close: dataPoint.close,
					time: cryptoApi.dateFormater(dataPoint.time * 1000, filter),
				};
			});
		} else {
			return arr.map((dataPoint) => {
				return dataPoint.close;
			});
		}
	}, // trimDataSet

	dateFormater(date, filter) {
		let dateStr = '';
		switch (filter) {
			case 'DAY':
			case 'WEEK':
				dateStr = new Date(date).toLocaleString('en-US', {
							hour: 'numeric',
							minute: 'numeric',
							month: 'short',
							day: 'numeric',
							hour12: true,
							});
							break;
			default:
				dateStr = new Date(date).toLocaleString('en-US', {
							month: 'short',
							day: 'numeric',
							hour12: true,
							});
							break;
		}
		return dateStr;
	}, // dateFormater
};

module.exports = cryptoApi;
