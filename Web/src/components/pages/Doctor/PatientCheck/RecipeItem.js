
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import * as styles from './index.module.scss';
import axios from 'axios';

const RecipeItem = ({ item, onClick }) => {
    const [doctor, setDoctor] = useState('');
    const profile = useSelector(state => state.account.account)

    useEffect(() => {
        axios({
            method: 'get',
            url: `/users/id/${item.doctorID}`
        })
            .then(res => {
                const { message, data } = res.data;
                if (data) {
                    setDoctor(data)
                }
                else console.warn(message);
            })
            .catch(err => console.log(err));
    }, [item.doctorID])

    return (
        <div
            style={itemStyle}
            className={clsx('row align-items-center justify-content-space-between pl-1 pr-1', styles.recipeItem)}
            onClick={onClick}
        >
            <p>{item.name} mức {item.type === 1 ? '1-2' : '3-6'}</p>
            <p>{doctor.id === profile.id ? 'Tôi' : `BS. ${doctor.name}`}</p>
        </div>
    );
}

const itemStyle = {
    width: '100%',
    height: '2.8rem',
    cursor: 'pointer',
}

export default RecipeItem;
