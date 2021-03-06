
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';
import _ from 'lodash';

import InputIcon from '../../../common/InputIcon';
import Btn from '../../../common/Btn';
import NurseItem from './NurseItem';
import PatientItem from './PatientItem';
import SearchRecipesContent from './SearchRecipesContent';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const PatientCheckForm = ({ item, dispatch, profile }) => {

    const [initialValues, setInitialValues] = useState(initialForm);
    const [roomInfo, setRoomInfo] = useState('')
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (initialValues.room) {
            axios({
                method: 'get',
                url: `/rooms/name/${initialValues.room}`
            })
                .then(res => {
                    const { message, data } = res.data;
                    if (data) {
                        setRoomInfo(data);
                        console.log('room data', data);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err));
        }
    }, [initialValues.room])

    //hide showSearch when click
    useEffect(() => {
        const handleHideShowSearch = () => {
            setShowSearch(false);
        }

        window.addEventListener('click', handleHideShowSearch);
        return () => {
            window.removeEventListener('click', handleHideShowSearch)
        }
    }, [])

    useEffect(() => {
        if (item) {
            setInitialValues(item);
        }
    }, [item])

    const validationSchema = yup.object().shape({
        name: yup.string().required('Ch??a c?? b???nh nh??n n??o'),
        age: yup.number()
            .min(0, 'Tu???i kh??ng h???p l???')
            .max(117, 'Really? The oldest person in the world is 117 years old :))')
            .nullable(),
        disease: yup.string().required('Ch??a c?? t??n b???nh!'),
        score: yup.number().required('Ch??a c?? m???c ????? b???nh!'),
        medicationTime: yup.number()
            .max(3, 'Ch??a c?? th???i gian d??ng thu???c!')
            .min(1, 'Ch??a c?? th???i gian d??ng thu???c!')
            .required('Ch??a c?? th???i gian d??ng thu???c!'),
        recipeName: yup.string().required('Ch??a c?? c??ng th???c thu???c!'),
        recipeID: yup.string().required(),
    })

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    if (!_.isEqual(initialValues, values)) {
                        const score = Number(values.score);
                        // check level of room
                        if (roomInfo && score > roomInfo.level) {
                            // out room
                            const newMember = roomInfo.member.filter(id => id !== values.id);
                            const newRoom = {
                                ...roomInfo,
                                member: newMember,
                            }
                            console.log('out room - update room');
                            socket.emit('rooms:update', newRoom);
                            const newValues = {
                                ...values,
                                room: 0,
                            }
                            console.log('new values', newValues);
                            socket.emit('patients:out_room', newValues);
                            //reset form
                            setInitialValues(initialForm);
                            dispatch({
                                type: 'add_patient_selected',
                                payload: '',
                            })
                            resetForm();
                        }
                        else if (roomInfo && score === 0) {
                            console.log('kh???i b???nh');
                            //update rooms
                            const newMember = roomInfo.member.filter(id => id !== values.id)
                            const newRoom = {
                                id: roomInfo.id,
                                member: newMember,
                            }
                            socket.emit('rooms:update', newRoom);
                            // patient finished
                            const newPatient = {
                                ...values,
                                finished: true,
                            }
                            socket.emit('patients:finished', newPatient);

                            // reset profile of doctor 
                            const newPatientsID = profile.patientsID.filter(id => id !== values.id);
                            const doctorUserUpdate = {
                                id: profile.id,
                                patientsID: newPatientsID,
                            };
                            axios({
                                method: 'put',
                                url: `/users/update/${profile.id}`,
                                data: doctorUserUpdate,
                            })
                                .then(res => {
                                    const { message, data } = res.data;
                                    if (data) {
                                        dispatch({
                                            type: 'add_user',
                                            profile: data,
                                        });

                                        // update profile of nurse - get nurse info
                                        const nurseID = values.nurseID
                                        if (nurseID) {
                                            axios({
                                                method: 'get',
                                                url: `/users/id/${nurseID}`
                                            })
                                                .then(res => {
                                                    const { data } = res.data;
                                                    if (data) {
                                                        const newPatientsID = data.patientsID.filter(id => id !== values.id) || [];
                                                        const newData = {
                                                            ...data,
                                                            patientsID: newPatientsID,
                                                        }
                                                        axios({
                                                            method: 'put',
                                                            url: `/users/update/${data.id}`,
                                                            data: newData,
                                                        })
                                                            .then(res => {
                                                                const { message, data } = res.data;
                                                                if (!data) {
                                                                    console.warn(message)
                                                                }
                                                                else {
                                                                    setInitialValues(initialForm);
                                                                    dispatch({
                                                                        type: 'add_patient_selected',
                                                                        payload: '',
                                                                    })
                                                                    resetForm();
                                                                }
                                                            })
                                                            .catch(err => console.log(err))
                                                    }
                                                })
                                                .catch(err => console.log(err))
                                        }
                                    }
                                    else console.warn(message);
                                })
                                .catch(err => console.log(err));
                        }
                        else if (roomInfo && score <= roomInfo.level && score > 0) {
                            console.log('updating normal');
                            const updateAt = moment().format(process.env.REACT_APP_DATE_FORMAT);
                            const valuesUpdate = {
                                ...values,
                                updateAt: updateAt,
                            }
                            socket.emit('patients:normal_update', valuesUpdate);
                            //reset form
                            setInitialValues(initialForm);
                            dispatch({
                                type: 'add_patient_selected',
                                payload: '',
                            })
                            resetForm();
                        }
                    }
                }}
            >
                {({ values, errors, handleBlur, handleChange, setFieldValue }) => (
                    <Form>
                        <div className="row gap-16">
                            <PatientItem
                                moreClass="d-block d-md-none"
                                item={item}
                                level={roomInfo.level}
                                moreStyle={{ flex: 1 }}
                            />
                            <div className="col-12 col-md-7">
                                <div className="mb-2">
                                    <InputIcon
                                        disabled
                                        name="name"
                                        type="text"
                                        placeholder="T??n b???nh nh??n"
                                        icon={faBan}
                                        className="o-70"
                                    />
                                    <ErrorMessage name="name">
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                <div className="mb-2">
                                    <InputIcon
                                        disabled
                                        name="age"
                                        type="number"
                                        placeholder="Tu???i"
                                        icon={faBan}
                                        className="o-70"
                                    />
                                    <ErrorMessage name="age">
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                <div className="mb-2">
                                    <Field
                                        name="disease"
                                        type="text"
                                        placeholder="T??n b???nh"
                                    />
                                    <ErrorMessage name="disease">
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                <div className="mb-2">
                                    <Field
                                        as="select"
                                        name="score"
                                        type="number"
                                    >
                                        <option value={0}>M???c ????? b???nh: 0 (h???t b???nh)</option>
                                        <option value={1}>M???c ????? b???nh: 1</option>
                                        <option value={2}>M???c ????? b???nh: 2</option>
                                        <option value={3}>M???c ????? b???nh: 3</option>
                                        <option value={4}>M???c ????? b???nh: 4</option>
                                        <option value={5}>M???c ????? b???nh: 5</option>
                                        <option value={6}>M???c ????? b???nh: 6</option>
                                    </Field>
                                    <ErrorMessage name="score">
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                <div className="mb-2">
                                    <Field
                                        as="select"
                                        name="medicationTime"
                                        type="number"
                                    >
                                        <option value={''} placeholder="">Th???i gian d??ng thu???c</option>
                                        <option value={1}>Th???i gian d??ng thu???c: 6 ti???ng 1 l???n</option>
                                        <option value={2}>Th???i gian d??ng thu???c: 8 ti???ng 1 l???n</option>
                                        <option value={3}>Th???i gian d??ng thu???c: 12 ti???ng 1 l??n</option>
                                    </Field>
                                    <ErrorMessage name="medicationTime">
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name="recipeName"
                                        value={values.recipeName}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            handleChange(e)
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(e);
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSearch(true);
                                        }}
                                        placeholder="C??ng th???c thu???c"
                                        style={inputStyle}
                                    />

                                    <ErrorMessage name="recipeName" children>
                                        {msg => <p className="fs-12 text-red ml-1">{msg}</p>}
                                    </ErrorMessage>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            height: '3.6rem',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSearch(true);
                                        }}
                                        className="text-black o-50 clickable d-flex justify-content-center align-items-center mr-2"
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </div>

                                    {
                                        showSearch &&
                                        <SearchRecipesContent
                                            setFieldValue={setFieldValue}
                                            setShowSearch={setShowSearch}
                                            search={search}
                                        />
                                    }
                                </div>
                            </div>

                            <PatientItem
                                moreClass="d-none d-md-block"
                                level={roomInfo.level}
                                item={item}
                                moreStyle={{ flex: 1 }}
                            />

                        </div>

                        <hr
                            className="mt-2 mb-2 o-50"
                            style={{ borderTop: '1px solid #000000' }}
                        />

                        <NurseItem item={item} />

                        <div className="d-flex justify-content-start">
                            <Btn title="L??u l???i" type="submit" />
                        </div>

                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const initialForm = {
    name: '',
    age: '',
    disease: '',
    score: '',
    medicationTime: '',
    recipeName: '',
    recipeID: '',
    room: '',
}

const inputStyle = {
    height: '3.6rem',
    borderRadius: '50px',
}

export default PatientCheckForm;
