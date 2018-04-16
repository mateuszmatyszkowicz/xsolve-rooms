import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
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
  render() {
    return (
      <Navigation navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
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
