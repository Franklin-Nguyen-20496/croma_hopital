
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import Btn from '../../common/Btn';
import ErrorMsg from '../../common/ErrorMessage';
import actions from '../../../redux/actions';

const { notifyInfo, hideNotify } = actions;

//function check gender number return string if gender
const checkGender = (number) => {
    switch (number) {
        case 1:
            return 'Nam';
        case 2:
            return 'Nữ'
        default:
            return '...';
    }
}

const Information = () => {
    const dispatch = useDispatch();
    const [patient, setPatient] = useState({});
    const phoneNumber = useSelector(state => {
        console.log(state);
        return state.waitingPatients.searchInfo
    });
    console.log('phoneNumber', phoneNumber)

    useEffect(() => {
        if (phoneNumber) {
            setTimeout(() => {
                axios({
                    method: 'get',
                    url: `waiting/${phoneNumber}`,
                })
                    .then(res => {
                        console.log(res);
                        setPatient(res.data.data);
                    })
                    .catch(err => console.log(err))
            }, 1000)
        }
    }, [phoneNumber])

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: yup.object().shape({
            phone: yup.string()
                .min(9, 'Số điện thoại không đúng!')
                .max(12, 'Số điện thoại không đúng!')
                .required('Nhập số điện thoại của bạn'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            axios({
                method: 'get',
                url: `waiting/${values.phone}`,
            })
                .then(res => {
                    console.log('res', res);
                    dispatch(notifyInfo(res.data.message));
                    setPatient(res.data.data);
                    setTimeout(() => {
                        dispatch(hideNotify());
                    }, 4000);
                    // resetForm();
                })
                .catch(err => console.log(err))
        }
    })

    return (
        <div style={{
            maxWidth: '36rem',
            margin: 'auto',
        }}
        >
            <h1 className="text-center fs-16 fs-md-20 fs-600 mb-2">
                Xem thông tin khám chữa bệnh
            </h1>
            <form
                onSubmit={formik.handleSubmit}
            >
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                    type="text"
                    id="phone"
                    placeholder="0123456789..."
                    {...formik.getFieldProps('phone')}
                />

                {formik.touched.phone && formik.errors.phone ? (
                    <ErrorMsg >{formik.errors.phone}</ErrorMsg>
                ) : null}
                <div
                    className={clsx('text-end mt-2')}
                >
                    <Btn title="Tra cứu" type="submit" />
                </div>
            </form>
            <hr className="mt-5 mb-1" />
            {
                (_.isEmpty(patient) === false) && (
                    <div className="br-20 fs-14 text-center bg-gray pt-3 pb-3 pl-2 pr-2">
                        <div
                            style={{
                                minWidth: '16rem',
                                maxWidth: '16rem',
                                height: '16rem',
                                backgroundImage: `url(${patient.file ? patient.file : process.env.REACT_APP_DEFAULT_IMG})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'none'
                            }}
                            className="br-full m-auto mb-2"
                            title={patient.name}
                        >
                        </div>
                        <h3 className="fs-16 fw-600">Bệnh nhân {patient.name}</h3>
                        <p>Mức độ bệnh: {patient.score}</p>
                        <p>Tuổi: {patient.age > 0 ? patient.age : '...'}</p>
                        <p>Giới tính: {checkGender(patient.gender)}</p>
                        {patient.antecedent && <p>Tiền sử bệnh: {patient.antecedent}</p>}
                        <p>{patient.covid19 ? 'Đã xét nghiệm covid19' :
                            'Chưa xét nghiệm covid19'
                        }</p>

                    </div>
                )
            }

        </div>
    );
}

export default Information;
