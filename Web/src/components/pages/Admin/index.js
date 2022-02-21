
import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import actions from '../../../redux/actions';
import { role } from '../../../helper/user.role.helper';
const { getAllUsers } = actions;

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(state => state.account.account);

    //check role
    useLayoutEffect(() => {
        if (profile && profile.role !== role.ADMIN) {
            navigate('/')
        }
    })

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
    }, [dispatch]);

    return (
        <Outlet />
    );
}

export default Admin;
