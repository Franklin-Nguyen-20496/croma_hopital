import {
    SET_ALL_RECIPES,
    ADD_ONE_RECIPE,
    UPDATE_ONE_RECIPE,
} from '../types/recipes.types';

export const setAllRecipes = (values) => {
    return {
        type: SET_ALL_RECIPES,
        payload: values,
    }
}

export const addOneRecipe = (value) => {
    return {
        type: ADD_ONE_RECIPE,
        payload: value,
    }
}

export const updateOneRecipe = (value) => {
    return {
        type: UPDATE_ONE_RECIPE,
        payload: value,
    }
}