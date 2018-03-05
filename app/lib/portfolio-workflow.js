// this file stores workflow function that should be call from the gui
import restApi from './rest-api';
import thunk from 'redux-thunk';
import { store } from '../../app/config/configureStore';
import { UPDATE_PORTFOLIO, SYNC_PORTFOLIO } from '../config/constants.js';

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

  // sync portfolio, when user login
  // if there is no portfolio reducers
  // create local/backend portfolio obj,
  // if there is a portfolio
  // update your portfolio to the backend
  // - using the frontend portfolio as main source of storage
  syncPortfolio(portfolio, userId) {
    // check if there is portfolio state created
    console.log('syncPortfolio start');
    if (portfolio.userId === '') {
      // there is no userId, should be first time log in
      // sync with backend
      console.log('syncPortfolio no portfolio found');
      restApi.createPortfolio(userId, (savedPortfolio) => {
        console.log('syncPortfolio return from createPortfolio', savedPortfolio);
        store.dispatch({ type: SYNC_PORTFOLIO, payload: savedPortfolio });
      });
    } else {
      // there is an existing portfolio
      // update the backend obj
      console.log('syncPortfolio update portfolio');
      restApi.updatePortfolio(portfolio, (savedPortfolio) => {
        console.log('syncPortfolio return from updatePortfolio', savedPortfolio);
        store.dispath({ type: SYNC_PORTFOLIO, payload: savedPortfolio });
      });
    }
  },
};

module.exports = portfolioWorkflow;
