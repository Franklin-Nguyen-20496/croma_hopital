import React, { useState } from 'react';
import clsx from 'clsx';

import WaitingPatientItem from './WaitingPatientItem';
import Btn from '../../common/Btn';
import * as styles from './coordinator.module.scss';

const WaitingPatientList = ({ list }) => {
    const [more, setMore] = useState(false);

    let length = list ? list.length : 0;
    let hideItems = length > 3 ? length - 3 : '';

    return (
        <div
            className={styles.slidePatients}
            style={{
                maxWidth: '36rem',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >

            <p className="mb-2 fs-18 fw-600 text-dark">Những người kế tiếp</p>
            {list && list.map((id, index) => {
                if (index < 3) {
                    return (
                        <WaitingPatientItem key={id} id={id} />
                    )
                }
            })}

            <div className={clsx(more ? 'd-block' : 'd-none', styles.slideMoreWaitingPatients)}>
                {list && (list.length > 3) && list.map((id, index) => {
                    if (index >= 3 && index < 12) {
                        return (
                            <WaitingPatientItem key={id} id={id} />
                        )
                    }
                })}
            </div>

            {
                hideItems &&
                <div className=" text-center mb-2">
                    <Btn onClick={() => setMore(!more)} title={more ? 'Ẩn bớt' : `Xem thêm (${hideItems})`} />
                </div>
            }

        </div>
    );
}

export default WaitingPatientList;
