export const navigationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_HELP':
        return {
          ...state,
          showHelp: true,
        };
        case 'GO_ACCOUNTING':
          return {
            ...state,
            screen: 'accounting',
          };
          case 'GO_BOOK':
          return {
            ...state,
            screen: 'book',
          };        
      default:
        return state;
    }
  };