
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import MainView from '../../common/MainView';
import Navigator from '../../common/Navigator';
import NavigatorItem from '../../common/NavigatorItem';
import BtnNav from '../../common/BtnNav';
import actions from '../../../redux/actions';
import { role } from '../../../helper/user.role.helper';

const {
    setAllRooms,
    clearAccount,
    setUnRoomPatients,
    setUnDoctorPatients,
    setNormalPatients
} = actions;

const buttons = [
    {
        id: 1,
        title: 'Phòng bệnh',
        navigate: '/dean/rooms',
    },
    {
        id: 2,
        title: 'Chuyển phòng bệnh',
        navigate: '/dean/patient-transfer',
    },
    {
        id: 3,
        title: 'Chọn bác sĩ/ y tá',
        navigate: '/dean/selective',
    }
]

const Doctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(state => state.account.account);
    const rooms = useSelector(state => state.rooms.list);
    const [selected, setSelected] = useState(); // handle UI

    //check role
    useLayoutEffect(() => {
        if (!profile && (profile.role !== role.ADMIN && profile.role !== role.DEAN)) {
            navigate('/')
        }
    })

    useEffect(() => {
        const btn = buttons.find(btn => btn.navigate === window.location.pathname);
        setSelected(btn.id);
    }, [])

    //get all rooms
    useEffect(() => {
        axios({
            method: 'get',
            url: '/rooms'
        })
            .then(res => {
                console.log('get rooms', res);
                const list = res.data.data
                if (list) {
                    dispatch(setAllRooms(list))
                }
                else {
                    console.warn(res.data.message)
                }
            })
            .catch(err => console.log(err))
    }, [dispatch])

    // get unRoom patient
    useEffect(() => {
        if (!profile && !profile.position) {
            localStorage.clear();
            dispatch(clearAccount())
            navigate('/login');
        }
        else {
            axios({
                method: 'get',
                url: '/patients',
                params: {
                    type: 'unRoom',
                    position: profile.position ? profile.position : '',
                }
            })
                .then(res => {
                    console.log('get patient unRoom', res);
                    const patients = res.data.data
                    if (patients) {
                        dispatch(setUnRoomPatients(patients))
                    }
                    else console.warn(res.data.message)

                })
                .catch(err => console.log(err))
        }
    }, [profile.position, profile, dispatch, navigate]);

    // get unDoctor patient
    useEffect(() => {
        axios({
            method: 'get',
            url: '/patients',
            params: {
                type: 'unDoctor',
                position: profile.position ? profile.position : '',
            }
        })
            .then(res => {
                console.log(`get patient unDoctor ${profile.position}`, res);
                const patients = res.data.data
                if (patients) {
                    dispatch(setUnDoctorPatients(patients));
                }
                else console.warn(res.data.message)
            })
            .catch(err => console.log(err))
    }, [dispatch, profile.position])

    // get normal patient
    useEffect(() => {
        axios({
            method: 'get',
            url: '/patients',
            params: {
                type: 'normal',
                position: profile.position ? profile.position : '',
            }
        })
            .then(res => {
                console.log(`get patient normal witch position: ${profile.position}`, res);
                const patients = res.data.data
                if (patients) {
                    dispatch(setNormalPatients(patients));
                    console.log('patients normal', patients)
                }
                else console.warn(res.data.message)
            })
            .catch(err => console.log(err))
    }, [dispatch, profile.position])

    return (
        <div>

            <Navigator>
                {
                    buttons.map((button, index) => {
                        return (
                            <NavigatorItem key={button.id}>
                                <BtnNav
                                    onClick={() => {
                                        navigate(button.navigate);
                                        setSelected(button.id)
                                    }}
                                    title={button.title}
                                    marginLeft="2"
                                    selected={selected === button.id ? true : false}
                                />
                            </NavigatorItem>
                        )
                    })
                }
            </Navigator>

            <MainView>
                <Outlet context={rooms} />
            </MainView>
        </div>
    );
}

export default Doctor;
