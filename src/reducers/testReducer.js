const testReducer = (state = {name: "Initial", status: 0}, action) => {
  switch (action.type) {
    case "INITIALFUN":
      return (state = "Initital + Fun");
    case "INITIALBAD":
        return (state = "Initital - bad");
    default:
      return state;
  }
};

export default testReducer;
