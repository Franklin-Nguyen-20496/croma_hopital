import React from 'react';

import DefaultPatientInfo from './DefaultPatientInfo';

const DefaultPatientsInRoom = ({ patients }) => {
    return (
        <div className=""
            style={{
                height: '4rem',
                backgroundColor: '#00E4D6',
            }}
        >
            {
                patients.map(patient => {
                    return <DefaultPatientInfo patient={patient} />
                })
            }
        </div>
    );
}

export default DefaultPatientsInRoom;
