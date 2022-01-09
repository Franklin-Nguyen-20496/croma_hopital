import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import ErrorMsg from '../../common/ErrorMessage';
import Btn from '../../common/Btn';
import PreviewImg from '../../common/PreviewImg';
import actions from '../../../redux/actions';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const { notifyInfo, hideNotify, setSearchInfo } = actions;

const PatientRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            score: '',
            file: '',
            age: '',
            gender: '',
            antecedent: '',
            covid19: '',
        },
        validationSchema: yup.object().shape({
            file: yup.mixed()
                .nullable(),
            name: yup.string()
                .max(32, 'Quá dài tối đa 32 kí tự!')
                .required('Bạn chưa nhập họ tên'),
            phone: yup.string()
                .min(9, 'Số điện thoại không đúng!')
                .max(12, 'Số điện thoại không đúng!')
                .required('Nhập số điện thoại của bạn'),
            score: yup.number()
                .min(1, 'Thang đo mức độ từ 1-10')
                .max(10, 'Thang đo mức độ bệnh từ 1-10')
                .required('Vui lòng cho biết mức độ bệnh'),
            age: yup.number('Bạn chưa nhập tuổi')
                .min(0, 'Tuổi không hợp lệ')
                .max(117, 'Really? The oldest person in the world is 117 years old :))')
                .nullable(),
            gender: yup.number()
                .nullable(),
            antecedent: yup.string()
                .nullable(),
            covid19: yup.boolean()
                .nullable(),
        }),
        validate: () => { },
        onSubmit: async (values, { resetForm }) => {
            console.log(values)

            const { file, ...patient } = values;
            console.log(file, patient);

            if (file) {
                let bodyFormData = new FormData();
                bodyFormData.append('file', file);

                await axios({
                    method: 'post',
                    url: '/file/upload',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: bodyFormData
                })
                    .then(res => {
                        console.log('res', res);
                        const newFile = res.data;
                        const newPatient = { ...patient, file: newFile };
                        console.log('new patient', newPatient);

                        socket.emit('waiting_patients:create', newPatient);
                        dispatch(notifyInfo('Đã đăng ký khám chữa bệnh'));
                        setTimeout(() => {
                            dispatch(hideNotify());
                        }, 4000);
                        resetForm();
                        dispatch(setSearchInfo(values.phone));
                        navigate('/patient/info');
                    })
                    .catch(err => {
                        console.log('error', err);
                    })
            }
            else {
                // no image
                socket.emit('waiting_patients:create', patient);
                dispatch(notifyInfo('Đã đăng ký khám chữa bệnh'));
                setTimeout(() => {
                    dispatch(hideNotify());
                }, 4000);
                resetForm();
                dispatch(setSearchInfo(values.phone));
                navigate('/patient/info');
            }
        },
    });

    return (
        <div
            style={{
                maxWidth: '36rem',
                margin: 'auto',
            }}
        >
            <h1 className="fs-24 fw-500 text-center mb-2">Đăng ký khám chữa bệnh</h1>
            <form
                onSubmit={formik.handleSubmit}>


                <label htmlFor="name">Họ và tên:</label>
                <input
                    id="name"
                    type="text"
                    placeholder="name"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                    <ErrorMsg >{formik.errors.name}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />

                <label htmlFor="phone">Số diện thoại:</label>
                <input
                    id="phone"
                    type="text"
                    placeholder="phone"
                    {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <ErrorMsg >{formik.errors.phone}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />


                <label htmlFor="score">Đánh giá mức độ bệnh:</label>
                <select
                    id="score"
                    type="number"
                    {...formik.getFieldProps('score')}
                >
                    <option value={0} label="Chọn mức độ" />
                    <option value={1} label="1" />
                    <option value={2} label="2" />
                    <option value={3} label="3" />
                    <option value={4} label="4" />
                    <option value={5} label="5" />
                    <option value={6} label="6" />
                    <option value={7} label="7" />
                    <option value={8} label="8" />
                    <option value={9} label="9" />
                    <option value={10} label="10" />
                </select>

                {formik.touched.score && formik.errors.score ? (
                    <ErrorMsg >{formik.errors.score}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />

                <label htmlFor="file">Ảnh đại diện:</label>
                <input
                    id="file"
                    type="file"
                    placeholder="file"
                    onChange={(e) => {
                        if (e.target.value[0]) {
                            formik.setFieldValue('file', e.target.files[0]);
                        }
                    }}
                />
                {formik.values.file && <PreviewImg file={formik.values.file} />}
                {formik.touched.file && formik.errors.file ? (
                    <ErrorMsg >{formik.errors.file}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />


                <label htmlFor="age">Tuổi:</label>
                <input
                    id="age"
                    type="number"
                    placeholder="age"
                    {...formik.getFieldProps('age')}
                />

                {formik.touched.age && formik.errors.age ? (
                    <ErrorMsg >{formik.errors.age}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />


                <label htmlFor="gender">Giới tính:</label>
                <select
                    id="gender"
                    type="number"
                    {...formik.getFieldProps('gender')}
                >
                    <option value="" label="Chọn giới tính" />
                    <option value="1" label="nam" />
                    <option value="2" label="nữ" />
                    <option value="3" label="khác" />
                </select>

                {formik.touched.gender && formik.errors.gender ? (
                    <ErrorMsg >{formik.errors.gender}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />

                <label htmlFor="antecedent">Tiền sử bệnh tật:</label>
                <input
                    id="antecedent"
                    type="text"
                    placeholder="antecedent"
                    {...formik.getFieldProps('antecedent')}
                />

                {formik.touched.antecedent && formik.errors.antecedent ? (
                    <ErrorMsg >{formik.errors.antecedent}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />
                <div className="d-flex align-items-center">
                    <label htmlFor="covid19">Đã xét nghiệm Covid19:</label>
                    <input

                        id="covid19"
                        type="checkbox"
                        placeholder="covid19"
                        {...formik.getFieldProps('covid19')}
                    />
                </div>


                {formik.touched.covid19 && formik.errors.covid19 ? (
                    <ErrorMsg >{formik.errors.covid19}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />

                <div className="fl-right">
                    <Btn type="submit" title="Đăng kí" />
                </div>
            </form>
        </div>
    );
};

export default PatientRegister;
