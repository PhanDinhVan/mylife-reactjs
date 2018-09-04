import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt'

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key'
});
const persistConfig = {
  transforms: [encryptor],
  key: 'root',
  storage,
  whitelist: ['authState', 'restaurantState', 'userState', 'companyState', 'bookingState', 'promotionState', 'menusushiState', 'newState', 'roleState']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const loggerMiddleware = store => (
  next => (
    action => {
      console.log('[Middleware]', action);
      const result = next(action);
      console.log('[Middleware result]', store.getState());
      return result;
    }
  )
);

const store = createStore(
  persistedReducer, 
  {}, 
  composeEnhancers(applyMiddleware(thunk, loggerMiddleware))
);

const persistor = persistStore(store);

export {
  store,
  persistor
};
