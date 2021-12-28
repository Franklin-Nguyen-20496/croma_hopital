
import { NOTIFY_INFO, NOTIFY_WARN, NOTIFY_ERROR } from '../types/notify.types';

export const notifyInfo = (data) => {
    return {
        type: NOTIFY_INFO,
        payload: data,
    }
}

export const notifyWarn = (data) => {
    return {
        type: NOTIFY_WARN,
        payload: data,
    }
}

export const notifyError = (data) => {
    return {
        type: NOTIFY_ERROR,
        payload: data,
    }
}