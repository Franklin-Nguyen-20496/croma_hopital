import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import * as styles from './notify.module.scss';

const Notify = () => {

    console.log('render Notify components');

    const { color, message } = useSelector(state => state.notify);

    return (
        <div
            className={clsx(styles.notify, 'bg-white')}
            style={{
                transition: 'all 0.8s ease-out',
                transform: message ? 'translateX(calc(32rem))' : 'translateX(calc(-32rem))',
            }}
        >
            <h4
                className={clsx(
                    'fs-16 fw-500',
                    color,
                )}
            >
                {message}
            </h4>
        </div>

    );
}

Notify.propTypes = {
    // todos: PropTypes.array.isRequired,
};

Notify.defaultProps = {
};

export default Notify;
