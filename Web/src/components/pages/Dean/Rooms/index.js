
import React, { useState, useEffect, createRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import Position from './Position';
import RoomItem from './RoomItem';
import Btn from '../../../common/Btn';
import AddRoom from './AddRoom';
import Polls from './Polls';

const Rooms = () => {
    const profile = useSelector(state => state.account.account);
    const [selected, setSelected] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddRoom, setShowAddRoom] = useState(false);
    const rooms = useSelector(state => state.rooms.list);
    const btnAddRoom = createRef();

    useEffect(() => {
        const handleClickOutside = () => {
            setSelected('');
        }

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [])

    // show addroom
    useEffect(() => {
        const { role } = profile;
        console.log('role profile', role);
        if (role && role === 1) {
            setIsAdmin(true);
        }

        const handleShowAddRoom = () => {
            setShowAddRoom(true);
        }

        btnAddRoom.current.addEventListener('click', handleShowAddRoom)

    }, [btnAddRoom, profile])

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">Admin/Giám đốc/trưởng khoa</p>

            <div className="row gap-16">
                <div className="col-12 col-sm-6">
                    <Position>
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 100 && room.name < 200) {
                                    return <RoomItem
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setSelected(room.id)
                                        }}
                                        key={room.id}
                                        selected={selected}
                                        room={room}
                                    />
                                }
                                else return null;
                            })
                        }
                    </Position>

                    <Position>
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 200 && room.name < 300) {
                                    return (
                                        <RoomItem
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelected(room.id)
                                            }}
                                            key={room.id}
                                            selected={selected}
                                            room={room}
                                        />
                                    )
                                }
                                else return null;
                            })
                        }
                    </Position>

                    <Position>
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 300 && room.name < 400) {
                                    return (
                                        <RoomItem
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelected(room.id)
                                            }}
                                            key={room.id}
                                            selected={selected}
                                            room={room}
                                        />
                                    )
                                }
                                else return null;
                            })
                        }
                    </Position>

                    <div className={clsx('text-center pt-2 pb-3', isAdmin ? 'd-block' : 'd-none')}>
                        <Btn title="Thêm phòng" ref={btnAddRoom} />
                        <AddRoom showAddRoom={showAddRoom} setShowAddRoom={setShowAddRoom} />
                    </div>

                </div>

                <div className="col-12 col-sm-6 d-md-none"></div>
                <div className="col-12 col-sm-12 col-md-6">
                    <Polls />
                </div>
            </div>

            <div className="row">

                <div className="col-12 col-sm-6 mt-2 " >

                </div>
            </div>

        </div>
    );
}

export default Rooms;