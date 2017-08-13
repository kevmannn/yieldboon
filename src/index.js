import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { install } from 'redux-loop';
import { REHYDRATE } from 'redux-persist/constants';
import { createLogger } from 'redux-logger';
import createActionBuffer from 'redux-action-buffer';
import { Route, BrowserRouter } from 'react-router-dom';
import { localforage as storage } from 'localforage';
import { persistStore, autoRehydrate } from 'redux-persist';
import { compose, createStore, applyMiddleware } from 'redux';

import App from './App';
import rootReducer from './reducers';

// window.Perf = require('react-addons-perf');
// window.Raven.config('https://6d6015b3f0c74b248110aa220a439f12@sentry.io/201236').install();

const isDev = process.env.NODE_ENV !== 'production';
const composeEnhancers = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

// Enhance the store and apply middleware for action buffering and thunks.
const store = createStore(
  rootReducer,
  composeEnhancers(
    // install(),
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
