import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Btn from '../../common/Btn';
import actions from '../../../redux/actions';
const { notifyInfo, notifyError, setAccount, hideNotify } = actions;

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không tồn tại, vui lòng kiểm tra lại!')
                .required('Bạn chưa nhập email!'),
            password: Yup.string()
                .required('Bạn chưa nhập mật khẩu!')
        }),

        onSubmit: (values, { resetForm }) => {
            console.log('values', values);

            axios({
                method: 'post',
                url: '/auth/login',
                data: values,
            })
                .then(res => {
                    console.log('res', res);
                    const { access_token, refresh_token, data } = res.data;
                    console.log('res.data', res.data)
                    dispatch(setAccount({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        account: data,
                    }));

                    localStorage.setItem('access_token', JSON.stringify(access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
                    localStorage.setItem('profile', JSON.stringify(data));
                    axios.defaults.headers.common['Authorization'] = `bearer ${access_token}`;
                    dispatch(notifyInfo(`Bạn đã đăng nhập thành công email: ${data.email}`));
                    setTimeout(() => {
                        dispatch(hideNotify())
                    }, 4000);
                    navigate('/');
                })
                .catch(err => {
                    console.log('err', err);
                    dispatch(notifyError('Đăng nhập thất bại, email hoặc mật khẩu không đúng'));
                    setTimeout(() => {
                        dispatch(hideNotify())
                    }, 4000)
                });
        }
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mt-2"
        >

            <div className="mb-2">
                <input
                    id="email"
                    type="text"
                    placeholder="Email"

                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error fs-12">{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="mb-2">
                <input
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error fs-12">{formik.errors.password}</div>
                ) : null}
            </div>

            <Btn type="submit" title="Đăng nhập" />
        </form>
    );
}

export default LoginForm;
