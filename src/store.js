import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

let store;

export default function configureStore(initialState = {}) {
  const enhancers = [applyMiddleware(thunk)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  return store;
}

export const getStore = () => store;
