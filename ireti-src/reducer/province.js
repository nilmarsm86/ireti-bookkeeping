export const sqlReducerProvince = (state, action) => {
    switch (action.type) {
        case 'SELECT_PROVINCE':
            return { ...state, data: action.payload };
        case 'INSERT_PROVINCE':            
            let newData = [...state.data, action.payload];
            return { ...state, data: newData };
        case 'UPDATE_PROVINCE':
            let updateData = [...state.data].map((item) => ((action.payload.id === item.id) ? action.payload : item));
            return { ...state, data: updateData };
        case 'DELETE_PROVINCE':
            let removeData = [...state.data].filter((item) => (action.payload.id !== item.id));
            return { ...state, data: removeData };
        default:
            return state;
    }
};