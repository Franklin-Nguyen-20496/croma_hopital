import React, { useState, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Btn = (props) => {
    const { type, title, marginLeft, marginRight, onClick } = props;

    // scale when click btn
    const [active, setActive] = useState('');
    console.log('btn re-render');

    return (
        <button
            type={type}
            className={
                clsx(
                    'btn-topic btn-slide shadow br-100 mt-1 mb-1 pt-1 pb-1 pl-2 pr-2',
                    active,
                    marginLeft ? `ml-${marginLeft}` : '',
                    marginRight ? `mr-${marginRight}` : '',
                )}
            onClick={() => {
                setActive('active');
                setTimeout(() => {
                    setActive('');
                }, 300);
            }}

            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default memo(Btn);
