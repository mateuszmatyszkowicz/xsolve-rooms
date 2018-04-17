import { Alert } from 'react-native';

export const errorHelper = (error) => {
  Alert.alert('Error', error.message);
};
