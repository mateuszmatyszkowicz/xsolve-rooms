import { NavigationActions } from 'react-navigation';

import { Firebase } from '../helpers';

export const AUTH = 'AUTH';

const initialState = {
  tokens: {},
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AUTH}_PENDING`:
      return { ...state, loading: true };

    case `${AUTH}_FULFILLED`:
      return {
        ...state, tokens: action.payload, error: {}, loading: false,
      };

    case `${AUTH}_REJECTED`:
      return { ...state, loading: false, error: action.payload };

    case `${AUTH}_TOKEN_REFRESH`:
      return { ...state, tokens: { ...state.tokens, ...action.payload } };

    default:
      return state;
  }
};

export const login = () => dispatch => dispatch({
  type: AUTH,
  async payload() {
    const tokens = await Firebase.login();

    const appNavigationAction = NavigationActions.navigate({ routeName: 'App' });
    dispatch(appNavigationAction);

    return tokens;
  },
});
