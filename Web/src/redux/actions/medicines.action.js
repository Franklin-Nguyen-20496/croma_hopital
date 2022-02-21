import {
    SET_ALL_MEDICINES,
    UPDATE_ONE_MEDICINE,
} from '../types/medicines.types';

export const setAllMedicines = (values) => {
    return {
        type: SET_ALL_MEDICINES,
        payload: values,
    }
}

export const updateOneMedicine = (value) => {
    return {
        type: UPDATE_ONE_MEDICINE,
        payload: value,
    }
}