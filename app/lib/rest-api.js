/**
* This page stores all the basic function that talk to the backend endpoints
* Additional workflow logic should not been place in this file
*/
const restApi = {
  LOCAL_DEFAULT_URL: 'https://d1jh47jzv2.execute-api.us-east-1.amazonaws.com/dev/',
  GET_CURRENCY_PAIR: 'products/currency-pairs/Coinbase',
  PORTFOLIO_SERVICE: 'portfolios',
  TRANSACTION_SERVICE: 'transactions',

  // saveTransaction
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

  // createPortfolio
  createPortfolio(userId, callback) {
    if (!userId) {
      return;
    }

    restApi.doPost(
      restApi.LOCAL_DEFAULT_URL + restApi.PORTFOLIO_SERVICE
      , { userId }
      , callback,
    );
  },

  // createPortfolio
  getPortfolio(userId, callback) {
    if (!userId) {
      return;
    }
    restApi.doGet(
      `${restApi.LOCAL_DEFAULT_URL + restApi.PORTFOLIO_SERVICE}/${userId}`
      , callback,
    );
  },

  // createPortfolio
  updatePortfolio(portfolio, callback) {
    if (!portfolio) {
      return;
    }
    restApi.doPut(
      restApi.LOCAL_DEFAULT_URL + restApi.PORTFOLIO_SERVICE,
      portfolio,
      callback,
    );
  },

  doPost(url, payload, callback) {
    console.log(url, JSON.stringify(payload));
    fetch(url, {
      body: JSON.stringify(payload),
      headers: {
           'content-type': 'application/json',
       },
       method: 'POST', // *GET, PUT, DELETE, etc.
    }).then((res) => {
      console.log('post successful', res);
      return res.json();
    })
    .then((res) => {
      console.log('post successful', res);
      if (typeof (callback) === 'function') {
        callback(res);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  },

  doGet(url, callback) {
    console.log(url);
    fetch(url, {
      headers: {
           'content-type': 'application/json',
       },
       method: 'GET', // *GET, PUT, DELETE, etc.
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

  doPut(url, payload, callback) {
    console.log(url, payload);
    fetch(url, {
      body: JSON.stringify(payload),
      headers: {
           'content-type': 'application/json',
       },
       method: 'PUT', // *GET, PUT, DELETE, etc.
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
