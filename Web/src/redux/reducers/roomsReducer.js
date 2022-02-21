
import { SET_ALL_ROOMS, ADD_NEW_ROOM, UPDATE_ONE_ROOM } from '../types/rooms.types';

const initialState = {
    list: [],
}

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_ROOMS:
            return {
                ...state,
                list: action.payload
            }

        case ADD_NEW_ROOM:
            const newList2 = [...state.list];
            newList2.push(action.payload);
            return {
                ...state,
                list: newList2
            }

        case UPDATE_ONE_ROOM:
            const newList = state.list.map(room => {
                if (room.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return room;
                }
            })
            return {
                ...state,
                list: newList,
            }

        default:
            return state;
    }
}

export default roomsReducer;