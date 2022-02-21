import React from 'react';
import clsx from 'clsx';

import * as styles from './index.module.scss';

const checkPositionRoom = (position) => {
    switch (position) {
        case 1: return 'Khoa chấn thương'
        case 2: return 'Khoa hô hấp'
        case 3: return 'Khoa tim mạch'
        default: return ''
    }
}

const PollProcessedItem = ({ poll }, key) => {
    const { agreed, positionRoom, levelRoom } = poll;
    return (
        <div
            className={clsx('bg-gray p-1', styles.pollItem)}
            key={key}
        >
            <p>
                {`{Khoa: ${checkPositionRoom(positionRoom)},
                level: ${levelRoom}
                }`}
            </p>
            <p className={agreed.length >= 3 ? 'text-topic' : 'text-red'}>
                {`${agreed.length >= 3 ? 'Đã tạo phòng' : 'Đã hủy bình chọn'}`}
            </p>
        </div>
    );
}

export default PollProcessedItem;
