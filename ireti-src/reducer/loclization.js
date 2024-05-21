export const screenReducer = (state, action) => {
    switch (action.type) {
        case 'CHNAGE_TAB':
            return { ...state, tab: action.payload };
        case 'AFTER_SAVE':
            return { ...state, showDismissAlert: true, dismissMsg: action.payload, showLoader: false };
        case 'HIDE_DISMISS_ALERT':
            return { ...state, showDismissAlert: false };
        case 'SHOW_MODAL_ALERT':
            return { ...state, showModalAlert: true };
        case 'HIDE_MODAL_ALERT':
            return { ...state, showModalAlert: false };
        case 'SHOW_LOADER':
            return { ...state, showLoader: true };
        default:
            return state;
    }
};

export const sqlReducerCountry = (state, action) => {
    switch (action.type) {
        case 'SELECT_COUNTRY':
            return { ...state, data: action.payload };
        case 'INSERT_COUNTRY':            
            let newData = [...state.data, action.payload];
            return { ...state, data: newData };
        case 'UPDATE_COUNTRY':
            let updateData = [...state.data].map((item) => ((action.payload.id === item.id) ? action.payload : item));
            return { ...state, data: updateData };
        case 'DELETE_COUNTRY':
            let removeData = [...state.data].filter((item) => (action.payload.id !== item.id));
            return { ...state, data: removeData };
        default:
            return state;
    }
};