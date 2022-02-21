
import {
    SET_ALL_NEW_POLLS,
    SET_ALL_PROCESSED_POLLS,
    ADD_NEW_POLL,
    DELETE_NEW_POLL,
    UPDATE_NEW_POLL,
    ADD_NEW_PROCESSED_POLLS
} from '../types/polls.types';

export const setAllNewPolls = (newPolls) => {
    return {
        type: SET_ALL_NEW_POLLS,
        payload: newPolls,
    }
}

export const setAllProcessedPolls = (processedPolls) => {
    return {
        type: SET_ALL_PROCESSED_POLLS,
        payload: processedPolls,
    }
}

export const addNewPoll = (poll) => {
    return {
        type: ADD_NEW_POLL,
        payload: poll,
    }
}

export const deleteNewPoll = (id) => {
    return {
        type: DELETE_NEW_POLL,
        payload: id,
    }
}

export const updateNewPoll = (poll) => {
    return {
        type: UPDATE_NEW_POLL,
        payload: poll,
    }
}

export const addNewProcessedPoll = (processedPoll) => {
    return {
        type: ADD_NEW_PROCESSED_POLLS,
        payload: processedPoll,
    }
}
