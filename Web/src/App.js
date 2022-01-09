import React, { Suspense, lazy, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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

const { clearAccount, resetUsers, notifyError, setAccount, hideNotify,
    setAllWaitingPatients, setHighestWaitingPatient, setSelectedPatient,
    setFinishedId
} = actions;
const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const Schema = lazy(() => import('./components/pages/Admin/schema'));
const Admin = lazy(() => import('./components/pages/Admin'));
const AdminRegister = lazy(() => import('./components/pages/Admin/register'));
const Patient = lazy(() => import('./components/pages/Patient'));
const Coordinator = lazy(() => import('./components/pages/Coordinator'));
const Doctor = lazy(() => import('./components/pages/Doctor'));

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // connect socket
    useEffect(() => {
        const listenerGetAll = (res) => {
            console.log('res when listen get all waiting patients', res);
            if (res.data) {
                dispatch(setAllWaitingPatients(res.data))
            }
        }

        const handleListenWaitingPatientSelected = (res) => {
            console.log('res selected item', res);
            if (res.data) {
                dispatch(setSelectedPatient(res.data));
            }
        }

        const handleFinishedWaitingPatient = (id) => {
            console.log('res finished id', id);
            if (id) dispatch(setFinishedId(id))
        }

        socket.on('connect', () => {
            console.log(`Socket connected with id ${socket.id}`);
            socket.on('waiting_patients:selected', handleListenWaitingPatientSelected);
            socket.on('waiting_patients:get_all', listenerGetAll);
            socket.on('waiting_patients:finished', handleFinishedWaitingPatient)
        })

        socket.on('hello', (res) => {
            console.log(`socket response: ${res}`)
        })

        return () => {
            socket.off('waiting_patients:get_all', listenerGetAll);
            socket.off('waiting_patients:selected', handleListenWaitingPatientSelected);
        }

    }, [dispatch])

    useLayoutEffect(() => {

        const baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.baseURL = baseURL;
        const token = JSON.parse(localStorage.getItem('access_token'));
        if (token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        }

        console.log('img', process.env.REACT_APP_DEFAULT_IMG);


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
                setTimeout(() => {
                    dispatch(hideNotify())
                }, 4000)
                localStorage.clear();
                navigate('/login');
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
    }, []);

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
                            <Route path="/admin/schema" element={<Schema />} >
                                <Route path="/admin/schema" element={<Navigate replace to="/admin/schema/1" />} />
                                <Route exact path=":classId" element={<SchemaParams />} />
                            </Route>
                        </Route>

                        <Route exact path="/patient" element={<Patient />}>
                            <Route path="/patient" element={<Navigate replace to="/patient/register" />} />
                            <Route path="/patient/register" element={<PatientRegister />} />
                            <Route path="/patient/info" element={<Information />} />
                        </Route>

                        <Route exact path="/doctor" element={<Doctor />}>
                            <Route path="/doctor" element={<Navigate replace to="/doctor/my-patients" />} />
                            <Route path="/doctor/my-patients" element={<MyPatientsList />} />
                            <Route path="/doctor/waiting-patient" element={<WaitingPatientCheck />} />
                            <Route path="/doctor/patient-check" element={<PatientCheck />} />
                            <Route path="/doctor/recipes" element={<MedicineRecipe />} />
                        </Route>

                        <Route exact path="/coordinator" element={<Coordinator />} />

                        <Route path="/" element={<Home />} />
                    </Routes>

                </Suspense>

            </Container>

            <Notify></Notify>
        </React.Fragment>
    );
}

export default App;

