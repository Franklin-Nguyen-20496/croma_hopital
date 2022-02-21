import React from 'react';

const RoomInfo = ({ room }) => {
    return (
        <div>
            <div
                className="br-32 d-flex justify-content-center align-items-center"
                style={{
                    height: '4rem',
                    backgroundColor: '#00E4D6',
                    width: '16rem',
                }}
            >
                <p >Phòng {room.name} | mức {room.level} </p>
            </div>
        </div>
    );
}

export default RoomInfo;
