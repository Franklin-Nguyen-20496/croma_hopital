import React from 'react';

const PatientOfRoom = ({ patient }, key) => {
    return (
        <div
            key={key}
        >
            <p>{patient.name}</p>
        </div>
    );
}

export default PatientOfRoom;
