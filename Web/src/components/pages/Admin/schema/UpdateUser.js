
import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import UpdateUserForm from './UpdateUserForm';
import actions from '../../../../redux/actions';
const { setPositionUpdateUser } = actions;

const UpdateUser = () => {

    const isUpdateUser = useSelector(state => state.users.isUpdateUser);
    const user = useSelector(state => state.users.selected);
    const updateRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const position = updateRef.current.offsetTop;
        console.log('UpdateUser', position);
        window.scrollTo(0, position - 64);
    })
    useEffect(() => {
        dispatch(setPositionUpdateUser(updateRef.current.offsetTop));
    }, [isUpdateUser, dispatch])

    return (
        <div
            ref={updateRef}
        >
            <div>
                <h3
                    className={clsx('fw-600 fs-20 text-center text-black mb-2')}
                >
                    Chỉnh sửa tài khoản
                </h3>

                <UpdateUserForm user={user} />

                <hr className="mt-4 mb-4 border-none" />
            </div>

        </div>
    );
}

export default UpdateUser;
