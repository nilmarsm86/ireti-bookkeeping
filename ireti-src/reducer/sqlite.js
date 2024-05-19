export const sqlReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT':
            return { ...state, data: action.payload };
        case 'INSERT':
            let newData = [...state.data, action.payload];
            return { ...state, data: newData };
        case 'UPDATE':
            let updateData = [...state.data].map((item) => ((action.payload.id === item.id) ? action.payload : item));
            return { ...state, data: updateData };
        case 'DELETE':
            let removeData = [...state.data].filter((item) => (action.payload.id !== item.id));
            return { ...state, data: removeData };
        default:
            return state;
    }
};