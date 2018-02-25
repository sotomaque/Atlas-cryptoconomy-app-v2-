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
			for( let coinName in priceDatas ){
				if(priceDatas[coinName]){
					// attach image link
					if(coinList.DEFAULT_COIN_LIST_ICON[coinName]){
						priceDatas[coinName].url = coinList.DEFAULT_COIN_LIST_ICON[coinName].url;
					}
				}
			}
			
			console.log('getCoinListDetail', priceDatas);
			return priceDatas;
		});
	}
}

module.exports = coinList;