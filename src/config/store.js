import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import auth from '../redux/auth';
import nav from '../redux/nav';
import rooms from '../redux/rooms';
import events from '../redux/events';
import context from '../redux/context';
import { reduxNavigationMiddleware } from '../components/ReduxNavigator';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav'],
};

const reducers = combineReducers({
  auth,
  nav,
  rooms,
  events,
  context,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducers,
  compose(applyMiddleware(...[
    thunk,
    reduxPromise(),
    reduxNavigationMiddleware,
    logger,
  ])),
);

const init = () => {
  const state = store.getState();
  const { tokens } = state.auth;

  if (tokens.accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;

    const appNavigationAction = NavigationActions.navigate({ routeName: 'App' });
    store.dispatch(appNavigationAction);
  }
};

export const persistor = persistStore(store, null, init);
