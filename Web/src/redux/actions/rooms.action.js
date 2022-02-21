
import {
    SET_ALL_ROOMS,
    ADD_NEW_ROOM,
    UPDATE_ONE_ROOM
} from '../types/rooms.types';

export const setAllRooms = (rooms) => {
    return {
        type: SET_ALL_ROOMS,
        payload: rooms,
    }
}

export const addNewRoom = (room) => {
    return {
        type: ADD_NEW_ROOM,
        payload: room,
    }
}

export const updateOneRoom = (room) => {
    return {
        type: UPDATE_ONE_ROOM,
        payload: room,
    }
}
