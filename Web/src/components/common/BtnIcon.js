import React, { useState, memo, forwardRef, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const BtnIcon = forwardRef((props, ref) => {
    const {
        icon,
        bgColor,
        color,
        onClick,
        noShadow,
        moreStyles,
    } = props;
    const [active, setActive] = useState('');
    const element = useRef();

    useEffect(() => {
        let timer;
        const handleElement = () => {
            setActive('active');
            timer = setTimeout(() => {
                setActive('');
            }, 300);
        }

        element.current.addEventListener('click', handleElement);

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div
            ref={element}
            onClick={onClick}
            style={{ ...moreStyles }}
            className="animation-opacity"
        >
            <div
                style={{
                    width: '3.2rem',
                    height: '3.2rem',
                    backgroundColor: bgColor ? bgColor : '',
                    color: color ? color : '#FFFFFF',
                    cursor: 'pointer',

                }}
                className={clsx(
                    'btn-topic transition item-center br-full',
                    noShadow ? '' : 'shadow',
                    active
                )}
                ref={ref}
            >
                <FontAwesomeIcon icon={icon ? icon : faEllipsisH} />
            </div>
        </div>
    );
})

export default memo(BtnIcon);
