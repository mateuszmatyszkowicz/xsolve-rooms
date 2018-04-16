const CONTEXT_SET = 'CONTEXT_SET';

export default(state = 'Glwice', action) => {
  switch (action.type) {
    case CONTEXT_SET:
      return action.payload;

    default:
      return state;
  }
};

export const setContext = context => ({
  type: CONTEXT_SET,
  payload: context,
});
