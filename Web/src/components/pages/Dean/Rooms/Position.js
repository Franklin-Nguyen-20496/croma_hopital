import React from 'react';

const Position = ({ children }) => {
    return (
        <div
            style={positionStyles}
            className="shadow br-12 pt-3 pb-2 mb-2"
        >
            {children}
        </div>
    );
}

const positionStyles = {
    backgroundColor: '#529AAA',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '72rem',
}

export default Position;
