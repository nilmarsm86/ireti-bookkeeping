export const literarySubgenreReducer = (state, action) => {
    switch (action.type) {
        case 'findAllLiterarySubgenre':
            return { ...state, data: action.payload };
        case 'addLiterarySubgenre':
            let newData = [...state.data, action.payload];
            return { ...state, data: newData };
        case 'updateLiterarySubgenre':
            let updateData = [...state.data].map((item) => ((action.payload.id === item.id) ? action.payload : item));
            return { ...state, data: updateData };
        case 'removeLiterarySubgenre':
            let removeData = [...state.data].filter((item) => (action.payload.id !== item.id));
            return { ...state, data: removeData };
        default:
            return state;
    }
};

export const screenReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_DISMISS_ALERT':
            return { ...state, showDismissAlert: true };
        case 'HIDE_DISMISS_ALERT':
            return { ...state, showDismissAlert: false };
        case 'SHOW_MODAL_ALERT':
            return { ...state, showModalAlert: true };
        case 'HIDE_MODAL_ALERT':
            return { ...state, showModalAlert: false };
        default:
            return state;
    }
};