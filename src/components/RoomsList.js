import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Room from '../components/Room';

export default class RoomsList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={item => item.resourceId}
        renderItem={({ item }) => (
          <Room item={item} />
        )}
        refreshControl={this.props.refreshControl}
      />
    );
  }
}

RoomsList.propTypes = {
  refreshControl: PropTypes.element,
  data: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      resourceId: PropTypes.string,
    }),
  })),
};

RoomsList.defaultProps = {
  refreshControl: <View />,
  data: [],
};
