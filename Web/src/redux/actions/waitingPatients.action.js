import {
    SET_ALL,
    SET_HIGHEST_PATIENT,
    SET_SEARCH_INFO, SET_SELECTED_PATIENT,
    SET_FINISHED_ID
} from '../types/waitingPatients.types';

export const setAllWaitingPatients = (data) => {
    return {
        type: SET_ALL,
        payload: data,
    }
}

export const setHighestWaitingPatient = (patient) => {
    return {
        type: SET_HIGHEST_PATIENT,
        payload: patient,
    }
}

export const setSearchInfo = (phone) => {
    return {
        type: SET_SEARCH_INFO,
        payload: phone,
    }
}

export const setSelectedPatient = (patient) => {
    return {
        type: SET_SELECTED_PATIENT,
        payload: patient,
    }
}

export const setFinishedId = (id) => {
    return {
        type: SET_FINISHED_ID,
        payload: id,
    }
}
