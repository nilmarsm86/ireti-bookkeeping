export const navigationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_HELP":
      return {
        ...state,
        showHelp: true,
      };
    case "GO_ACCOUNTING":
      return {
        ...state,
        screen: "accounting",
      };
    case "GO_BOOK":
      return {
        ...state,
        screen: "book",
      };
    case "GO_AUTHOR":
      return {
        ...state,
        screen: "author",
      };
    case "GO_SUBGENRE":
      return {
        ...state,
        screen: "subgenre",
      };
    case "GO_PUBLISHING":
      return {
        ...state,
        screen: "publishing",
      };
    case "GO_COUNTRY":
      return {
        ...state,
        screen: "country",
      };
    default:
      return state;
  }
};
