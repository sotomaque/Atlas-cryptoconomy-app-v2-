//  redux reducers
//  Not combined because we go ahead and do that in App configureStore
//  when we get ready the store to persist it.  -Pedro 
import userInfo from './userInfo';
import persistedState from './persistedState';
import guiInfo from './guiInfo';
import stockFilterReducer from './stockerFilter';

const rootReducer = {
    userInfo
    ,persistedState
    ,guiInfo
    ,stockFilterReducer
};

export default rootReducer;
