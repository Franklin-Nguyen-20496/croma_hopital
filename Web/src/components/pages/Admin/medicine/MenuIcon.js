import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

const MenuIcon = ({ onClick }) => {
    return (
        <div
            className="bg-green btn-hover-bg-green btn-hover-scale br-full d-flex justify-content-center align-items-center"
            style={iconStyle}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faTasks} />
        </div>
    );
}

const iconStyle = {
    width: '28px',
    height: '28px',
    cursor: 'pointer'
}

export default MenuIcon;
