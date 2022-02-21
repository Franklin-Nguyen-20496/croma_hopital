
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const BtnNotify = ({ notify, onClick, style }) => {

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
            onClick={onClick}
            className={
                clsx('bg-white btn-hover-scale br-full clickable',
                    'd-flex justify-content-center align-items-center',
                    active)
            }
            style={{
                ...iconStyle,
                ...style,
            }}
            ref={element}
        >

            <FontAwesomeIcon
                className="fs-18 text-dark o-70"
                icon={faBell}
            />

            <div
                style={pointStyle}
                className={clsx('position-absolute br-full bg-red', notify ? 'd-block' : 'd-none')}
            >
            </div>

        </div >
    );
}

const iconStyle = {
    width: '40px',
    height: '40px',
}

const pointStyle = {
    width: '12px',
    height: '12px',
    top: '1px',
    right: '1px',
}

export default BtnNotify;
