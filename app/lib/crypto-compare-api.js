
var cryptoApi = {

	// define constants
	DEFAULT_ENDPOINT 			: 'https://min-api.cryptocompare.com/data/'
	,HISTORICAL_DATA 			: 'histo/@FILTER/?fsym=/@COIN_NAME/&tsym=USD&limit=/@LIMIT/&aggregate=/@AGGREGATE/'
	,NUM_DATA_POINTS			: 100

	// public calls
	,getHistoricalData	: function( option ){
		
		console.log('getHistoricalData', option);
		
		if( !( option.coinName && option.filter ) ){
			console.error('Coin Name and Filter required')
			return;
		}
		
		var filtr 	= ''
		,aggreate	= ''
		,coinName	= option.coinName
		,limit		= option.limit || cryptoApi.NUM_DATA_POINTS
		
		switch(option.filter){
			case 'DAY' :
				filter 		= 	'minute'
				,aggreate	= 	'7'
				,limit		=	'200'
				break;
			case 'WEEK':
				filter		=	'day'
				,aggreate	= 	'7'
				break;
			case 'MONTH' :	
				filter 		=	'day'
				,aggreate	= 	'30'
				break;
			case '3MONTH':
				filter		= 	'day'
				,aggreate	= 	'90'
				break;
			case '6MONTH':
				filter		= 	'day'
				,aggreate	= 	'180'
				break;
			case '1YEAR':	
				filter		=	'day'
				,aggreate	=	'365'
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
			var list = cryptoApi.trimDataSetToList(res.Data)
			return cryptoApi.trimDataSetToList(res.Data)
		})
	}//getHistoricalData
	
	,trimDataSetToList		: function(arr){
		
		console.log('trimDataSetToList', arr);
		
		return arr.map(function( dataPoint ){
			return dataPoint.close 
		})
	}// trimDataSet
	
}  

module.exports = cryptoApi;