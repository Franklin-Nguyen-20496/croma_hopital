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

const setUnRoomPatients = (list) => {
    return {
        type: SET_UN_ROOM_PATIENTS,
        payload: list,
    }
}

const setUnDoctorPatients = (list) => {
    return {
        type: SET_UN_DOCTOR_PATIENTS,
        payload: list,
    }
}

const setNormalPatients = (list) => {
    return {
        type: SET_NORMAL_PATIENTS,
        payload: list,
    }
}

const addNewUnRoomPatient = (item) => {
    return {
        type: ADD_NEW_UN_ROOM_PATIENT,
        payload: item,
    }
}

const addNewUnDoctorPatient = (item) => {
    return {
        type: ADD_NEW_UN_DOCTOR_PATIENT,
        payload: item,
    }
}

const addNewNormalPatient = (item) => {
    return {
        type: ADD_NEW_NORMAL_PATIENT,
        payload: item,
    }
}

const updateNormalPatient = (item) => {
    return {
        type: UPDATE_NORMAL_PATIENT,
        payload: item,
    }
}

const deleteUnRoomPatient = (id) => {
    return {
        type: DELETE_UN_ROOM_PATIENT,
        payload: id,
    }
}

const deleteUnDoctorPatient = (id) => {
    return {
        type: DELETE_UN_DOCTOR_PATIENT,
        payload: id,
    }
}

const deleteNormalPatient = (id) => {
    return {
        type: DELETE_NORMAL_PATIENT,
        payload: id,
    }
}

export {
    setUnRoomPatients,
    setUnDoctorPatients,
    setNormalPatients,
    addNewUnRoomPatient,
    addNewUnDoctorPatient,
    addNewNormalPatient,
    updateNormalPatient,
    deleteUnRoomPatient,
    deleteUnDoctorPatient,
    deleteNormalPatient,
}
