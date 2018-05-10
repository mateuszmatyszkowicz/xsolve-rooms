import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator, SwitchNavigator, TabBarBottom } from 'react-navigation';


import AllRooms from '../screens/Rooms/All';
import FreeRooms from '../screens/Rooms/Free';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Events from '../screens/Events';
import CustomHeader from './CustomHeader';

const AuthStack = StackNavigator({
  Login,
});

const TabNav = TabNavigator({
  FreeRooms,
  Dashboard,
  AllRooms,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;

      let iconName;

      switch (routeName) {
        case 'FreeRooms':
          iconName = 'ios-happy';
          break;
        case 'AllRooms':
          iconName = 'ios-list-box';
          break;
        case 'Dashboard':
          iconName = 'ios-contact-outline';
          break;
        default:
          iconName = 'ios-happy';
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    header: (
      <CustomHeader />
    ),
  }),
  tabBarOptions: {
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});

const AppStack = StackNavigator({
  TabNav,
  Events,
});

export default SwitchNavigator({
  Auth: AuthStack,
  App: AppStack,
});
