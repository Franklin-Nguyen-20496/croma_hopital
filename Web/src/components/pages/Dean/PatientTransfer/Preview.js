
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import RoomInPreview from './RoomInPreview';
import Btn from '../../../common/Btn';

const Preview = (props, ref) => {
    const profile = useSelector(state => state.account.account)

    const { sortPatients, setSortPatients, handleSubmit } = props;

    const patientsUnDoctor = useSelector(state => state.patients.unDoctor);

    const patientsNormal = useSelector(state => state.patients.normal);

    const patients = [...patientsUnDoctor, ...patientsNormal];

    const roomsOfPosition = useSelector(state => {
        const rooms = state.rooms.list;
        if (profile && profile.position) {
            return rooms.filter(room => room.position === profile.position);
        }
        else return [];
    });
    // console.log('rooms in preview', roomsOfPosition);
    return (
        <div
            ref={ref}
            className="bg-gray br-32 pt-3 pl-3 pr-3 pb-2 mt-2"
        >
            <p className="text-center fs-24 fw-700 text-dark mb-2">Preview</p>
            <div
                className="m-auto pb-1"
                style={{ maxWidth: '88rem' }}
            >
                {
                    roomsOfPosition.length > 0 && roomsOfPosition.map(room => {
                        return <RoomInPreview
                            patients={patients.filter(item => item.room === room.name)}
                            moreClass="mb-2"
                            room={room}
                            key={room.id}
                            morePatients={sortPatients.filter(item => item.room === room.name)}
                        />
                    })
                }
            </div>
            <div className="d-flex justify-content-center mb-2">
                <Btn
                    onClick={handleSubmit}
                    moreClass="mr-2" title="Đồng ý"
                />
                <Btn
                    onClick={() => setSortPatients([])}
                    title="Hủy" bgColor="bg-red"
                />
            </div>
        </div>
    );
}

export default forwardRef(Preview); 
