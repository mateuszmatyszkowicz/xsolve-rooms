import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';
import { Text, View } from 'native-base'
import PropTypes from 'prop-types';
import { getMyEvents } from '../redux/events';
import Event from '../components/Event';
import ListEmptyComponent from '../components/ListEmptyComponent';
class Dashboard extends Component {
  static navigationOptions() {
    return {
      title: 'Dashboard',
    };
  }

  componentWillMount() {
    this.getMyEvents();
  }

  getMyEvents = () => this.props.getMyEvents(this.props.email);

  render() {
    return (
      <FlatList
        data={this.props.events}
        keyExtractor={item => `${item.start}${item.summary}`}
        renderItem={({ item }) => (
          <Event item={item} showLocation />
        )}
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.getMyEvents}
          />
        }
        contentContainerStyle={[{ flexGrow: 1 }, this.props.events.length ? null : { justifyContent: 'center' }]}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  }
}

Dashboard.propTypes = {
  email: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  getMyEvents: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  events: [],
  loading: true,
};

const mapStateToProps = state => ({
  email: state.auth.user.email,
  events: state.events.data[state.auth.user.email],
  loading: state.events.loading,
});

export default connect(mapStateToProps, { getMyEvents })(Dashboard);
