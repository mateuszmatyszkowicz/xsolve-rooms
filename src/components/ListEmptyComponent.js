import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const ListEmpty = () => (
  <View style={styles.container}>
    <Text>List is empty</Text>
    <Text>Pull down to refresh</Text>
  </View>
);

export default ListEmpty;
