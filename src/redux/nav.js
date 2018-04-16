import Navigation from '../components/Navigation';

const initialState = Navigation.router.getStateForAction(Navigation.router.getActionForPathAndParams('Auth'));

export default (state = initialState, action) => {
  const nextState = Navigation.router.getStateForAction(action, state);
  return nextState || state;
};
