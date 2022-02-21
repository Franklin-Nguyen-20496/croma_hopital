import React, { useState, createRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import io from 'socket.io-client';

// import actions from '../../../../redux/actions';
import PatientItem from '../../../common/PatientItem';
import FakePatientItems from './FakePatientItems';
import Btn from '../../../common/Btn';
import Preview from './Preview';
import BackDrop from '../../../common/BackDrop';
import SelectOneOption from './SelectOneOption';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

// const { clearAccount, setUnRoomPatients, setUnDoctorPatients, setNormalPatients } = actions;

const PatientTransfer = () => {

    const [showBackdrop, setShowBackdrop] = useState(false);
    const [chosen, setChosen] = useState({ score: 0 });
    const [sortPatients, setSortPatients] = useState([]);
    const [showTransfer, setShowTransfer] = useState(false);
    const [roomsTransfer, setRoomsTransfer] = useState([]);
    const elementPreview = createRef();

    const profile = useSelector(state => state.account.account);
    const patientsUnRoom = useSelector(state => state.patients.unRoom);

    const roomsOfPosition = useSelector(state => {
        const rooms = state.rooms.list;
        return rooms.filter(room => room.position === profile.position);
    });

    const handleSelectRoom = (item) => {
        console.log(`handleSelectRoom item chosen `, item);
        setChosen(item);
        setShowBackdrop(true);
    }

    const handleAddMultiplePatients = () => {
        console.log('patient un room', patientsUnRoom);
        const patients = [...patientsUnRoom];
        const list = [];
        let roomsPossible = [...roomsOfPosition];
        let roomsNumber = roomsPossible.length;

        patients.forEach(item => {
            for (let i = 0; i < roomsNumber; i++) {
                const { level, member, name } = roomsPossible[i]
                if (item.score <= level && member.length < 6) {
                    const newItem = {
                        ...item,
                        room: name,
                    }
                    list.push(newItem);
                    const newMember = [...member]
                    newMember.push(item.id);
                    const newRoom = { ...roomsPossible[i], member: newMember };
                    const newRooms = roomsPossible.map(room => {
                        if (room.id === newRoom.id) {
                            return newRoom;
                        }
                        else return room;
                    })
                    console.log('newRooms:', newRooms)
                    roomsPossible = [...newRooms];
                    console.log('patients, roomsPossible, list', patients, roomsPossible, list);
                    break;
                }
                else continue;
            }
        })

        setSortPatients(list);
        setRoomsTransfer(roomsPossible);
        setShowTransfer(true);
        window.scroll({
            top: elementPreview.current.offsetTop,
            behavior: 'smooth'
        });

    }

    const handleSubmitMultiplePatients = () => {
        console.log('list need submit roomsTransfer sortPatients', roomsTransfer, sortPatients);
        const rooms = [...roomsOfPosition];

        roomsTransfer.forEach((room, index) => {
            if (!_.isEqual(rooms[index], room)) {
                socket.emit('rooms:update', room);
            }
        })
        sortPatients.forEach(patient => {
            socket.emit('patients:add_room', patient);
        })
        setSortPatients([]);
        setRoomsTransfer([]);
    }

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">Chuyển phòng cho bệnh nhân</p>

            <div className="row gap-16">
                {
                    patientsUnRoom.length > 0 ?
                        patientsUnRoom.map(item => {
                            return <PatientItem
                                showBtn={true}
                                key={item.id} item={item}
                                onClick={() => handleSelectRoom(item)}
                            />
                        }) :
                        <FakePatientItems />
                }
            </div>
            <Btn
                moreClass="mt-1" title="Chuyển tự động"
                onClick={() => handleAddMultiplePatients()}
            />

            <Preview
                ref={elementPreview}
                sortPatients={sortPatients}
                showTransfer={showTransfer}
                setSortPatients={setSortPatients}
                handleSubmit={handleSubmitMultiplePatients}
            />
            <br />

            <BackDrop
                show={showBackdrop} setShow={setShowBackdrop}
            >
                <SelectOneOption
                    chosenPatient={chosen}
                    setShowBackdrop={setShowBackdrop}
                />
            </BackDrop>
        </div>
    );

}

export default PatientTransfer;
