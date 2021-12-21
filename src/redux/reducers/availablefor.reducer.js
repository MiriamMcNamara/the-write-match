const availableforReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_FOR':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default availableforReducer;
