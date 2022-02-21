import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import RecipeItem from './RecipeItem';
import * as styles from './index.module.scss';

const SearchRecipesContent = (props) => {
    const {
        setFieldValue,
        setShowSearch,
        search,
    } = props;

    const recipes = useSelector(state => state.recipes.list);
    console.log('search', search);

    const filterSearchValues = search ? recipes.filter(item => {
        return item.name.includes(search) || item.name.toLowerCase().includes(search)
    }) : recipes;

    return (
        <div
            className={clsx('bg-brown shadow pt-1 pb-1 d-flex justify-content-center align-items-center flex-direction-column animation-slideY', styles.searchRecipeContent)}
            style={searchStyle}
            onBlur={e => e.stopPropagation()}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {
                filterSearchValues.length > 0 ?
                    filterSearchValues.map(item => (
                        <RecipeItem
                            key={item.id}
                            item={item}
                            onClick={(e) => {
                                setFieldValue('recipeName', item.name);
                                setFieldValue('recipeID', item.id);
                                setShowSearch(false);
                            }}
                        />
                    )) :
                    <p>Không tìm được công thức phù hợp</p>
            }
        </div>
    );
}

const searchStyle = {
    position: 'absolute',
    top: '3.6rem',
    width: '100%',
    zIndex: '1000',
    minHeight: '10.8rem',
    borderBottomLeftRadius: '0.8rem',
    borderBottomRightRadius: '0.8rem',
    overflow: 'auto',
    maxHeight: '24rem',
}

export default memo(SearchRecipesContent);
