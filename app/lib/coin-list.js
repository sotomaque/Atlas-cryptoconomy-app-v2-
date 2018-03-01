import cryptoApi from './crypto-compare-api';

let coinList = {
	DEFAULT_MOCK_UP_COIN_LIST: ['BTC', 'ETH'],
	// TODO : Storing the coin image link in the database
	DEFAULT_COIN_LIST_ICON: {
		ETH: {
			url: 'Ethereum'
		},
		BTC: {
			url: 'Bitcoin'
		}
	},

	IS_DISPLAY_ALL: 'displayAll',

	getUserHistoryData(){
		let transactions = [
		{
				time : 1519712040
				,holding : 3
				,coinName : 'BTC'
			}
			,{
				time : 1519743970
				,holding : 2
				,coinName : 'BTC'
			}
			,{
				time : 1519793520
				,holding : 1
				,coinName : 'BTC'
			}
		]

		, option = {coinName : 'BTC', filter : 'DAY'}
		,	userHistoryData = [];
		return cryptoApi.getHistoricalData(option, cryptoApi.IS_UNPROCESSED_DATA)
		.then(function(res){
			// get back day historical data and coin specific transaction
			//var timelapse = ( res.TimeTo - res.TimeFrom ) / res.Data.length
			coinTransaction = transactions.filter(function(tran){
				return tran.coinName == option.coinName;
			})

			var currentTransactionCounter = 0;
			var currentHolding = coinTransaction[currentTransactionCounter].holding;
			for( var index in res.Data ){
				var dataPoint = res.Data[index];
				//TODO add up all the transaction that is less than the asking time
				if(dataPoint.time > coinTransaction[currentTransactionCounter].time){
					if(currentTransactionCounter + 1 < transactions.length){
						currentTransactionCounter += 1;
						currentHolding += coinTransaction[currentTransactionCounter].holding;
					};
				}
				if(userHistoryData[index]){
					userHistoryData[index] = {
						//'time' : cryptoApi.dateFormater(dataPoint.time*1000, option.filter),
						'close' : (userHistoryData[index].close + parseFloat(dataPoint.close * currentHolding).toFixed(2)).toFixed(2)
					}
				}
				else{
					userHistoryData.push(
							//'time' : cryptoApi.dateFormater(dataPoint.time*1000, option.filter),
						parseFloat(parseFloat(parseFloat(dataPoint.close * currentHolding).toFixed(2)).toFixed(2))
					)
				}
				;

			}
			console.log('getUserHistoryData', userHistoryData)
			return userHistoryData;
		})

	}//getUserHistoryData


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
							,name				: coinList.DEFAULT_COIN_LIST_ICON[key] ? coinList.DEFAULT_COIN_LIST_ICON[key].url : ''
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
