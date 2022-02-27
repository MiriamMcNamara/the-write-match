const availableforReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABLE_FOR":
      return action.payload;
    case "UNSET_AVAILABLE_FOR":
      return [];
    default:
      return state;
  }
};

export default availableforReducer;
