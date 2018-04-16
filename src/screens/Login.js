import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

import { login } from '../redux/auth';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Login extends Component {
  static navigationOptions() {
    return {
      header: null,
    };
  }

  constructor(props) {
    super(props);

    this.initiateLogin = this.initiateLogin.bind(this);
  }

  initiateLogin() {
    this.props.login();
  }

  renderAuth() {
    if (this.props.loading) {
      return <ActivityIndicator animating />;
    }

    return (
      <Button title="Sign in with Google" onPress={this.initiateLogin} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAuth()}
      </View>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
