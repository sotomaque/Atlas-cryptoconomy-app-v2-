import cryptoApi from './crypto-compare-api';

var coinList = {
	DEFAULT_MOCK_UP_COIN_LIST	: ['BTC', 'ETH']
	//TODO : Storing the coin image link in the database
	,DEFAULT_COIN_LIST_ICON		: {
		'ETH': {
			'url': 'ethereum'
		}
		,'BTC':{
			'url': 'btc'
		}
	}
		
	
	,getCoinListDetail		: function(coinListArry) {
		if(!coinListArry){
			console.error('Invalid list');
			return;
		}
		
		return cryptoApi.getPriceData(coinListArry).then(function(priceDatas){
			console.log('getPriceData', priceDatas)
			
			// convert item to list
			var priceDataArry = [];
			
			for( var key in priceDatas.RAW ){
				var value = priceDatas.RAW[key];
				if(value){
					priceDataArry.push({
						key				: key
						,url			: coinList.DEFAULT_COIN_LIST_ICON[key].url
						,price			: '$' + value.USD.PRICE
						,percentChange	: ((value.USD.PRICE-value.USD.OPENDAY)*100 / value.USD.OPENDAY).toFixed(2) + '%'
					})
				}
			}
			console.log('getCoinListDetail', priceDataArry);
			return priceDataArry;
		});
	}
}

module.exports = coinList;