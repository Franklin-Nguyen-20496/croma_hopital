
import {
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_ALL_USERS,
    RESET_USERS,
    SELECT_USER,
    SET_UPDATE_TRUE,
    SET_UPDATE_FALSE,
    SET_POSITION_UPDATE_USER,
} from '../types/users.types';

const initialState = {
    list: [],
    selected: {
        email: 'tuanhoang@gmail.com',
        name: 'tuanhoang',
        file: '',
        password: '',
        confirmPassword: '',
        age: '23',
        address: 'Quảng Nam',
        position: 3,
        role: 3,
    },
    isUpdateUser: '',
    positionUpdateUser: 0,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS: {
            return {
                ...state,
                list: action.payload,
            }
        }
        case ADD_USER: {
            const newList = [...state.list, action.payload];
            return {
                ...state,
                list: newList,
            }
        }
        case UPDATE_USER: {
            const listUpdate = [...state.list].map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                else return item
            })
            return {
                ...state,
                list: listUpdate,
            }
        }
        case DELETE_USER: {
            const id = action.payload;
            const newList = state.list.filter((user) => user._id !== id);

            return {
                ...state,
                list: newList,
            }
        }

        case RESET_USERS: {
            return initialState;
        }

        case SELECT_USER: {
            console.log(SELECT_USER, action.payload)
            return {
                ...state,
                selected: action.payload
            }
        }

        case SET_UPDATE_TRUE:
            return {
                ...state,
                isUpdateUser: true,
            }

        case SET_UPDATE_FALSE:
            return {
                ...state,
                isUpdateUser: '',
            }

        case SET_POSITION_UPDATE_USER:
            return {
                ...state,
                positionUpdateUser: action.payload,
            }

        default:
            return state;
    }
};

export default usersReducer;