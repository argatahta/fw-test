import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = [];

if(process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middleware.push(logger)
}

const connectWithReduxMiddleware = applyMiddleware(...middleware)(createStore);

const store = connectWithReduxMiddleware(rootReducer);

export const configureStore = () => store