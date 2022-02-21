
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import io from 'socket.io-client';

import ErrorMsg from '../../../common/ErrorMessage';
import Btn from '../../../common/Btn';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const AddRoom = ({ showAddRoom, setShowAddRoom }) => {
    const rooms = useSelector(state => state.rooms.list);
    console.log('rooms in addRoom', rooms)

    const formik = useFormik({
        initialValues: {
            positionRoom: '',
            levelRoom: '',
        },
        validationSchema: yup.object().shape({
            positionRoom: yup.number()
                .min(1, 'Chọn khoa ứng với phòng bệnh')
                .max(3, 'Chọn khoa ứng với phòng bệnh')
                .required('Chọn khoa ứng với phòng bệnh'),
            levelRoom: yup.number()
                .min(1, 'Phòng có level từ 1-6')
                .max(6, 'Phòng có level từ 1-6')
                .required('Chưa có cấp độ của phòng'),
        }),

        validate: () => { },
        onSubmit: (values, { resetForm }) => {

            const { positionRoom, levelRoom } = values;
            const profileAdmin = JSON.parse(localStorage.getItem('profile'));

            const newValues = {
                positionRoom: Number(positionRoom),
                levelRoom: Number(levelRoom),
                agreed: [profileAdmin.id]
            }
            console.log('newValue', newValues);

            socket.emit('polls:create', newValues);
            resetForm();
            setShowAddRoom(false);
        }
    })

    return (
        <div
            style={backDropStyle}
            className={clsx(showAddRoom ? 'd-block' : 'd-none')}
            onClick={() => setShowAddRoom(false)}
        >
            <div
                className="bg-white big-shadow animation-opacity p-2 ml-1 mr-1"
                style={formStyle}
                onClick={(event) => event.stopPropagation()}
            >
                <p className="fs-18 fw-600 mb-2">Thêm phòng bệnh</p>

                <form
                    onSubmit={formik.handleSubmit}
                    className="text-start"
                >

                    <label htmlFor="positionRoom">Phòng thuộc khoa:</label>
                    <select
                        id="positionRoom"
                        type="number"
                        {...formik.getFieldProps('positionRoom')}
                    >
                        <option value={0} label="Chọn khoa" />
                        <option value={1} label="Khoa chấn thương chỉnh hình" />
                        <option value={2} label="Khoa hô hấp" />
                        <option value={3} label="Khoa tim mạch" />
                    </select>

                    {formik.touched.positionRoom && formik.errors.positionRoom ? (
                        <ErrorMsg >{formik.errors.positionRoom}</ErrorMsg>
                    ) : null}
                    <hr className="mb-2" />

                    <label htmlFor="levelRoom">Cấp độ:</label>
                    <select
                        id="levelRoom"
                        type="number"
                        {...formik.getFieldProps('levelRoom')}
                    >
                        <option value={0} label="Chọn cấp độ" />
                        <option value={1} label="1" />
                        <option value={2} label="2" />
                        <option value={3} label="3" />
                        <option value={4} label="4" />
                        <option value={5} label="5" />
                        <option value={6} label="6" />
                    </select>

                    {formik.touched.levelRoom && formik.errors.levelRoom ? (
                        <ErrorMsg >{formik.errors.levelRoom}</ErrorMsg>
                    ) : null}
                    <hr className="mb-2" />

                    <div className="row justify-content-end">
                        <Btn type="submit" title="Thăm dò ý kiến" marginBottom="2" />
                        <Btn type="button"
                            title="Hủy"
                            bgColor="bg-red"
                            marginLeft="2"
                            onClick={() => setShowAddRoom(false)}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}

const backDropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 100,
}

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(calc(-50% - 5rem))',
    maxWidth: '40rem',
    width: '100%'
}

export default AddRoom;
