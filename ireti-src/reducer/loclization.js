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