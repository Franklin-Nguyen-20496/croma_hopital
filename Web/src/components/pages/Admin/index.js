
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import actions from '../../../redux/actions';
const { getAllUsers } = actions;

const Admin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            method: 'get',
            url: '/users',
            ContentType: 'application/json',
        })
            .then(res => {
                console.log('get all users', res.data);
                dispatch(getAllUsers(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Outlet />
    );
}

export default Admin;
