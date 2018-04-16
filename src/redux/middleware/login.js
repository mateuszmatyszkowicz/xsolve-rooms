import { NavigationActions } from 'react-navigation';

export default () => next => (action) => {
  next(action);

  switch (action.type) {
    case 'AUTH_FULFILLED': {
      const appNavigationAction = NavigationActions.navigate({ routeName: 'App' });
      next(appNavigationAction);
      break;
    }
    default:
      break;
  }
};
