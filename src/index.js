import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { REHYDRATE } from 'redux-persist/constants';
import { createLogger } from 'redux-logger';
import createActionBuffer from 'redux-action-buffer';
// import { middleware as pack } from 'redux-pack';
import { Route, BrowserRouter } from 'react-router-dom';
import { localforage as storage } from 'localforage';
import { persistStore, autoRehydrate } from 'redux-persist';
import { compose, createStore, applyMiddleware } from 'redux';

import App from './App';
import rootReducer from './reducers';

const isDev = process.env.NODE_ENV !== 'production';
const composeEnhancers = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

// Enhance the store with caching, action buffering (necessary due to caching), and the
// abillity to dispatch async action creators.
const store = createStore(
  rootReducer,
  composeEnhancers(
    autoRehydrate(),
    applyMiddleware(...[createActionBuffer(REHYDRATE), thunk].concat(isDev ? createLogger() : []))
  )
)

persistStore(store, { storage });
render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
