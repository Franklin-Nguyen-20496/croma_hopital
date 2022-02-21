
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import Btn from '../../../common/Btn';
import ErrorMessage from '../../../common/ErrorMessage';

const MedicineForm = (props) => {
    const { showForm, setShowForm, setMedicines } = props;
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            unit: '',
            total: '',
        },
        validationSchema: yup.object({
            name: yup.string()
                .max(32, 'Tên thuốc không dài quá 32 kí tự!')
                .required('Chưa có tên thuốc!'),
            unit: yup.string()
                .required('Chưa có đơn vị!'),
            total: yup.number()
                .min(0, 'Số lượng thuốc không đúng!')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log('values', values);
            axios({
                method: 'post',
                url: '/medicines/create',
                data: values,
            })
                .then(res => {
                    const { data, message } = res.data;
                    if (data) {
                        console.log('data', data);
                        setShowForm(false);
                        setMedicines(prev => {
                            return [...prev, data,]
                        })
                        resetForm();
                    }
                    else setErrorMessage(message);
                })
                .catch(error => console.log(error))
        },
    })

    return (
        <div
            className={showForm ? 'd-block' : 'd-none'}
        >
            <p className="fs-20 fw-700">Thêm thuốc mới</p>
            <form
                className="row gap-16 mt-1"
                onSubmit={formik.handleSubmit}
            >
                <div className="col-12 col-sm-6 col-lg-4">
                    <label htmlFor="name">Tên thuốc</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="name"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="error fs-12">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="col-12 col-sm-6 col-lg-4 ">
                    <label htmlFor="total">Số lượng</label>
                    <input
                        id="total"
                        type="number"
                        placeholder="total"
                        {...formik.getFieldProps('total')}
                    />
                    {formik.touched.total && formik.errors.total ? (
                        <div className="error fs-12">{formik.errors.total}</div>
                    ) : null}
                </div>

                <div className="col-12 col-sm-6 col-lg-4 ">
                    <label htmlFor="unit">Đơn vị</label>
                    <select as="select" id="unit"
                        {...formik.getFieldProps('unit')}
                        type="text" >
                        <option value="" label="Chọn đơn vị" />
                        <option value="viên" label="viên" />
                        <option value="gam" label="gam" />
                        <option value="ml" label="ml" />
                    </select>
                    {formik.touched.unit && formik.errors.unit ? (
                        <div className="error fs-12">{formik.errors.unit}</div>
                    ) : null}
                </div>

                <div className="col-12 row">
                    {errorMessage && <ErrorMessage
                        moreClass="col-12 text-end fs-14 pd-0"
                    >  {errorMessage}
                    </ErrorMessage>}
                    <div className="col-12 d-flex justify-content-end">
                        <Btn
                            type="submit"
                            title="Thêm thuốc"
                            moreClass="mt-1 mr-1"
                        />
                        <Btn
                            title="Hủy"
                            moreClass="mt-1 "
                            bgColor="bg-red"
                            onClick={() => {
                                setShowForm(false);
                                setErrorMessage('');
                                formik.resetForm();
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MedicineForm;
