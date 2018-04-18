import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text } from 'native-base';
import PropTypes from 'prop-types';

class TimeSlot extends Component {
  render() {
    const { diff } = this.props;
    if (diff >= 15) {
      return (
        <ListItem style={{ backgroundColor: 'white' }}>
          <Body>
            <Text>Available timeslot</Text>
            <Text note>{diff} minutes</Text>
          </Body>
        </ListItem>
      );
    }
    return <View />;
  }
}


TimeSlot.propTypes = {
  diff: PropTypes.number,
};

TimeSlot.defaultProps = {
  diff: null,
};

export default TimeSlot;
