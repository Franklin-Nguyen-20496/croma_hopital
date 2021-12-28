import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';

import PreviewImg from './PreviewImg';
import actions from '../../../../redux/actions/';
import Btn from '../../../common/Btn';
const { addUser, notifyInfo } = actions;

const ImageForm = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            file: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: '',
            address: '',
            position: '',
            role: '',
        },
        validationSchema: yup.object().shape({
            file: yup.mixed()
                .nullable(),
            name:
                yup.string()
                    .max(32, 'Quá dài, email tối đa là 32 ký tự')
                    .required('Bạn chưa nhập họ và tên!'),
            email:
                yup.string()
                    .email('Email không tồn tại, vui lòng kiểm tra lại!')
                    .required('Bạn chưa nhập email!'),
            password:
                yup.string()
                    .min(8, 'Quá ngắn, mật khẩu tối tối thiểu 8 kí tự')
                    .max(32, 'Quá dài, mật khẩu tối da 32 kí tự')
                    .required('Bạn chưa nhập mật khẩu!'),
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
                    .min(0, 'Tuổi không hợp lệ')
                    .max(117, 'Really? The oldest person in the world is 117 years old :))')
                    .required('Bạn chưa nhập tuổi'),
            address:
                yup.string()
                    .max(125, 'Quá dài, địa chỉ tối da 125 kí tự')
                    .required('Bạn chưa nhập địa chỉ'),
            position:
                yup.number()
                    .required('Bạn chưa chọn khoa'),
            role:
                yup.number()
                    .required('Bạn chưa chọn vai trò'),
        }),
        validate: values => {
            let errors = {}

            if (values.file.length === 0) {
                errors.file = "This is required."
            } else {
                let type = values.file.type.split("/")[0];

                if (type !== "image") {
                    errors.file = "The Uploaded file must be a Image."
                }
            }

            return errors
        },
        onSubmit: async (values, { resetForm }) => {

            console.log(values);
            const { file, ...user } = values;
            console.log(file, user);

            // read file image from element
            let bodyFormData = new FormData();
            bodyFormData.append('file', file);

            await axios({
                method: 'post',
                url: '/file/upload',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: bodyFormData
            })
                .then(res => {
                    console.log(res)
                    const file = res.data;
                    const newUser = {
                        ...user,
                        file: file,
                    }
                    console.log('newUser', newUser);
                    axios({
                        method: 'post',
                        url: '/users/create',
                        headers: { 'Content-Type': 'application/json' },
                        data: newUser,
                    })
                        .then((response) => {
                            console.log('response', response);
                            dispatch(notifyInfo(`Tạo thành công tài khoản với email ${response.data.email}`));
                            setTimeout(() => dispatch(notifyInfo('')), 4000);
                            resetForm();
                            dispatch(addUser(response.data));
                        })
                        .catch((error) => {
                            axios({
                                method: 'delete',
                                url: file,
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
        },
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">

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



                    <label htmlFor="password">Mật khẩu:</label>
                    <input id="password"
                        {...formik.getFieldProps('password')}
                        type="password"
                        placeholder="password"
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
                    <input type="file"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                formik.setFieldValue("file", e.target.files[0]);
                            }
                        }}
                        name="file"
                    />
                    {formik.values.file && <PreviewImg file={formik.values.file} />}
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

                    <Btn type="submit" title="Tạo tài khoản" />
                </div>
            </form>
        </div>
    );
}

export default ImageForm;
