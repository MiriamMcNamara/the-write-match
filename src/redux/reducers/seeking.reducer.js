const seekingReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SEEKING":
      return action.payload;
    default:
      return state;
  }
};

export default seekingReducer;
