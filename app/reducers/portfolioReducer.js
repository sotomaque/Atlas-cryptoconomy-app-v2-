// import coinList	from '../../app/lib/coin-list';
import { UPDATE_PORTFOLIO, SYNC_PORTFOLIO } from '../config/constants.js';

const initialState = {
    userId: '',
    transactionList: [],
    totalValueHeld: 0,
    coinList: [],
    createdAt: Date.now(),
    updatedAt: '',
    lastSyncAt: '',
};

export default function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_PORTFOLIO: {
      return {
        ...state,
        userId: action.payload.userId,
        transactionList: action.payload.transactionList,
        totalValueHeld: action.payload.totalValueHeld,
        coinList: action.payload.coinList,
        updatedAt: action.payload.updatedAt,
        lastSyncAt: Date.now(),
      };
    }
		case UPDATE_PORTFOLIO: {
      const currentCoin = state.coinList.filter((coin) => {
        return coin.coin === action.payload.txnCoin;
      })[0];

      // calculate
      let totalQty = parseFloat(action.payload.txnQty) * (action.payload.txnType === 'Buy' ? 1 : -1);
      if (currentCoin !== undefined && currentCoin.length !== 0) {
        totalQty = parseFloat(currentCoin.qtyHeld) + parseFloat(totalQty);
      }

      if (currentCoin !== undefined && currentCoin.length !== 0) {
        totalValue = currentCoin.valueHeld + totalValue;
      }

      let totalValue = action.payload.txnAmount * (action.payload.txnType === 'Buy' ? 1 : -1);
      if (currentCoin !== undefined && currentCoin.length !== 0) {
        totalValue = currentCoin.valueHe + totalValue;
      }

      const tmpCoinList = state.coinList.filter((coin) => {
        return coin.coin !== action.payload.txnCoin;
      });

      if (totalQty > 0) {
        tmpCoinList.push({
            coin: action.payload.txnCoin,
            qtyHeld: totalQty,
            valueHeld: totalValue,
        });
      }

      state.transactionList.push({
        txnCoin: action.payload.txnCoin,
        txnQty: action.payload.txnQty,
        txnDate: action.payload.txnDate,
      });

      return {
        ...state,
        transactionList: state.transactionList,
        totalValueHeld: action.payload.txnAmount + (state.totalValueHeld * (action.payload.txnType === 'Buy' ? 1 : -1)),
        coinList: tmpCoinList,
        updatedAt: Date.now(),
      };
    }
    default:
      return state;
  }
}
