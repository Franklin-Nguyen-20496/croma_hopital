
import {
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_ALL_USERS,
    RESET_USERS,
    SELECT_USER,
    SET_UPDATE_TRUE,
    SET_UPDATE_FALSE,
    SET_POSITION_UPDATE_USER
} from '../types/users.types';

export const setPositionUpdateUser = (position) => {
    return {
        type: SET_POSITION_UPDATE_USER,
        payload: position,
    }
}

export const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users,
    }
}

export const addUser = (data) => {
    return {
        type: ADD_USER,
        payload: data
    }
}

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id
    }
}

export const resetUsers = () => {
    return {
        type: RESET_USERS,
    }
}

export const selectUser = (user) => {
    return {
        type: SELECT_USER,
        payload: user,
    }
}

export const setUpdateTrue = () => {
    return {
        type: SET_UPDATE_TRUE,
    }
}

export const setUpdateFalse = () => {
    return {
        type: SET_UPDATE_FALSE,
    }
}

// export const resetSelectUser = () => {
//     console.log('setUpdateFalse');
//     return {
//         type: SET_UPDATE_FALSE,
//     }
// }