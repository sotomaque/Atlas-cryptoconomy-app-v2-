import cryptoApi from './crypto-compare-api';

const coinList = {
	DEFAULT_MOCK_UP_COIN_LIST: ['BTC', 'ETH'],
	// TODO : Storing the coin image link in the database
	DEFAULT_COIN_LIST_ICON: {
		ETH: {
			url: 'Ethereum',
		},
		BTC: {
			url: 'Bitcoin',
		},
		XRP: {
			url: 'Ripple',
		},
	},

	IS_DISPLAY_ALL: 'displayAll',
	USER_PORTFOLIO_DATA: {},

	getUserHistoryData() {
		const transactions = [
		{
				time: 1519712040,
				holding: 3,
				coinName: 'BTC',
			},
			{
				time: 1519743970,
				holding: 2,
				coinName: 'BTC',
			},
			{
				time: 1519793520,
				holding: 1,
				coinName: 'BTC',
			},
		];

		const option = { coinName: 'BTC', filter: 'DAY' };
		const userHistoryData = [];
		return cryptoApi.getHistoricalData(option, cryptoApi.IS_UNPROCESSED_DATA)
		.then((res) => {
			// get back day historical data and coin specific transaction
			// var timelapse = ( res.TimeTo - res.TimeFrom ) / res.Data.length
			const coinTransactions = transactions.filter((tran) => {
				return tran.coinName === option.coinName;
			});

			let currentTransactionCounter = 0;
			// current holding is going to calculate that if will sum all the holding
			// that is smaller then the previous one
			let currentHolding = 0;
			coinTransactions.map((coinTransaction) => {
				if (coinTransaction.time < res.TimeFrom) {
					currentHolding += coinTransaction.holding;
				}
			});
			for (const index in res.Data) {
				const dataPoint = res.Data[index];
				// TODO add up all the transaction that is less than the asking time
				if (dataPoint.time > coinTransactions[currentTransactionCounter].time) {
					if (currentTransactionCounter + 1 < transactions.length) {
						currentTransactionCounter += 1;
						currentHolding += coinTransactions[currentTransactionCounter].holding;
					}
				}
				if (userHistoryData[index]) {
					userHistoryData[index] = {
						// 'time' : cryptoApi.dateFormater(dataPoint.time*1000, option.filter),
						close: (userHistoryData[index].close + parseFloat(dataPoint.close * currentHolding).toFixed(2)).toFixed(2),
					};
				} else {
					userHistoryData.push(
							// 'time' : cryptoApi.dateFormater(dataPoint.time*1000, option.filter),
						parseFloat(parseFloat(parseFloat(dataPoint.close * currentHolding)
						.toFixed(2)).toFixed(2)));
				}
			}
			// console.log('getUserHistoryData', userHistoryData);
			return userHistoryData;
		});
	}, // getUserHistoryData


	getCoinListDetail(coinListArry, isDisplayAll) {
		if (!coinListArry) {
			if (isDisplayAll && isDisplayAll === coinList.IS_DISPLAY_ALL && Array.isArray(coinListArry)) {
				// console.error('Attempted getting too much data');
				return;
			}
			// console.error('Invalid list');
			return;
		}

		return cryptoApi.getPriceData(coinListArry).then((priceDatas) => {
			// console.log('getPriceData', priceDatas);

			// convert item to list

			if (isDisplayAll && isDisplayAll === coinList.IS_DISPLAY_ALL) {
				return priceDatas.DISPLAY;
			}
				const priceDataArry = [];
				for (const key in priceDatas.RAW) {
					const value = priceDatas.RAW[key];
					if (value) {
						priceDataArry.push({
							key,
							ticker: key,
							name: coinList.DEFAULT_COIN_LIST_ICON[key] ? coinList.DEFAULT_COIN_LIST_ICON[key].url : '',
							price: `$${value.USD.PRICE}`,
							percentChange: `${((value.USD.PRICE - value.USD.OPENDAY) * 100 / value.USD.OPENDAY).toFixed(2)}%`,
						});
					}
				}
				// console.log('getCoinListDetail', priceDataArry);
				return priceDataArry;
		});
	},
};

module.exports = coinList;
