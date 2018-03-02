import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import reducersImport from '../reducers';

const persistConfig = {
  key: 'rootReducer',
  storage,
  whitelist: ['userInfo' ] // only persists what's in userInfo right now. -Pedro
};
const reducers = persistCombineReducers(persistConfig, reducersImport);
export function configureStore() {
  const store = createStore(
   reducers,
   undefined,
   compose(applyMiddleware(thunk, logger))
  );
  return store;
}