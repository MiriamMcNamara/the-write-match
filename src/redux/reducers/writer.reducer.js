const writerReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_WRITER":
      return action.payload;
    case "UNSET_WRITER":
      return [];
    default:
      return state;
  }
};

export default writerReducer;
