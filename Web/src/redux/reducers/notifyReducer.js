
import { NOTIFY_INFO, NOTIFY_WARN, NOTIFY_ERROR, HIDE_NOTIFY } from '../types/notify.types';

const initialState = {
    color: 'text-info',
    message: '',
    slide: false,
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_INFO: {
            return {
                ...state,
                color: 'text-topic',
                message: action.payload,
                slide: true,
            }
        }
        case NOTIFY_WARN: {
            return {
                ...state,
                color: 'text-info',
                message: action.payload,
                slide: true,
            }
        }
        case NOTIFY_ERROR: {
            return {
                ...state,
                color: 'text-error',
                message: action.payload,
                slide: true,
            }
        }

        case HIDE_NOTIFY: {
            return {
                ...state,
                slide: false,
            }
        }

        default:
            return state;
    }
}

export default notifyReducer;