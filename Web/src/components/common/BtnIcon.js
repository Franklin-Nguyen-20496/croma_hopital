import React, { useState, memo, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const BtnIcon = forwardRef((props, ref) => {
    const { icon, bgColor, color, onClick } = props;
    const [active, setActive] = useState('');

    return (
        <div onClick={onClick}>
            <div
                style={{
                    width: '3.2rem',
                    height: '3.2rem',
                    backgroundColor: bgColor ? bgColor : '',
                    color: color ? color : '#FFFFFF',
                    cursor: 'pointer'
                }}
                className={clsx('btn-topic transition shadow item-center br-full shadow', active)}
                onClick={() => {
                    setActive('active');
                    setTimeout(() => {
                        setActive('');
                    }, 300)
                }}

                ref={ref}
            >
                <FontAwesomeIcon icon={icon ? icon : faEllipsisH} />
            </div>
        </div>
    );
})

export default memo(BtnIcon);
