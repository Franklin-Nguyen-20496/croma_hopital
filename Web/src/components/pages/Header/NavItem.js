import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem = (props) => {
    const { icon, onClick } = props;

    return (
        <p
            className="fs-18 text-white p-1 clickable"
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} ></FontAwesomeIcon>
        </p>
    );
}

export default NavItem;
