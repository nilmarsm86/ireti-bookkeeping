export const sqlReducerSetting = (state, action) => {
  switch (action.type) {
    case "SELECT_SETTING":
      return { ...state, data: action.payload };
    /*case "INSERT_PUBLISHING":
      let newData = [...state.data, action.payload];
      return { ...state, data: newData };*/
    case "UPDATE_SETTING":
      let updateData = [...state.data].map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return { ...state, data: updateData };
    /*case "DELETE_PUBLISHING":
      let removeData = [...state.data].filter(
        (item) => action.payload.id !== item.id
      );
      return { ...state, data: removeData };*/
    default:
      return state;
  }
};

export const screenReducer = (state, action) => {
  switch (action.type) {
    case "AFTER_SAVE":
      return {
        ...state,
        showDismissAlert: true,
        dismissMsg: action.payload,
        showLoader: false,
      };
    case "HIDE_DISMISS_ALERT":
      return { ...state, showDismissAlert: false };
    case "SHOW_MODAL_ALERT":
      return { ...state, showModalAlert: true };
    case "HIDE_MODAL_ALERT":
      return { ...state, showModalAlert: false };
    case "SHOW_LOADER":
      return { ...state, showLoader: true };
    case "SHOW_MODIFICATION_ALERT":
      return { ...state, showModificationAlert: true };
    case "HIDE_MODIFICATION_ALERT":
      return { ...state, showModificationAlert: false };
    default:
      return state;
  }
};
