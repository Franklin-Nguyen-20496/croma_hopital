import React from 'react';
import clsx from 'clsx';

import * as styles from './index.module.scss';

const MedicineItem = ({ item, replace, index, dispatch }, key) => {
    return (
        <div
            key={key}
            className={clsx('row align-items-center pl-1 pr-1', styles.medicineItem)}
            style={itemStyle}
            onClick={() => {
                replace(index, {
                    medicineID: item.id,
                    medicineName: item.name,
                    unit: item.unit,
                    total: '',
                })
                dispatch({
                    type: 'set_selected',
                    payload: '',
                })
            }}
        >
            <p style={{ flex: 1, lineHeight: '24px' }}>{item.name}</p>
            <p style={{ flex: 1, lineHeight: '24px' }}>+{item.total} {item.unit}</p>
        </div>
    );
}

const itemStyle = {
    width: '100%',
    height: '2.8rem',
    cursor: 'pointer',
}

export default MedicineItem;
