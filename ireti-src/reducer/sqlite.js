export const sqlReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_':
            return { ...state, data: action.payload };
        case 'INSERT_':
            console.log('generic');
            let newData = [...state.data, action.payload];
            return { ...state, data: newData };
        case 'UPDATE_':
            let updateData = [...state.data].map((item) => ((action.payload.id === item.id) ? action.payload : item));
            return { ...state, data: updateData };
        case 'DELETE_':
            let removeData = [...state.data].filter((item) => (action.payload.id !== item.id));
            return { ...state, data: removeData };
        default:
            return state;
    }
};