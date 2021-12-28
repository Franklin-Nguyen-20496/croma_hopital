
import { SET_ACCOUNT, CLEAR_ACCOUNT } from '../types/account.types';

export const setAccount = (data) => {
    return {
        type: SET_ACCOUNT,
        payload: data,
    }
}

export const clearAccount = () => {
    return {
        type: CLEAR_ACCOUNT,
        payload: {},
    }
}
