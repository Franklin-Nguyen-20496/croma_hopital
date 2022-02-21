
import {
    SET_ALL,
    SET_HIGHEST_PATIENT,
    SET_SEARCH_INFO,
    SET_SELECTED_PATIENT,
    SET_FINISHED_ID,
    DELETE_ONE_WAITING_PATIENT
} from '../types/waitingPatients.types';

const initialState = {
    list: [],
    selectedPatient: {},
    searchInfo: '',
    finishedId: '',
}

const waitingPatientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL:
            return {
                ...state,
                list: action.payload,
            }

        case SET_HIGHEST_PATIENT:
            const newList = [...state.list];
            newList.shift();
            return {
                ...state,
                list: newList,
            }

        case SET_SEARCH_INFO:
            return {
                ...state,
                searchInfo: action.payload,
            }

        case SET_SELECTED_PATIENT:
            return {
                ...state,
                selectedPatient: action.payload,
            }
        case SET_FINISHED_ID:
            return {
                ...state,
                finishedId: action.payload
            }
        case DELETE_ONE_WAITING_PATIENT:
            console.log('redux payload delete on waiting patient', action.payload)
            const newListDelete = [...state.list].filter(id => id !== action.payload)
            return {
                ...state,
                list: newListDelete,
            }
        default: return state;
    }
}

export default waitingPatientsReducer;