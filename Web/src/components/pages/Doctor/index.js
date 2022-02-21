
import React, { useEffect, useReducer, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import MainView from '../../common/MainView';
import Navigator from '../../common/Navigator';
import NavigatorItem from '../../common/NavigatorItem';
import BtnNav from '../../common/BtnNav';
import actions from '../../../redux/actions';
import { role } from '../../../helper/user.role.helper';

const { setAllMedicines,
    setAllRecipes,
    setAllRooms,
    clearAccount,
    setUnRoomPatients,
    setUnDoctorPatients,
    setNormalPatients
} = actions;

const buttons = [
    {
        id: 1,
        title: 'Bệnh nhân',
        navigate: '/doctor/my-patients',
    },
    {
        id: 2,
        title: 'Kiểm tra sức khỏe',
        navigate: '/doctor/patient-check',
    },
    {
        id: 3,
        title: 'Công thức thuốc',
        navigate: '/doctor/recipes',
    },
    {
        id: 4,
        title: 'Khám bệnh',
        navigate: '/doctor/waiting-patient',
    }
]

const initialState = {
    profile: '',
    PatientsOfUser: [],
    patientSelected: '',
}

function reducer(state, action) {
    switch (action.type) {
        case 'add_user':
            return {
                ...state,
                profile: action.payload,
            }
        case 'add_patients':
            return {
                ...state,
                PatientsOfUser: action.payload,
            }
        case 'add_patient_selected':
            return {
                ...state,
                patientSelected: action.payload
            }

        default: return state;
    }
}

const Doctor = () => {
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const profile = useSelector(state => state.account.account);

    //check role
    useLayoutEffect(() => {
        if (!profile && (profile.role !== role.DOCTOR && profile.role !== role.ADMIN)) {
            navigate('/')
        }
    })

    //get profile in server
    useEffect(() => {
        if (profile && (profile.role === 3)) {
            axios({
                method: 'get',
                url: `/users/id/${profile.id}`,
            })
                .then(res => {
                    console.log(res)
                    const { message, data } = res.data;
                    if (data) {
                        console.log('profile user', data);
                        dispatch({
                            type: 'add_user',
                            payload: data,
                        })
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err))
        }
    }, [profile, dispatch]);

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
                    reduxDispatch(setAllRooms(list))
                }
                else {
                    console.warn(res.data.message)
                }
            })
            .catch(err => console.log(err))
    }, [reduxDispatch])

    // get unRoom patient
    useEffect(() => {
        if (!profile) {
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
                        reduxDispatch(setUnRoomPatients(patients))
                    }
                    else console.warn(res.data.message)

                })
                .catch(err => console.log(err))
        }
    }, [profile, reduxDispatch, navigate]);

    // get unDoctor patient
    useEffect(() => {
        axios({
            method: 'get',
            url: '/patients',
            params: {
                type: 'unDoctor',
                position: (profile && profile.position) ? profile.position : '',
            }
        })
            .then(res => {
                console.log(`get patient unDoctor ${profile.position}`, res);
                const patients = res.data.data
                if (patients) {
                    reduxDispatch(setUnDoctorPatients(patients));
                }
                else console.warn(res.data.message)
            })
            .catch(err => console.log(err))
    }, [reduxDispatch, profile])

    // get normal patient
    useEffect(() => {
        axios({
            method: 'get',
            url: '/patients',
            params: {
                type: 'normal',
                position: (profile && profile.position) ? profile.position : '',
            }
        })
            .then(res => {
                console.log(`get patient normal witch position: ${profile.position}`, res);
                const patients = res.data.data
                if (patients) {
                    reduxDispatch(setNormalPatients(patients));
                    console.log('patients normal', patients)
                }
                else console.warn(res.data.message)
            })
            .catch(err => console.log(err))
    }, [reduxDispatch, profile])

    // Get medicines from Server
    useEffect(() => {
        axios({
            method: 'get',
            url: '/medicines'
        })
            .then(res => {
                const { message, data } = res.data;
                if (data) {
                    reduxDispatch(setAllMedicines(data));
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }, [reduxDispatch])

    //Get recipes from Server
    useEffect(() => {
        axios({
            method: 'get',
            url: '/recipes'
        })
            .then(res => {
                const { message, data } = res.data;
                if (data) {
                    // console.log('get all recipes', data);
                    reduxDispatch(setAllRecipes(data))
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }, [reduxDispatch])

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
                                    }}
                                    title={button.title}
                                    marginLeft="2"
                                    selected={button.navigate === window.location.pathname}
                                />
                            </NavigatorItem>
                        )
                    })
                }
            </Navigator>

            <MainView>
                <Outlet context={[state, dispatch]} />
            </MainView>
        </div>
    );
}

export default Doctor;
