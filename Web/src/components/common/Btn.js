import React, { useState, memo, useEffect, useRef, forwardRef } from 'react';
import clsx from 'clsx';

const Btn = forwardRef((props, ref) => {
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
        disable,
        selected,
        moreClass
    } = props;
    const element = useRef();
    // scale when click btn
    const [active, setActive] = useState('');
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
            className={clsx('br-100', moreClass)}
            style={{ width: 'auto' }}
            ref={ref}
        // key={key}
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
                        selected ? 'text-dark' : '',
                    )}
                ref={element}
                onClick={onClick}
                style={{ minWidth: '8.8rem' }}
            >
                {title ? title : 'button'}
            </button>
        </div>

    );
})

export default memo(Btn);
