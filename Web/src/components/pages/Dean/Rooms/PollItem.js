
import React from 'react';
import clsx from 'clsx';

const checkPositionRoom = (position) => {
    switch (position) {
        case 1: return 'Khoa chấn thương'
        case 2: return 'Khoa hô hấp'
        case 3: return 'Khoa tim mạch'
        default: return ''
    }
}

const PollItem = ({ poll, onClick }, key) => {

    return (
        <div key={key} className="p-1">
            <div
                className={clsx('bg-gray shadow p-1 br-4',)}
                style={{ cursor: 'pointer' }}
                onClick={onClick}
            >
                <p>Thêm phòng :</p>
                <p>- Vị trí: {checkPositionRoom(poll.positionRoom)}</p>
                <p>- Mức độ: {poll.levelRoom}</p>
                <p>- Đồng ý: {poll.agreed.length}/4</p>
            </div>
        </div>
    );
}

export default PollItem;
