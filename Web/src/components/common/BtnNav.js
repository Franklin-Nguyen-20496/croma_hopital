import React, { useState, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

const BtnNav = (props) => {
    const { type, title, marginLeft, marginRight, onClick, selected } = props;
    const element = useRef();

    // scale when click btn
    const [active, setActive] = useState('');
    console.log('btn re-render');

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
        >
            <button
                type={type ? type : 'button'}
                className={
                    clsx(
                        'btn-topic btn-slide br-100 mt-1',
                        'mb-1 pt-1 pb-1 pl-2 pr-2 transition',
                        active,
                        marginLeft ? `ml-${marginLeft}` : '',
                        marginRight ? `mr-${marginRight}` : '',
                        selected ? 'text-dark' : 'shadow',
                    )}

                ref={element}
            >
                {title ? title : 'button'}
            </button>
        </div>

    );
}

export default memo(BtnNav);
