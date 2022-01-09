import React, { useState, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Btn = (props) => {
    const {
        type,
        title,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        onClick,
        noShadow,
        fontSize,
        noHover,
        bgColor,
        loop,
        disable
    } = props;
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
            className="br-100"
        >
            <button
                type={type ? type : 'button'}
                className={
                    clsx(
                        'btn-slide br-100 pt-1 pb-1 pl-2 pr-2 transition',
                        noShadow ? '' : 'shadow',
                        bgColor ? bgColor : 'btn-topic',
                        noHover ? '' : 'btn-hover-scale',
                        fontSize ? fontSize : '',
                        active,
                        marginLeft ? `ml-${marginLeft}` : '',
                        marginRight ? `mr-${marginRight}` : '',
                        marginTop ? `mt-${marginTop}` : '',
                        marginBottom ? `mb-${marginBottom}` : '',
                        loop ? 'animation-loop' : '',
                        disable ? 'disable' : '',
                    )}
                ref={element}
            >
                {title ? title : 'button'}
            </button>
        </div>

    );
}

export default memo(Btn);
