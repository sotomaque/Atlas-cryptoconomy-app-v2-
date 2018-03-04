// this file stores workflow function that should be call from the gui
import restApi from './rest-api';
import { configureStore } from '../../app/config/configureStore';
import { UPDATE_PORTFOLIO } from '../config/constants.js';

const store = configureStore();

const portfolioWorkflow = {
  // this function describe the workflow of making a transaction
  makeTransaction(transaction) {
    // console.log('makeTransaction starting: ', transaction);
    const userId = '123';
    restApi.saveTransaction({
      ...transaction,
      userId,
      txnDate: Date.now(),
    }, ((transRsp) => {
      console.log('makeTransaction save trasaction response: ', transRsp);
      store.dispatch({ type: UPDATE_PORTFOLIO, payload: transRsp });
    }));
  },

};

module.exports = portfolioWorkflow;
