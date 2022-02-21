import React, { Suspense, lazy, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import './App.scss';
import actions from './redux/actions';
import Header from './components/pages/Header/Header';
import SchemaParams from './components/pages/Admin/schema/SchemaParams';
import Notify from './components/common/Notify';
import PatientRegister from './components/pages/Patient/Register';
import Information from './components/pages/Patient/Information';
import MyPatientsList from './components/pages/Doctor/MyPatientsList';
import WaitingPatientCheck from './components/pages/Doctor/WaitingPatientCheck';
import PatientCheck from './components/pages/Doctor/PatientCheck';
import MedicineRecipe from './components/pages/Doctor/MedicineRecipe';
import Rooms from './components/pages/Dean/Rooms';
import Selective from './components/pages/Dean/Selective';
import PatientTransfer from './components/pages/Dean/PatientTransfer';

const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const Schema = lazy(() => import('./components/pages/Admin/schema'));
const Admin = lazy(() => import('./components/pages/Admin'));
const AdminRegister = lazy(() => import('./components/pages/Admin/register'));
const Medicine = lazy(() => import('./components/pages/Admin/medicine'))
const Patient = lazy(() => import('./components/pages/Patient'));
const Coordinator = lazy(() => import('./components/pages/Coordinator'));
const Doctor = lazy(() => import('./components/pages/Doctor'));
const Dean = lazy(() => import('./components/pages/Dean'));
const Nurse = lazy(() => import('./components/pages/Nurse'));

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const {
    clearAccount, resetUsers, notifyError, setAccount, hideNotify,
    setAllWaitingPatients, setSelectedPatient, setFinishedId,
    addNewPoll, updateNewPoll, addNewRoom, addNewProcessedPoll,
    addNewUnRoomPatient, updateOneRoom, deleteUnRoomPatient,
    deleteNormalPatient, addNewNormalPatient, addNewUnDoctorPatient,
    deleteOneWaitingPatient, updateNormalPatient,
} = actions;

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.account.account);

    // connect socket.io
    useEffect(() => {
        const listenerGetAll = (res) => {
            console.log('socket.io waiting_patients:get_all res:', res);
            if (res.data) {
                dispatch(setAllWaitingPatients(res.data));
            }
        }

        const handleListenWaitingPatientSelected = (res) => {
            console.log('socket.io waiting_patients:selected res:', res);
            if (res.data) {
                dispatch(deleteOneWaitingPatient(res.data._id));
                dispatch(setSelectedPatient(res.data));
            }
        }

        const handleFinishedWaitingPatient = (id) => {
            console.log('socket.io waiting_patients:finished:', id);
            if (id) dispatch(setFinishedId(id));
        }

        const handlePollsCreate = (res) => {
            console.log('socket.io polls:create res:', res);
            if (res.data) {
                dispatch(addNewPoll(res.data));
            }
            else console.warn(res.message)
        }

        const handlePollUpdate = (res) => {
            console.log('socket.io polls:update res:', res);
            if (res.data) {
                dispatch(updateNewPoll(res.data))
            }
            else console.warn(res.message);
        }

        const handleAddNewRoom = (res) => {
            console.log('socket.io rooms:create res:', res);
            if (res.data) {
                dispatch(addNewRoom(res.data))
            }
            else console.warn(res.message);
        }

        const handleAddNewPollProcessed = (res) => {
            console.log('socket.io polls:processed res:', res);
            if (res.data) {
                dispatch(addNewProcessedPoll(res.data))
            }
            else console.warn(res.message);
        }

        const handleAddNewUnRoomPatient = (res) => {
            console.log('socket.io patients:add_new_un_room res:', res);
            if (res.data && res.data.position === profile.position) {
                dispatch(addNewUnRoomPatient(res.data))
            }
            else console.warn(res.message);
        }

        const handleUpdateRoom = (res) => {
            console.log('socket.io rooms:update res', res)
            const { message, data } = res;
            if (data) {
                dispatch(updateOneRoom(data));
            }
            else console.warn(message);
        }

        const handleAddRoomInPatient = (res) => {
            console.log('socket.io patients:add_room res', res);
            const { message, data } = res;
            if (data) {
                if (data.doctorID) {
                    dispatch(deleteUnRoomPatient(data.id));
                    dispatch(addNewNormalPatient(data));
                }
                else {
                    dispatch(deleteUnRoomPatient(data.id));
                    dispatch(addNewUnDoctorPatient(data));
                }
            }
            else console.warn(message);
        }

        const handlePatientOutRoom = (res) => {
            console.log('socket.io patients:out_room res:', res);
            const { message, data } = res;
            if (data) {
                dispatch(deleteNormalPatient(data.id));
                dispatch(addNewUnRoomPatient(data));
            }
            else console.warn(message);
        }

        const handlePatientFinished = (res) => {
            console.log('socket.io patients:finished res:', res)
            const { message, data } = res;
            if (data) {
                dispatch(deleteNormalPatient(data.id));
            }
            else console.warn(message);
        }

        const handlePatientNormalUpdate = (res) => {
            const { message, data } = res;
            console.log('socket.io patients:normal_update res:', res);
            if (data) {
                dispatch(updateNormalPatient(data));
            }
            else console.warn(message);
        }

        socket.on('connect', () => {
            console.log(`Socket connected with id ${socket.id}`);
            // Waiting patients
            socket.on('waiting_patients:selected', handleListenWaitingPatientSelected);
            socket.on('waiting_patients:get_all', listenerGetAll);
            socket.on('waiting_patients:finished', handleFinishedWaitingPatient);

            // polls
            socket.on('polls:create', handlePollsCreate);
            socket.on('polls:update', handlePollUpdate);
            socket.on('polls:processed', handleAddNewPollProcessed);
            // rooms
            socket.on('rooms:create', handleAddNewRoom);
            socket.on('rooms:update', handleUpdateRoom);

            //patients
            socket.on('patients:add_new_un_room', handleAddNewUnRoomPatient);
            socket.on('patients:add_room', handleAddRoomInPatient);
            socket.on('patients:out_room', handlePatientOutRoom);
            socket.on('patients:finished', handlePatientFinished);
            socket.on('patients:normal_update', handlePatientNormalUpdate);
        })

        return () => {
            socket.off('waiting_patients:selected', handleListenWaitingPatientSelected);
            socket.off('waiting_patients:get_all', listenerGetAll);
            socket.off('waiting_patients:finished', handleFinishedWaitingPatient);

            //polls
            socket.off('polls:create', handlePollsCreate);
            socket.off('polls:update', handlePollUpdate);

            //rooms
            socket.off('rooms:create', handleAddNewRoom);
            socket.off('rooms:update', handleUpdateRoom);

            //patients
            socket.off(`patients:add_new_un_room:`, handleAddNewUnRoomPatient);
            socket.off('patients:add_room', handleAddRoomInPatient);
            socket.off('patients:out_room', handlePatientOutRoom);
            socket.off('patients:finished', handlePatientFinished);
            socket.off('patients:normal_update', handlePatientNormalUpdate);
        }

    }, [dispatch, profile.position])

    //set up account and refresh token
    useLayoutEffect(() => {

        const baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.baseURL = baseURL;
        const token = JSON.parse(localStorage.getItem('access_token'));
        if (token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        }

        // some thing else to refresh token
        axios.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            console.log('something wrong in call API', error.response);
            const originalRequest = error.config;
            console.log('originalRequest', originalRequest);

            // 403 request
            if (error.response.status === 403 &&
                originalRequest.url === '/auth/refresh'
            ) {
                console.log('in api response 403 navigate login');
                dispatch(clearAccount());
                dispatch(resetUsers());
                dispatch(notifyError('Xác minh tài khoản của bạn'));
                navigate('/login');
                setTimeout(() => {
                    dispatch(hideNotify())
                }, 4000)
                localStorage.clear();
                return Promise.reject(error);
            }

            // error 401 => refresh
            if (error.response.data.message === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === "Unauthorized") {

                const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
                console.log('refresh_token', refreshToken);
                axios.defaults.headers.common['Authorization'] = 'bearer ';

                if (refreshToken) {
                    console.log('in call api refresh token');

                    await axios.post('/auth/refresh', { token: refreshToken })
                        .then(res => {
                            console.log('res in refresh token', res)
                            const { access_token, refresh_token, data } = res.data;
                            localStorage.setItem('access_token', JSON.stringify(access_token));
                            localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
                            localStorage.setItem('profile', JSON.stringify(data));
                            dispatch(setAccount({
                                access_token: access_token,
                                refresh_token: refresh_token,
                                account: data,
                            }));
                            axios.defaults.headers.common['Authorization'] = `bearer ${access_token}`;
                            originalRequest.headers['Authorization'] = `bearer ${access_token}`;

                            return axios(originalRequest);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else {
                    console.log("Không tồn tại refresh token, đăng nhập lại");
                    navigate('/login');
                }
            }


            return Promise.reject(error);
        });
    }, [dispatch, navigate]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Header></Header>

            <Container maxWidth="lg">
                <hr className="mt-4 mb-4" style={{ border: 'none' }} />
                <Suspense fallback={<div>Loading...</div>}>

                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/admin" element={<Admin />} >
                            <Route path="/admin" element={<Navigate replace to="/admin/schema/1" />} />
                            <Route path="/admin/register" element={<AdminRegister />} />
                            <Route path="/admin/rooms" element={<Rooms />} />
                            <Route path="/admin/medicine" element={<Medicine />} />
                            <Route path="/admin/schema" element={<Schema />} >
                                <Route path="/admin/schema" element={<Navigate replace to="/admin/schema/1" />} />
                                <Route exact path=":classId" element={<SchemaParams />} />
                            </Route>
                        </Route>

                        <Route exact path="/dean" element={<Dean />}>
                            <Route path="/dean" element={<Navigate replace to="/dean/rooms" />} />
                            <Route path="/dean/rooms" element={<Rooms />} />
                            <Route path="/dean/patient-transfer" element={<PatientTransfer />} />
                            <Route path="/dean/selective" element={<Selective />} />
                        </Route>

                        <Route exact path="/doctor" element={<Doctor />}>
                            <Route path="/doctor" element={<Navigate replace to="/doctor/my-patients" />} />
                            <Route path="/doctor/my-patients" element={<MyPatientsList />} />
                            <Route path="/doctor/waiting-patient" element={<WaitingPatientCheck />} />
                            <Route path="/doctor/patient-check" element={<PatientCheck />} />
                            <Route path="/doctor/recipes" element={<MedicineRecipe />} />
                        </Route>

                        <Route exact path="/coordinator" element={<Coordinator />} />

                        <Route exact path="/patient" element={<Patient />}>
                            <Route path="/patient" element={<Navigate replace to="/patient/register" />} />
                            <Route path="/patient/register" element={<PatientRegister />} />
                            <Route path="/patient/info" element={<Information />} />
                        </Route>

                        <Route exact path="/nurse" element={<Nurse />} />

                        <Route path="/" element={<Home />} />
                        <Route path="/*" element={<Navigate replace to="/" />} />
                    </Routes>

                </Suspense>

            </Container>

            <Notify></Notify>
        </React.Fragment>
    );
}

export default App;

