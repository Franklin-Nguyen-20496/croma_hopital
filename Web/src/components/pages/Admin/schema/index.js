
import React, { createContext } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import UpdateUser from './UpdateUser';
import Items from './Items';
import clsx from 'clsx';

const list = [
    {
        id: 1,
        name: 'Khoa chấn thương chỉnh hình',
        link: '/schema/',
        img: '/img/chan_thuong.png',
    },
    {
        id: 2,
        name: 'Khoa hô hấp',
        link: '/schema/ho_hap',
        img: '/img/ho_hap.png',
    },
    {
        id: 3,
        name: 'Khoa tim mạch',
        link: '/schema/tim',
        img: '/img/tim.png',
    }
];

export const ListContext = createContext(list);

const Schema = () => {

    console.log('schema re-render');
    const isUpdateUser = useSelector(state => state.users.isUpdateUser)
    console.log('isUpdateUser', isUpdateUser);

    return (
        <ListContext.Provider value={list}>
            <div>
                <nav>
                    <h1 className="fs-20 fw-700">Admin/Giám đốc</h1>
                    <div className="mt-2">
                        <Items></Items>
                    </div>
                </nav>
                <br className="mb-1" />

                <Outlet />

                <hr className={clsx('mt-3 mb-3', 'border-none')} />

                {isUpdateUser && <UpdateUser />}

            </div>
        </ListContext.Provider>
    );


}

export default Schema;
