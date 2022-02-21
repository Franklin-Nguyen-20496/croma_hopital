
import {
    SET_ALL_MEDICINES,
    UPDATE_ONE_MEDICINE,
}
    from '../types/medicines.types';

const initialState = {
    list: [],
}

const medicinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_MEDICINES:
            return {
                ...state,
                list: action.payload,
            }
        case UPDATE_ONE_MEDICINE:
            const newList = [...state.list].map(item => {
                if (action.payload.id === item.id) {
                    return action.payload;
                }
                else return item;
            })
            return {
                ...state,
                list: newList,
            }

        default:
            return state;
    }
}

export default medicinesReducer;