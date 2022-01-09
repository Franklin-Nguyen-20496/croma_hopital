
import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import ErrorMsg from '../../common/ErrorMessage';
import Btn from '../../common/Btn';

const AddDiseaseForm = ({ handlePatientSubmit, handleFinishedProfile }) => {
    const formik = useFormik({
        initialValues: {
            disease: '',
            score: '',
        },
        validationSchema: yup.object().shape({
            disease: yup.string()
                .max(32, 'Tênh bệnh tối đa 32 kí tự!')
                .required('Nhập loại bệnh của bệnh nhân'),
            score: yup.number()
                .min(1, 'Thang đo mức độ từ 1-6')
                .max(6, 'Thang đo mức độ bệnh từ 1-6')
                .required('Vui lòng cho biết mức độ bệnh'),
        }),

        validate: () => { },
        onSubmit: (values, { resetForm }) => {

            const newValues = {
                disease: values.disease,
                score: Number(values.score)
            }
            // console.log('values', values);
            handlePatientSubmit(newValues, { resetForm });
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Loại bệnh:</label>
                <input
                    id="disease"
                    type="text"
                    placeholder="bệnh..."
                    {...formik.getFieldProps('disease')}
                />
                {formik.touched.disease && formik.errors.disease ? (
                    <ErrorMsg >{formik.errors.disease}</ErrorMsg>
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
                </select>

                {formik.touched.score && formik.errors.score ? (
                    <ErrorMsg >{formik.errors.score}</ErrorMsg>
                ) : null}
                <hr className="mb-2" />
                <div className="row">
                    <Btn type="submit" title="Chẩn đoán xong" marginRight="2" marginBottom="2" />
                    <Btn type="button"
                        onClick={() => { handleFinishedProfile(formik.values) }}
                        title="Hoàn thiện hồ sơ"
                        marginRight="2"
                    />
                </div>
            </form>
        </>
    );
}

export default AddDiseaseForm;
