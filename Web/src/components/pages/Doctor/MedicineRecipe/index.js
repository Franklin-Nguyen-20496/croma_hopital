import React, { useReducer } from 'react';

import CreateForm from './CreateForm';
import RecipesContent from './RecipesContent';
import RecipeView from './RecipeView';

const initialState = {
    selected: '',
    showPreview: false,
    showEdit: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_edit':
            console.log('action.payload', action.payload)
            return {
                ...state,
                selected: action.payload,
                showEdit: true,
            }
        case 'set_preview':
            return {
                ...state,
                selected: action.payload,
                showPreview: true,
            }
        case 'reset':
            return {
                selected: '',
                showPreview: false,
                showEdit: false,
            }
        default:
            return state;
    }
}

const MedicineRecipe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <CreateForm
                state={state}
                dispatch={dispatch}
            />
            <hr className="mt-2 mb-2" />
            <RecipesContent
                dispatch={dispatch}
            />
            <RecipeView
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
}

export default MedicineRecipe;
