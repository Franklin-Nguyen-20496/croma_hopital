import React from 'react';
import clsx from 'clsx';

const BackDrop = (props) => {
    const {
        children,
        show,
        moreStyle,
        moreClass,
        onScroll,
        onClick
    } = props;
    return (
        <div
            style={backDropStyle}
            className={clsx(show ? 'd-block' : 'd-none', moreClass)}
            onScroll={onScroll}
            onClick={onClick}
        >
            <div
                className="big-shadow"
                style={{
                    ...contentStyle,
                    ...moreStyle,
                }}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                onScroll={(event) => event.stopPropagation()}
            >
                {
                    children ? children : <p>Back Drop is empty</p>
                }
            </div>
        </div>
    );
}

const backDropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
}

const contentStyle = {
    position: 'absolute',
    bottom: '60%',
    right: '50%',
    transform: 'translateX(50%) translateY(50%)',
    maxHeight: '100vh',
    maxWidth: '100vw',
    zIndex: 100,
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRadius: '8px',
}

export default BackDrop;
