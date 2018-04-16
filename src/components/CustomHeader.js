import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Header, Body, Picker } from 'native-base';
import PropTypes from 'prop-types';

import { setContext } from '../redux/context';

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
      <View style={{ paddingTop: Constants.statusBarHeight }} >
        <Header style={{ backgroundColor: 'white' }}>
          <Body>
            <Picker
              style={{ width: 150 }}
              mode="dropdown"
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
