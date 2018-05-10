import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text } from 'native-base';
import PropTypes from 'prop-types';

class Event extends Component {
  renderMeetingTimeframe() {
    const { start, end } = this.props.item;
    if (start) {
      return <Text note>{start} - {end}</Text>;
    }
    return <View />;
  }

  render() {
    const { summary, location } = this.props.item;
    return (
      <ListItem>
        <Body>
          <Text>{summary}{this.props.showLocation && location && ` - ${location}`}</Text>
          {this.renderMeetingTimeframe()}
        </Body>
      </ListItem>
    );
  }
}

Event.propTypes = {
  item: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    summary: PropTypes.string,
    location: PropTypes.string,
  }),
  showLocation: PropTypes.bool,
};

Event.defaultProps = {
  item: {
    start: '',
    end: '',
    location: '',
    summary: 'No title',
  },
  showLocation: false,
};

export default Event;
