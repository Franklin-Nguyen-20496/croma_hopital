
import React, { memo } from 'react';
import clsx from 'clsx';

import PatientRoomItem from './PatientRoomItem';

const checkPosition = (position) => {
    switch (position) {
        case 1: return 'Khoa chấn thương chỉnh hình'
        case 2: return 'Khoa hô hấp'
        case 3: return 'Khoa tim mạch'
        default: return ''
    }
}

const RoomItem = ({ room, selected, onClick }, key) => {

    return (
        <div
            key={key}
            className="pl-2"
            style={{ position: 'relative' }}
            onClick={onClick}
        >
            <div
                style={arrowStyle}
                className={clsx('shadow animation-opacity', selected === room.id ? 'd-block' : 'd-none', 'bg-gray')}
            >
            </div>

            <div key={room.id}
                style={{
                    backgroundColor: selected === room.id ? '#1ac888' : (room.member.length === 0 ? '#515151' : '#FFEC86'),
                    ...itemStyle
                }}
                className="mb-2"
            >
            </div>

            <div
                style={detailItem}
                className={
                    clsx('bg-gray br-12 big-shadow animation-opacity pt-3 pb-1', selected === room.id ? 'd-block' : 'd-none')
                }
            >

                <ul
                    className="fw-500 pl-4 pr-3 mb-1"
                >
                    <li>Phòng số {room.name}</li>
                    <li>{checkPosition(room.position)}</li>
                    <li>{room.member.length === 0 ? 'Hiện tại chưa có bệnh nhân' : `Hiện tại có tổng cộng ${room.member.length} bệnh nhân`}</li>
                </ul>

                <div className="row pl-1 pr-1">
                    {
                        room.member.length > 0 &&
                        room.member.map(id => {
                            return (<PatientRoomItem key={id} id={id} />)
                        })
                    }
                </div>

                <div
                    className="br-full btn-topic-column text-white d-flex justify-content-center align-items-center"
                    style={levelStyle}
                >
                    <p
                        className="fs-24 fw-500"
                    >lv{room.level}</p>
                </div>
            </div>
        </div>
    );
}

const levelStyle = {
    position: 'absolute',
    top: '-1.6rem',
    right: '-1.6rem',
    width: '6.4rem',
    height: '6.4rem',
}

const arrowStyle = {
    position: 'absolute',
    top: '0',
    left: '4.6rem',
    width: '3.2rem',
    height: '3.2rem',
    transform: 'rotate(45deg)',
}

const detailItem = {
    position: 'absolute',
    top: '-3rem',
    left: '6rem',
    zIndex: '2',
    width: '28rem',
    minHeight: '28rem',
}

const itemStyle = {
    width: '2.8rem',
    height: '2.8rem',
    cursor: 'pointer',
}

export default memo(RoomItem);
