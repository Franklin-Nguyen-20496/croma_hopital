
import {
    SET_ALL_NEW_POLLS,
    SET_ALL_PROCESSED_POLLS,
    ADD_NEW_POLL,
    DELETE_NEW_POLL,
    UPDATE_NEW_POLL,
    ADD_NEW_PROCESSED_POLLS
} from '../types/polls.types';

const initialState = {
    newPolls: [],
    processedPolls: [],
}

const pollsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_NEW_POLLS:
            return {
                ...state,
                newPolls: action.payload
            }

        case SET_ALL_PROCESSED_POLLS:
            return {
                ...state,
                processedPolls: action.payload
            }

        case ADD_NEW_POLL:
            const newList2 = [...state.newPolls];
            newList2.push(action.payload);
            return {
                ...state,
                newPolls: newList2,
            }

        case DELETE_NEW_POLL:
            const newList = state.newPolls.filter(poll => poll.id !== action.payload);
            return {
                ...state,
                newPolls: newList,
            }

        case UPDATE_NEW_POLL:
            const newList3 = state.newPolls.map(poll => {
                if (poll.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return poll;
                }
            });
            return {
                ...state,
                newPolls: newList3,
            }

        case ADD_NEW_PROCESSED_POLLS:
            const newPolls = [...state.newPolls].filter(poll => poll.id !== action.payload.id);
            const newList4 = [...state.processedPolls];
            newList4.push(action.payload);
            return {
                ...state,
                processedPolls: newList4,
                newPolls: newPolls,
            }
        default:
            return state;
    }
}

export default pollsReducer;