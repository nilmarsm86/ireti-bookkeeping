export const sqlReducerCountry = (state, action) => {
  switch (action.type) {
    case "SELECT_COUNTRY":
      return { ...state, data: action.payload };
    case "INSERT_COUNTRY":
      let newData = [...state.data, action.payload];
      return { ...state, data: newData };
    case "UPDATE_COUNTRY":
      let updateData = [...state.data].map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return { ...state, data: updateData };
    case "DELETE_COUNTRY":
      let removeData = [...state.data].filter(
        (item) => action.payload.id !== item.id
      );
      return { ...state, data: removeData };
    default:
      return state;
  }
};
