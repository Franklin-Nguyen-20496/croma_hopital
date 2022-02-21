
import React from 'react';
import clsx from 'clsx';

import DefaultPatientInfo from './DefaultPatientInfo';
import RoomInfo from './RoomInfo';
import PatientTransferItem from './PatientTransferItem';

const RoomInPreview = (props, key) => {
    const {
        room,
        patients,
        moreClass,
        onClick,
        selected,
        morePatients
    } = props;

    return (
        <div
            key={key}
            className={clsx(
                'row gap-8 align-items-center br-32 transition',
                selected ? 'bg-topic' : 'bg-white',
                moreClass
            )}
            style={{ flexWrap: 'wrap', padding: '0.4rem' }}
            onClick={onClick}
        >
            <RoomInfo room={room} />

            {
                patients.length > 0 &&
                <div>
                    <div
                        className="bg-gray br-32 d-flex align-items-center pr-1"
                        style={{ height: '4rem', paddingLeft: '0.4rem' }}
                    >
                        {
                            patients.map(patient => {
                                return <DefaultPatientInfo patient={patient} key={patient.id} />
                            })
                        }
                        <p className="pl-1">{patients.length}/6</p>
                    </div>

                </div>

            }

            {
                (morePatients && morePatients.length > 0) && morePatients.map(item => {
                    return <PatientTransferItem patient={item} key={item.id} />
                })
            }

            {
                ((morePatients && morePatients.length > 0) || patients.length > 0) ?
                    null : <p className="fs-16 fw-500 text-dark">Possible room</p>
            }
        </div>

    );
}

export default RoomInPreview;
