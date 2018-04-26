import React from 'react';
import { BackHandler, Platform } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import Navigation from './Navigation';

export const reduxNavigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const addListener = createReduxBoundAddListener('root');

class App extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    // Check that is the main screen
    const { index, routes } = nav.routes[nav.index];
    if (routes[index].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;

    return (
      <Navigation navigation={addNavigationHelpers({
        dispatch,
        state: nav,
        addListener,
      })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export const ReduxNavigator = connect(mapStateToProps)(App);
