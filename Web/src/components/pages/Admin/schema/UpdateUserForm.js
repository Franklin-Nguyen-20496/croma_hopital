import React, { } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { removeEmptyValues } from '../../../../helper/object';
import PreviewUpdateImg from './PreviewUpdateImg';
import Btn from '../../../common/Btn';
import actions from '../../../../redux/actions';
const { updateUser, notifyInfo, notifyWarn, setUpdateFalse } = actions;

const UpdateUserForm = ({ user }) => {

    const dispatch = useDispatch();
    const { email, name, age, address, position, role } = user;

    const formik = useFormik({
        enableReinitialize: true, // enables changing initialState in formik
        initialValues: {
            email: email || 'tuanhoang@gmail.com',
            name: name || 'tuanhoang',
            file: '',
            password: '',
            confirmPassword: '',
            age: age || '23',
            address: address || 'Quảng Nam',
            position: position || 3,
            role: role || 3,
        },
        validationSchema: yup.object().shape({
            file: yup.mixed()
                .nullable(),
            name:
                yup.string()
                    .nullable()
                    .max(32, 'Quá dài, email tối đa là 32 ký tự'),
            email:
                yup.string()
                    .nullable()
                    .email('Email không tồn tại, vui lòng kiểm tra lại!'),
            password:
                yup.string()
                    .nullable()
                    .min(8, 'Quá ngắn, mật khẩu tối tối thiểu 8 kí tự')
                    .max(32, 'Quá dài, mật khẩu tối da 32 kí tự'),
            confirmPassword:
                yup.string().when("password", {
                    is: val => (val && val.length > 0 ? true : false),
                    then: yup.string().trim().oneOf(
                        [yup.ref("password")],
                        "Mật khẩu không khớp!"
                    )
                }),
            age:
                yup.number('Bạn chưa nhập tuổi')
                    .nullable()
                    .min(0, 'Tuổi không hợp lệ')
                    .max(117, 'Really? The oldest person in the world is 117 years old :))'),
            address:
                yup.string()
                    .nullable()
                    .max(125, 'Quá dài, địa chỉ tối da 125 kí tự'),
            position:
                yup.number().nullable(),
            role:
                yup.number().nullable(),
        }),
        validate: values => {
            let errors = {}
            if (_.isEqual(formik.initialValues, values)) {
                errors.error = 'No different initial values';
            }

            if (values.file) {
                let type = values.file.type.split("/")[0];

                if (type !== "image") {
                    errors.file = "The Uploaded file must be a Image."
                }
            }

            return errors
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log(values);

                const newValues = removeEmptyValues(values);
                console.log('newValues', newValues);

                if (!newValues.file) {

                    console.log('Khong cap nhat anh');
                    await axios({
                        method: 'PUT',
                        url: `users/update/${user._id}`,
                        headers: { 'Content-Type': 'application/json' },
                        data: newValues
                    })
                        .then(res => {
                            console.log(res);
                            dispatch(updateUser({ ...user, ...newValues }));
                            dispatch(notifyInfo(`Chỉnh sửa thành công tài khoản`));
                            setTimeout(() => {
                                dispatch(notifyInfo(''));
                            }, 4000);
                            dispatch(setUpdateFalse());
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else {
                    // read file image from element
                    let bodyFormData = new FormData();
                    bodyFormData.append('file', newValues.file);

                    await axios({
                        method: 'delete',
                        url: user.file,
                    })
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => console.log(err))

                    await axios({
                        method: 'post',
                        url: '/file/upload',
                        headers: { 'Content-Type': 'multipart/form-data' },
                        data: bodyFormData
                    })
                        .then(res => {
                            console.log(res)
                            const linkImg = res.data;
                            const newUser2 = {
                                ...newValues,
                                file: linkImg,
                            }
                            console.log('newUser', newUser2);
                            axios({
                                method: 'put',
                                url: `users/update/${user._id}`,
                                headers: { 'Content-Type': 'application/json' },
                                data: newUser2,
                            })
                                .then((response) => {
                                    console.log('response', response);
                                    dispatch(notifyInfo(`Chỉnh sửa thành công tài khoản`));
                                    setTimeout(() => {
                                        dispatch(notifyInfo(''));
                                    }, 4000);
                                    dispatch(updateUser({ ...user, ...newUser2 }));
                                    dispatch(setUpdateFalse());
                                })
                                .catch((error) => {
                                    axios({
                                        method: 'delete',
                                        url: linkImg,
                                    })
                                        .then((response2) => {
                                            console.log('response in delete photo', response2);
                                        })
                                        .catch((error2) => {
                                            console.log('error in delete photo', error2);
                                        })
                                })
                        })
                        .catch((err) => {
                            console.log('err', err);
                        })
                }

            } catch (error) {
                console.log('error', error);
            }
        },
    })

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">


                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email"
                        {...formik.getFieldProps('email')}
                    />

                    {formik.touched.email && formik.errors.email ? (
                        <div className="error fs-12">{formik.errors.email}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="name">Họ và tên:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="name"
                        {...formik.getFieldProps('name')}
                    />

                    {formik.touched.name && formik.errors.name ? (
                        <div className="error fs-12">{formik.errors.name}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="password">Mật khẩu mới:</label>
                    <input id="password"
                        {...formik.getFieldProps('password')}
                        type="password"
                        placeholder="new password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error fs-12">{formik.errors.password}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="confirmPassword">Xác minh mật khẩu:</label>
                    <input
                        id="confirmPassword"
                        {...formik.getFieldProps('confirmPassword')}
                        type="password"
                        placeholder="confirmPassword"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="error fs-12">{formik.errors.confirmPassword}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="file">Ảnh đại diện</label>
                    <input
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                formik.setFieldValue("file", e.target.files[0]);
                            }
                        }}
                        type="file"
                        id="file"
                        name="file"
                    />

                    {user.file && <PreviewUpdateImg img={user.file} file={formik.values.file} />}
                    {formik.touched.file && formik.errors.file ? (
                        <div className="error fs-12">{formik.errors.file}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="age">Tuổi:</label>
                    <input id="age"
                        {...formik.getFieldProps('age')}
                        type="number"
                        placeholder="age"
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <div className="error fs-12">{formik.errors.age}</div>
                    ) : null}
                    <hr className="mb-2"
                    />

                    <label htmlFor="address">Địa chỉ:</label>
                    <input id="address"
                        {...formik.getFieldProps('address')}
                        type="text"
                        placeholder="address"
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="error fs-12">{formik.errors.address}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="position">Nơi làm việc:</label>
                    <select as="select" id="position"
                        {...formik.getFieldProps('position')}
                        type="number"
                    >
                        <option value="" label="Chọn vị trí" />
                        <option value="1" label="Khoa ngoại" />
                        <option value="2" label="Khoa tim mạch" />
                        <option value="3" label="Khoa hô hấp" />
                    </select>
                    {formik.touched.position && formik.errors.position ? (
                        <div className="error fs-12">{formik.errors.position}</div>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="role">Nơi làm việc:</label>
                    <select as="select" id="role"
                        {...formik.getFieldProps('role')}
                        type="text" >
                        <option value="" label="Chọn chức danh" />
                        <option value="2" label="Trưởng khoa" />
                        <option value="3" label="Bác sĩ" />
                        <option value="4" label="Y tá" />
                        <option value="5" label="Điều phối viên" />
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="error fs-12">{formik.errors.role}</div>
                    ) : null}
                    <hr className="mb-2" />

                    {formik.errors.error ? (
                        <div className="error fs-14 text-end">{formik.errors.error}</div>
                    ) : null}

                    <div className="d-flex justify-content-end" >
                        <Btn
                            marginRight="2" type="button" title="Hủy"
                            onClick={() => dispatch(setUpdateFalse())}
                        />
                        <Btn type="submit" title="Cập nhật tài khoản" />
                    </div>

                </div>
            </form>
        </div>
    );
}

export default UpdateUserForm;
