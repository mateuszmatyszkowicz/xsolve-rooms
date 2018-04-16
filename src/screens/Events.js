import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Event from '../../src/components/Event';
import { getRoomEventsById } from '../redux/events';


class Events extends Component {
  static navigationOptions(props) {
    const { params } = props.navigation.state;
    return {
      title: params.resourceName,
    };
  }

  componentWillMount() {
    const { resourceEmail } = this.props;
    this.props.getRoomEventsById(resourceEmail);
  }

  render() {
    return (
      <FlatList
        data={this.props.events}
        keyExtractor={item => item.start + item.summary}
        renderItem={({ item }) => (
          <Event item={item} />
        )}
      />
    );
  }
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string,
  })),
  getRoomEventsById: PropTypes.func.isRequired,
  resourceEmail: PropTypes.string.isRequired,
};

Events.defaultProps = {
  events: [],
};

const mapToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  const events = state.events.data[params.resourceEmail];

  return { events, ...params };
};

export default connect(mapToProps, { getRoomEventsById })(Events);
