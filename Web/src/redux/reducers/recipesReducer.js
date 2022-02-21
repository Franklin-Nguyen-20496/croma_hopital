
import {
    SET_ALL_RECIPES,
    ADD_ONE_RECIPE,
    UPDATE_ONE_RECIPE,
}
    from '../types/recipes.types';

const initialState = {
    list: [],
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_RECIPES:
            return {
                ...state,
                list: action.payload,
            }
        case ADD_ONE_RECIPE:
            const newListAddOne = [...state.list];
            newListAddOne.push(action.payload);
            return {
                ...state,
                list: newListAddOne,
            }

        case UPDATE_ONE_RECIPE:
            const newListUpdate = [...state.list].map(item => {
                if (action.payload.id === item.id) {
                    return action.payload;
                }
                else return item;
            })
            return {
                ...state,
                list: newListUpdate,
            }

        default:
            return state;
    }
}

export default recipesReducer;