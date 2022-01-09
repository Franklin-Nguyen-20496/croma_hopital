
import React from 'react';
import * as styles from './index.module.scss';

const MainView = ({ children }) => {
    return (
        <div
            className={styles.autoOutletPatients}
        >
            {children}
        </div>
    );
}

export default MainView;
