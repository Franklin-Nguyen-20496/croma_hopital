
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import RoleItem from './RoleItem';
import * as styles from './schema.module.scss';

const SchemaParams = () => {
    const params = useParams();
    const classId = Number(params.classId);
    const users = useSelector(state => state.users.list);
    const [users2, setUsers2] = useState([]);
    const [users3, setUsers3] = useState([]);

    useEffect(() => {
        const users2 = users.filter(value => {
            return value.position === classId && value.role === 2;
        })
        setUsers2(users2)
        const users3 = users.filter(value => {
            return value.position === classId && value.role === 3
        })
        setUsers3(users3)
    }, [users, classId])



    return (
        <div className={clsx('bg-gray big-shadow br-20 mt-2')}>
            <div className={clsx(styles.containerArrow, 'row d-none d-sm-flex')}>

                <div className={clsx('col-12 col-sm-4')}
                >
                    <div className={clsx(styles.supArrow)}>
                        <div className={clsx(styles.arrow, 'bg-gray',
                            classId === 1 ? 'd-block' : 'd-none')}></div>
                    </div>
                </div>

                <div className={clsx('col-12 col-sm-4')}
                >
                    <div className={clsx(styles.supArrow)}>
                        <div className={clsx(styles.arrow, 'bg-gray',
                            classId === 2 ? 'd-block' : 'd-none')}></div>
                    </div>
                </div>

                <div className={clsx('col-12 col-sm-4')}
                >
                    <div className={clsx(styles.supArrow)}>
                        <div className={clsx(styles.arrow, 'bg-gray',
                            classId === 3 ? 'd-block' : 'd-none')}></div>
                    </div>
                </div>

            </div>

            <div
                styles={{
                    position: 'relative',
                    zIndex: 100,
                }}
            >
                <RoleItem
                    users={users2}
                    title="Trưởng khoa"
                />

                <hr className="mb-1" />
                <RoleItem users={users3}
                    title="Bác sĩ"
                />

            </div>
        </div>
    )
}

export default SchemaParams;
