
import React from 'react';

const DefaultPatientInfo = ({ patient }, key) => {
    return (
        <div
            key={key}
            style={{
                backgroundImage: `url(${patient.file ? patient.file : process.env.REACT_APP_DEFAULT_IMG})`,
                ...imgStyle,
            }}
        >
        </div>
    );
}

const imgStyle = {
    width: '3.2rem',
    height: '3.2rem',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '0.2rem'
}

export default DefaultPatientInfo;
