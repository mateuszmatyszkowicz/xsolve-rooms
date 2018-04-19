import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Header, Body, Picker, Icon } from 'native-base';
import PropTypes from 'prop-types';

import { setContext } from '../redux/context';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingTop: Constants.statusBarHeight,
      },
    }),
  },
});

class CustomHeader extends Component {
  constructor() {
    super();
    this.contextChanged = this.contextChanged.bind(this);
  }

  contextChanged(value) {
    this.props.setContext(value);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Body>
            <Picker
              style={{ width: 150 }}
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.props.context}
              onValueChange={this.contextChanged}
            >
              <Picker.Item label="Gliwice" value="Glwice" />
              <Picker.Item label="Warszawa" value="Warszawa" />
            </Picker>
          </Body>
        </Header>
      </View>
    );
  }
}

CustomHeader.propTypes = {
  context: PropTypes.string.isRequired,
  setContext: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  context: state.context,
});

const dispathToProps = {
  setContext,
};

export default connect(mapStateToProps, dispathToProps)(CustomHeader);
