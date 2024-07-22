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
    case "SHOW_MODAL_FORM":
      return { ...state, showModalForm: true };
    case "HIDE_MODAL_FORM":
      return { ...state, showModalForm: false };
    case "SHOW_MODAL_DETAIL_AUTHOR":
      return { ...state, showDetail: true };
    case "HIDE_MODAL_DETAIL_AUTHOR":
      return { ...state, showDetail: false };
    case "SHOW_ALERT":
      return { ...state, showExistenceAlert: true, alertMsg: action.payload };
    case "HIDE_ALERT":
      return { ...state, showExistenceAlert: false };
    default:
      return state;
  }
};

export const sqlReducerBook = (state, action) => {
  switch (action.type) {
    case "SELECT_BOOK":
      return { ...state, data: action.payload };
    case "INSERT_BOOK":
      let newData = [...state.data, action.payload];
      return { ...state, data: newData };
    case "UPDATE_BOOK":
      let updateData = [...state.data].map((item) =>
        action.payload.id === item.id ? action.payload : item
      );
      return { ...state, data: updateData };
    case "DELETE_BOOK":
      let removeData = [...state.data].filter(
        (item) => action.payload.id !== item.id
      );
      return { ...state, data: removeData };
    default:
      return state;
  }
};
