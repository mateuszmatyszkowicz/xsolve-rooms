import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text } from 'native-base';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Room extends Component {
  constructor() {
    super();
    this.onRoomPress = this.onRoomPress.bind(this);
  }

  onRoomPress() {
    const { resourceEmail, resourceName } = this.props.item;
    this.props.navigateToEvents({ resourceEmail, resourceName });
  }

  renderNextMeetingInfo() {
    const { resourceMeeting, resourceBusyTo } = this.props.item;
    if (resourceMeeting) {
      return <Text note>Next meeting: {resourceMeeting}</Text>;
    } else if (resourceBusyTo) {
      return <Text note>Busy to: {resourceBusyTo}</Text>;
    }
    return <View />;
  }

  render() {
    const { resourceName } = this.props.item;
    return (
      <ListItem button onPress={this.onRoomPress}>
        <Body>
          <Text>{resourceName}</Text>
          {this.renderNextMeetingInfo()}
        </Body>
      </ListItem>
    );
  }
}

Room.propTypes = {
  item: PropTypes.shape({
    resourceName: PropTypes.string,
    resourceEmail: PropTypes.string,
    resourceMeeting: PropTypes.string,
    resourceBusyTo: PropTypes.string,
  }).isRequired,
  navigateToEvents: PropTypes.func.isRequired,
};

const dispatchToProps = {
  navigateToEvents: data => NavigationActions.navigate({ routeName: 'Events', params: data }),
};

export default connect(null, dispatchToProps)(Room);
