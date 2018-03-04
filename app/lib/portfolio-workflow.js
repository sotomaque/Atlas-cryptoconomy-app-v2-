// this file stores workflow function that should be call from the gui
import restApi from './rest-api';

const portfolioWorkflow = {

  // this function describe the workflow of making a transaction
  makeTransaction(transaction) {
    const userId = '123';
    restApi.saveTransaction({
      ...transaction,
      userId,
      txnDate: Date.now(),
    }, ((transRsp) => {
      // save this transaction
      // get portfolio

    }));
  },

};

module.exports = portfolioWorkflow;
