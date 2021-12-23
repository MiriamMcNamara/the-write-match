const matchesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MATCHES':
      return action.payload;
    case 'REMOVE_MATCH':
      return state-action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default matchesReducer;
