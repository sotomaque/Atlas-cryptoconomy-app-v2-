
const restApi = {
  LOCAL_DEFAULT_URL: 'https://d1jh47jzv2.execute-api.us-east-1.amazonaws.com/dev/',
  GET_CURRENCY_PAIR: 'products/currency-pairs/Coinbase',
  PORTFOLIO_SERVICE: 'portfolios',
  TRANSACTION_SERVICE: 'transactions',

  //
  saveTransaction(transactions, callback) {
    transactions = {
      userId: '123',
      txnCoin: 'BTC',
      txnExchange: 'Coinbase',
      txnCurrency: 'USD',
      txnAmount: 1000,
      txnQty: 1,
      coinCurrentPrice: 15000,
      txnType: 'Buy',
      txnDate: '2018-02-18T00:00:00.000Z',
      txnNotes: 'Buy more coins',
    };
    if (!transactions) {
      return;
    }

    restApi.doPost(
      restApi.LOCAL_DEFAULT_URL + restApi.TRANSACTION_SERVICE
      , transactions
      , callback,
    );
  },

  doPost(url, payload, callback) {
    console.log(url, payload);
    fetch(url, {
      body: JSON.stringify(payload),
      headers: {
           'content-type': 'application/json',
       },
       method: 'POST', // *GET, PUT, DELETE, etc.
    }).then((res) => {
      return res.json();
    })
    .then((res) => {
      if (typeof (callback) === 'function') {
        callback(res);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  },
};

module.exports = restApi;
