const availableforReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABLE_FOR":
      return action.payload;
    default:
      return state;
  }
};

export default availableforReducer;
