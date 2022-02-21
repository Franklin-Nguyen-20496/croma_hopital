
import {
    SET_UN_ROOM_PATIENTS,
    SET_UN_DOCTOR_PATIENTS,
    SET_NORMAL_PATIENTS,
    ADD_NEW_UN_ROOM_PATIENT,
    ADD_NEW_UN_DOCTOR_PATIENT,
    ADD_NEW_NORMAL_PATIENT,
    UPDATE_NORMAL_PATIENT,
    DELETE_UN_ROOM_PATIENT,
    DELETE_UN_DOCTOR_PATIENT,
    DELETE_NORMAL_PATIENT,
} from '../types/patients.types';

const initialState = {
    unRoom: [],
    unDoctor: [],
    normal: [],
}

const patientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UN_ROOM_PATIENTS:
            return {
                ...state,
                unRoom: action.payload,
            }

        case SET_UN_DOCTOR_PATIENTS:
            return {
                ...state,
                unDoctor: action.payload,
            }

        case SET_NORMAL_PATIENTS:
            return {
                ...state,
                normal: action.payload,
            }
        case ADD_NEW_UN_ROOM_PATIENT:
            const newUnRoom = [...state.unRoom, action.payload];
            return {
                ...state,
                unRoom: newUnRoom,
            }

        case ADD_NEW_UN_DOCTOR_PATIENT:
            const newUnDoctor = [...state.unDoctor, action.payload];
            return {
                ...state,
                unDoctor: newUnDoctor,
            }

        case ADD_NEW_NORMAL_PATIENT:
            const newNormal = [...state.normal, action.payload];
            return {
                ...state,
                normal: newNormal,
            };
        case UPDATE_NORMAL_PATIENT:
            console.log('state in update normal patient', state);
            const newList = [...state.normal].map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                else return item;
            });
            return {
                ...state,
                normal: newList,
            };

        case DELETE_UN_ROOM_PATIENT:
            const newList2 = [...state.unRoom].filter(item => action.payload !== item.id);
            return {
                ...state,
                unRoom: newList2,
            }

        case DELETE_UN_DOCTOR_PATIENT:
            const newList3 = [...state.unDoctor].filter(item => action.payload !== item.id);
            return {
                ...state,
                unDoctor: newList3,
            }

        case DELETE_NORMAL_PATIENT:
            const newList4 = [...state.normal].filter(item => action.payload !== item.id);
            return {
                ...state,
                normal: newList4,
            }
        default:
            return state;
    }
}

export default patientsReducer;
