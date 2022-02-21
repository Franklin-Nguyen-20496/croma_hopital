import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import * as styles from './index.module.scss';
import MedicineItem from './MedicineItem';

const SearchContent = (props) => {
    const {
        search,
        replace,
        index: recipeIndex,
        dispatch,
        components,
    } = props;
    console.log('components', components)

    const medicines = useSelector(state => state.medicines.list);
    const filterSearchValues = search ? medicines.filter(item => item.name.includes(search)) : medicines;
    const filterSameValues = filterSearchValues.length > 0 ? filterSearchValues.filter(value => {
        if (components.length > 0) {
            return components.every(component => component.medicineID !== value.id);
        }
        else return true;
    }) : [];
    // console.log('filterSameValues', filterSameValues)

    return (
        <div
            style={searchStyle}
            className={clsx("bg-brown pt-1 shadow d-flex justify-content-center align-items-center flex-direction-column animation-slideY", styles.searchContent)}
            onBlur={e => e.stopPropagation()}
        >

            {
                filterSameValues.length > 0 ?
                    filterSameValues.map((item, index) => {
                        return <MedicineItem
                            dispatch={dispatch}
                            index={recipeIndex}
                            replace={replace}
                            key={index}
                            item={item}
                        />
                    })
                    :
                    <p>Trống</p>
            }
        </div>
    )
}

const searchStyle = {
    position: 'absolute',
    top: '3.6rem',
    width: '100%',
    zIndex: '1000',
    minHeight: '12rem',
    borderBottomLeftRadius: '0.8rem',
    borderBottomRightRadius: '0.8rem',
    overflow: 'auto',
    maxHeight: '24rem',
}

export default SearchContent;
