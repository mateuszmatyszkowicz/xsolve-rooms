import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';

import { getFreeRooms } from '../../redux/rooms';
import RoomsList from '../../components/RoomsList';

class FreeRooms extends Component {
  static navigationOptions() {
    return {
      title: 'Free rooms',
    };
  }

  componentWillMount() {
    this.props.getFreeRooms();
  }

  render() {
    return (
      <RoomsList
        data={this.props.freeRooms}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.props.getFreeRooms}
          />
        }
      />
    );
  }
}

FreeRooms.propTypes = {
  loading: PropTypes.bool.isRequired,
  getFreeRooms: PropTypes.func.isRequired,
  freeRooms: PropTypes.arrayOf(PropTypes.shape({
    resourceName: PropTypes.string,
  })),
};

FreeRooms.defaultProps = {
  freeRooms: [],
};

const mapStateToProps = state => ({
  freeRooms: state.rooms.data.filter(t => t.resourceIsFree && t.buildingId.includes(state.context)),
  loading: state.rooms.loading,
});

export default connect(mapStateToProps, { getFreeRooms })(FreeRooms);
