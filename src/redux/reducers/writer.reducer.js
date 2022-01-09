const writerReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_WRITER":
      return action.payload;
    default:
      return state;
  }
};

export default writerReducer;
