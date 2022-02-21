
import React from 'react';
import { useSelector } from 'react-redux';
import RecipeItem from './RecipeItem';

const RecipesContent = ({ dispatch }) => {
    const recipes = useSelector(state => state.recipes.list);
    const profile = useSelector(state => state.account.account);

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">Công thức sẵn có</p>
            <div className="row gap-8 gap-lg-16">
                {
                    recipes.length > 0 && recipes.map((item => {
                        return <RecipeItem
                            key={item.id}
                            item={item}
                            profile={profile}
                            btnPreviewClick={() => {
                                dispatch({
                                    type: 'set_preview',
                                    payload: item
                                })
                            }}

                            btnEditClick={() => {
                                dispatch({
                                    type: 'set_edit',
                                    payload: item,
                                })
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }}
                        />
                    }))
                }
            </div>
        </div>
    );
}

export default RecipesContent;
