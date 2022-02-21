import React from 'react';
import * as styles from './index.module.scss';

const Navigator = ({ children }) => {
    return (
        <div
            // className="d-none d-md-block"
            className={styles.navigator}
            style={{
                minWidth: '20rem',
                height: 'calc(100vh - 10rem)',
                overflowX: 'hidden',
                overflowY: 'hidden',
                position: 'fixed',
                top: '10rem',
                left: '0'
            }}
        >
            <div className="mb-3 pb-2"></div>
            {children}
        </div>
    );
}

export default Navigator;