
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

import RoomInPreview from './RoomInPreview';
import Btn from '../../../common/Btn';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const SelectOneOption = ({ chosenPatient, setShowBackdrop }) => {

    const profile = useSelector(state => state.account.account)
    const [selectedRoom, setSelectedRoom] = useState('');
    const [error, setError] = useState('')

    const patientsUnDoctor = useSelector(state => state.patients.unDoctor);
    // console.log('patients unDoctor', patientsUnDoctor);

    const patientsNormal = useSelector(state => state.patients.normal);
    // console.log('patients normal', patientsNormal);

    const patients = [...patientsUnDoctor, ...patientsNormal];

    const roomsOfPosition = useSelector(state => {
        const rooms = state.rooms.list;
        return rooms.filter(room => room.position === profile.position);
    });

    const roomsPossible = roomsOfPosition.filter(room => (room.level >= chosenPatient.score && room.member.length < 6))

    const handleAddOnePatient = () => {
        if (selectedRoom) {
            console.log('Đáp ứng được điều kiện');
            const newPatient = {
                ...chosenPatient,
                room: selectedRoom.name,
            }
            const newMember = [...selectedRoom.member]
            newMember.push(chosenPatient.id);
            const newRoom = {
                ...selectedRoom,
                member: newMember,
            }
            console.log(newRoom);
            socket.emit('patients:add_room', newPatient);
            socket.emit('rooms:update', newRoom);
            setSelectedRoom('')
            setShowBackdrop(false);
        }
        else setError('Bạn chưa chọn bất cứ phòng nào!');
    }

    return (
        <div
            className="bg-gray br-32 pt-3 pl-3 pr-3 pb-2 mt-2"
            onScroll={event => event.preventDefault()}
            onClick={() => setSelectedRoom('')}
        >
            <p className="text-center fs-24 fw-700 text-dark mb-2">Chọn phòng</p>
            <div
                className="m-auto pb-1"
                style={{ maxWidth: '88rem' }}
            >
                {
                    roomsPossible.map(room => {
                        return <RoomInPreview
                            patients={patients.filter(item => item.room === room.name)}
                            room={room}
                            key={room.id}
                            moreClass="clickable mb-1"
                            selected={selectedRoom.id === room.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoom(room);
                                setError('');
                            }}
                        />
                    })
                }
            </div>
            <p className="text-red mb-1">{error ? error : null}</p>
            <div className="d-flex justify-content-end mb-2">
                <Btn
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddOnePatient();
                    }}
                    moreClass="text-end mr-1"
                    title="Đồng ý"
                />

                <Btn
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoom('');
                        setShowBackdrop(false);
                        setError('')
                    }}
                    moreClass="text-end"
                    title="Hủy"
                    bgColor="bg-red"
                />
            </div>
        </div>
    );
}

export default SelectOneOption;
