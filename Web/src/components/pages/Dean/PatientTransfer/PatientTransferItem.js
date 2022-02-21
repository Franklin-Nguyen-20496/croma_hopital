
import React from 'react';

const PatientTransferItem = ({ patient }, key) => {
    return (
        <div>
            <div
                key={key}
                style={{ height: '4rem' }}
                className="d-flex align-items-center bg-gray br-32"
            >
                <div
                    style={{
                        backgroundImage: `url(${patient.file ? patient.file : process.env.REACT_APP_DEFAULT_IMG})`,
                        ...imgStyle
                    }}
                    className="br-full mr-1"
                ></div>
                <p
                    style={itemStyle}
                    className="mr-1 fw-500"
                >
                    {patient.name}
                </p>
            </div>
        </div>
    );
}

const itemStyle = {
    lineClamp: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}

const imgStyle = {
    width: '3.2rem',
    height: '3.2rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    marginLeft: '0.4rem',
}

export default PatientTransferItem;
