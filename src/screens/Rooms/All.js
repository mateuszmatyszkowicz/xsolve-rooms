import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RoomsList from '../../components/RoomsList';

class AllRooms extends Component {
  static navigationOptions() {
    return {
      title: 'All rooms',
    };
  }

  render() {
    return (
      <RoomsList data={this.props.allRooms} />
    );
  }
}

const mapStateToProps = state => ({
  allRooms: state.rooms.data.filter(t => t.buildingId.includes(state.context)),
});

AllRooms.propTypes = {
  allRooms: PropTypes.arrayOf(PropTypes.shape({
  })),
};

AllRooms.defaultProps = {
  allRooms: [],
};

export default connect(mapStateToProps, null)(AllRooms);
