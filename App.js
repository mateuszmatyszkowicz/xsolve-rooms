import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import moment from 'moment';

import { Firebase } from './src/helpers';
import { store, persistor } from './src/config/store';
import { ReduxNavigator } from './src/components/ReduxNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tokenRefreshInProgress: false,
    };
  }

  componentWillMount() {
    Firebase.init();

    axios.interceptors.request.use(
      async (config) => {
        if (!this.state.tokenRefreshInProgress) {
          this.state.tokenRefreshInProgress = true;

          const state = store.getState();
          const { expiresIn, refreshToken } = state.auth.tokens;
          const requestConfig = config;

          if (moment(expiresIn).isBefore()) {
            const tokens = await Firebase.refreshToken(refreshToken);

            const authorizationHeader = `Bearer ${tokens.accessToken}`;
            requestConfig.headers.Authorization = authorizationHeader;
            axios.defaults.headers.common.Authorization = authorizationHeader;

            store.dispatch({
              type: 'AUTH_TOKEN_REFRESH',
              payload: tokens,
            });

            this.state.tokenRefreshInProgress = false;
          }
        }
        return config;
      },
      error => Promise.reject(error),
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <ReduxNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
