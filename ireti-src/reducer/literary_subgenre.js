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