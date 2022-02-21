import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import WaitingPatientItem from './WaitingPatientItem';
import Btn from '../../common/Btn';
import * as styles from './coordinator.module.scss';

const WaitingPatientList = () => {
    const [more, setMore] = useState(false);
    const list = useSelector(state => state.waitingPatients.list);
    console.log('list', list);
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
                else return null;
            })}

            <div className={clsx(more ? 'd-block' : 'd-none', styles.slideMoreWaitingPatients)}>
                {list && (list.length > 3) && list.map((id, index) => {
                    if (index >= 3 && index < 12) {
                        return (
                            <WaitingPatientItem key={id} id={id} />
                        )
                    }
                    else return null;
                })}
            </div>

            {list.length === 0 && <p className="bg-green text-white p-1">Chưa có người trong hàng chờ!</p>}

            {
                list.length > 3 &&
                <div className=" text-center mb-2">
                    <Btn onClick={() => setMore(!more)} title={more ? 'Ẩn bớt' : `Xem thêm (${list.length - 3})`} />
                </div>
            }

        </div>
    );
}

export default WaitingPatientList;
