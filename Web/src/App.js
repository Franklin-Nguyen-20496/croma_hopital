import React, { Suspense, lazy, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './App.scss';
import actions from './redux/actions';
import Header from './components/pages/Header/Header';
import SchemaParams from './components/pages/Admin/schema/SchemaParams';
import Notify from './components/common/Notify';

const { clearAccount, resetUsers, notifyError, setAccount, getAllUsers } = actions;
const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const Schema = lazy(() => import('./components/pages/Admin/schema'));
const Admin = lazy(() => import('./components/pages/Admin'));
const Register = lazy(() => import('./components/pages/Admin/register'));

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    dispatch(notifyError(''))
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
                            <Route path="/admin/register" element={<Register />} />
                            <Route path="/admin/schema" element={<Schema />} >
                                <Route path="/admin/schema" element={<Navigate replace to="/admin/schema/1" />} />
                                <Route exact path=":classId" element={<SchemaParams />} />
                            </Route>
                        </Route>
                        <Route path="/" element={<Home />} />
                    </Routes>

                </Suspense>
                <Notify></Notify>
            </Container>

        </React.Fragment>
    );
}

export default App;

