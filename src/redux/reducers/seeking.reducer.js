const seekingReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SEEKING":
      return action.payload;
    case "UNSET_SEEKING":
      return [];
    default:
      return state;
  }
};

export default seekingReducer;
