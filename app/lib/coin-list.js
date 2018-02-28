import cryptoApi from './crypto-compare-api';

var coinList = {
	DEFAULT_MOCK_UP_COIN_LIST	: ['BTC', 'ETH']
	//TODO : Storing the coin image link in the database
	,DEFAULT_COIN_LIST_ICON		: {
		'ETH': {
			'url': 'Ethereum'
		}
		,'BTC':{
			'url': 'Bitcoin'
		}
	}
	,IS_DISPLAY_ALL				: 'displayAll'


	,getCoinListDetail		: function(coinListArry, isDisplayAll) {
		if(!coinListArry){
			if(isDisplayAll && isDisplayAll == coinList.IS_DISPLAY_ALL && Array.isArray(coinListArry)){
				console.error('Attempted getting too much data');
				return;
			}
			console.error('Invalid list');
			return;
		}

		return cryptoApi.getPriceData(coinListArry).then(function(priceDatas){
			console.log('getPriceData', priceDatas)

			// convert item to list

			if(isDisplayAll && isDisplayAll == coinList.IS_DISPLAY_ALL){
				return priceDatas.DISPLAY;
			}
			else{
				var priceDataArry = [];
				for( var key in priceDatas.RAW ){
					var value = priceDatas.RAW[key];
					if(value){
						priceDataArry.push({
							key				: key
							,ticker				: key
							,name			: coinList.DEFAULT_COIN_LIST_ICON[key] ? coinList.DEFAULT_COIN_LIST_ICON[key].url : ''
							,price			: '$' + value.USD.PRICE
							,percentChange	: ((value.USD.PRICE-value.USD.OPENDAY)*100 / value.USD.OPENDAY).toFixed(2) + '%'
						})
					}
				}
				console.log('getCoinListDetail', priceDataArry);
				return priceDataArry;
			}
		});
	}
}

module.exports = coinList;
