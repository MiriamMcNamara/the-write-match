const selectedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default selectedReducer;
