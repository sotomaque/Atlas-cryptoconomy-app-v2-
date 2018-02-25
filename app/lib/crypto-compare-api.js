/***
 * @author Qian
 * 
 * @functions getHistoricalData 
 * 
 */

var cryptoApi = {

	// define constants
	DEFAULT_ENDPOINT: 'https://min-api.cryptocompare.com/data/'
	,HISTORICAL_DATA: 'histo/@FILTER/?fsym=/@COIN_NAME/&tsym=USD&limit=/@LIMIT/&aggregate=/@AGGREGATE/'
	,PRICE_DATA		: 'pricemulti?fsyms=/@COIN_NAMES/&tsyms=USD'
	,NUM_DATA_POINTS: 2000
	
	/**
	 * @param option 
	 * @example
	 * getHistoricalData	{ coinName	:	'BTC'
	 * 						,filter		:	'DAY'
	 * 						,enableTime	:	true}
	 * 
	 * @returns promise 
	 */
	,getHistoricalData	: function (option) {
		console.log('getHistoricalData', option);
		if( !( option.coinName && option.filter ) ){
			console.error('Coin Name and Filter required')
			return;
		}

		var filtr 	= ''
		,aggreate	= ''
		,coinName	= option.coinName
		,limit		= option.limit || cryptoApi.NUM_DATA_POINTS
		,timeFlag	= option.enableTime || false
		
		switch(option.filter){
			case 'DAY' :
				filter 		= 	'minute'
				,aggreate	= 	'7'
				,limit		=	'200'
				break;
			case 'WEEK':
				filter		=	'hour'
				,aggreate	= 	'1'
				,limit		=	'168'
				break;
			case 'MONTH' :
				filter 		=	'hour'
				,aggreate	= 	'3'
				,limit		=	'243'
				break;
			case '3MONTH':
				filter		= 	'hour'
				,aggreate	= 	'9'
				,limit		=	'243'
				break;
			case '6MONTH':
				filter		= 	'day'
				,aggreate	= 	'1'
				,limit		=	'180'
				break;
			case '1YEAR':
				filter		=	'day'
				,aggreate	=	'1'
				,limit		=	'365'
				break;
			case 'MAX':
				filter		= 	'day'
				,aggreate 	=	'10'
				,allData	=	'true'
				break;
			default	:
				console.error('Filter not defined');
				return;
		}


		var finalUrl 	= cryptoApi.HISTORICAL_DATA.replace('/@FILTER/'	, filter)
												.replace('/@COIN_NAME/'	, coinName)
												.replace('/@LIMIT/'		, limit)
												.replace('/@AGGREGATE/'	, aggreate)
		console.log('finalUrl', finalUrl);
		return fetch( cryptoApi.DEFAULT_ENDPOINT + finalUrl )
		.then(function(res){
			return res.json()
		})
		.then(function(res){
			var list = cryptoApi.trimDataSetToList(res.Data, timeFlag, option.filter);
			console.log('getHistoricalData-dataResponce', list);
			return list;
		})
	}//getHistoricalData

	,getPriceData			: function(coinList) {
		if(!coinList) {
			console.error('Invalid request');
			return; 
		}
		
		let coinNames 	= coinList.join()
		,finalUrl 		= cryptoApi.PRICE_DATA.replace('/@COIN_NAMES/'	, coinNames);
		
		return fetch( cryptoApi.DEFAULT_ENDPOINT + finalUrl )
		.then(function(res){
			return res.json()
		})
	}//getPriceData
	
	,trimDataSetToList		: function(arr, timeFlag, filter){
		console.log('trimDataSetToList', arr ,timeFlag, filter);
		if(timeFlag){
			if(!filter){
				console.error('Cannot process this without proper filter');
				return;
			}
			return arr.map(function( dataPoint ){
				return { 'close' : dataPoint.close,
					'time'	: cryptoApi.dateFormater(dataPoint.time*1000, filter)}
			})
		}
		else {
			return arr.map(function( dataPoint ){
				return dataPoint.close
			})
		}
	}// trimDataSet

	,dateFormater					: function(date, filter){
		var dateStr = ''

		switch( filter ){
			case 'DAY'	:
			case 'WEEK' :
				console.log( )
				dateStr = new Date(date).toLocaleString('en-US',
							{ hour: 'numeric'
							, minute: 'numeric'
							, month: 'short'
							, day: 'numeric'
							, hour12: true })
							break;
			default :
				dateStr = new Date(date).toLocaleString('en-US',
							{month: 'short'
							,	day: 'numeric'
							, hour12: true })
							break;
		}

		return dateStr;
	}// dateFormater
}

module.exports = cryptoApi;
