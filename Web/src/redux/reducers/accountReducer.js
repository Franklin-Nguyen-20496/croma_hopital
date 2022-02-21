
import axios from 'axios';

import { SET_ACCOUNT, CLEAR_ACCOUNT } from '../types/account.types';

const initialState = {
    access_token: JSON.parse(localStorage.getItem('token')) || '',
    refresh_token: JSON.parse(localStorage.getItem('refresh_token')) || '',
    account: JSON.parse(localStorage.getItem('profile')) || '',
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                ...action.payload,
            };
        case CLEAR_ACCOUNT:
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = '';
            return {
                account: '',
                token: '',
                refresh_token: '',
            };

        default: return state;
    }
}

export default accountReducer;