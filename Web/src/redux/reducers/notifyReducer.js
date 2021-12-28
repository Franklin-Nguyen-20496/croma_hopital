
import { NOTIFY_INFO, NOTIFY_WARN, NOTIFY_ERROR } from '../types/notify.types';

const initialState = {
    color: 'text-info',
    message: '',
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_INFO: {
            return {
                color: 'text-topic',
                message: action.payload,
            }
        }
        case NOTIFY_WARN: {
            return {
                color: 'text-info',
                message: action.payload,
            }
        }
        case NOTIFY_ERROR: {
            return {
                color: 'text-error',
                message: action.payload,
            }
        }

        default:
            return state;
    }
}

export default notifyReducer;