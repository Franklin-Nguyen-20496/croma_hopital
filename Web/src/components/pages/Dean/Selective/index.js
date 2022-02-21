
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { Container } from '@mui/material';
import PatientItem from './PatientItem';
import DoctorItem from './DoctorItem';
import BackDrop from '../../../common/BackDrop';
import NurseItem from './NurseItem';
import Btn from '../../../common/Btn';
import checkPosition from '../../../../helper/checkPosition.helper';
import actions from '../../../../redux/actions';
const { deleteUnDoctorPatient } = actions;

const Selective = () => {
    const dispatch = useDispatch();
    const [doctors, setDoctors] = useState('');
    const [nurses, setNurses] = useState('');
    const [patientSelected, setPatientSelected] = useState({});
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [doctorSelected, setDoctorSelected] = useState('');
    const [nurseSelected, setNurseSelected] = useState('');
    const [error, setError] = useState('');

    const profile = useSelector(state => state.account.account);
    const patientsUnDoctor = useSelector(state => state.patients.unDoctor);
    // console.log('patients un doctor', patientsUnDoctor);

    useEffect(() => {
        if (profile.role === 2 || profile.role === 1) {
            axios({
                method: 'get',
                url: '/users/doctors'
            })
                .then(res => {
                    const { message, data } = res.data;
                    console.log('doctors', data);
                    if (data) {
                        const newData = data.filter(doctor => doctor.position === profile.position);
                        setDoctors(newData);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err));

            axios({
                method: 'get',
                url: '/users/nurses'
            })
                .then(res => {
                    const { message, data } = res.data;
                    console.log('nurses', data);
                    if (data) {
                        setNurses(data);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err));
        }
    }, [profile])

    const handleCancel = () => {
        setDoctorSelected('');
        setNurseSelected('');
        setPatientSelected({});
        setShowBackdrop(false);
    }

    const handleSubmit = async () => {
        try {
            console.log(doctorSelected, nurseSelected);
            if (_.isEmpty(doctorSelected) || _.isEmpty(nurseSelected)) {
                setError('Bạn chưa chọn bác sĩ/y tá cho bệnh nhân');
                return;
            }

            if (doctorSelected.patientsID.length >= 3) {
                setError('Bác sĩ này đã đủ bệnh nhân chăm sóc');
                return;
            }

            if (nurseSelected.patientsID.length >= 4) {
                setError('Y tá này đã đủ bệnh nhân chăm sóc');
                return;
            }

            if (
                !_.isEmpty(doctorSelected) &&
                !_.isEmpty(nurseSelected) &&
                !_.isEmpty(patientSelected)
            ) {
                const newPatient = {
                    ...patientSelected,
                    doctorID: doctorSelected.id,
                    nurseID: nurseSelected.id,
                }
                const newPatientsIDofNurse = [...nurseSelected.patientsID];
                newPatientsIDofNurse.push(patientSelected.id)
                console.log('newPatientIDofNurse', newPatientsIDofNurse);
                const newNurseSelected = {
                    ...nurseSelected,
                    patientsID: newPatientsIDofNurse
                }

                const newPatientsIDofDoctor = [...doctorSelected.patientsID];
                newPatientsIDofDoctor.push(patientSelected.id)
                console.log('newPatientsIDofDoctor', newPatientsIDofDoctor);
                const newDoctorSelected = {
                    ...doctorSelected,
                    patientsID: newPatientsIDofDoctor,
                }

                //patient
                await axios({
                    method: 'put',
                    url: `/patients/update/${newPatient.id}`,
                    data: newPatient,
                })
                    .then(res => {
                        console.log('res patient ', res)
                        const { message, data } = res.data;
                        if (data) {
                            console.log('data', data);
                            dispatch(deleteUnDoctorPatient(data.id));
                        }
                        else console.warn(message);
                    })

                //nurse
                await axios({
                    method: 'put',
                    url: `/users/update/${newNurseSelected.id}`,
                    data: newNurseSelected,
                })
                    .then(res => {
                        console.log('res nurse ', res)
                        const { message } = res.data;
                        if (message === 'updated user') {
                            const newListNurse = [...nurses].map(user => {
                                if (user.id === newNurseSelected.id) {
                                    return newNurseSelected
                                }
                                else return user;
                            });
                            setNurses(newListNurse);
                        }
                        else console.warn(message);
                    })
                    .catch(err => console.log(err))

                //doctor
                await axios({
                    method: 'put',
                    url: `/users/update/${doctorSelected.id}`,
                    data: newDoctorSelected,
                })
                    .then(res => {
                        console.log('res doctor ', res)
                        const { message } = res.data;
                        if (message === 'updated user') {
                            const newListDoctor = [...doctors].map(user => {
                                if (user.id === newDoctorSelected.id) {
                                    return newDoctorSelected
                                }
                                else return user;
                            });
                            setDoctors(newListDoctor);
                        }
                        else console.warn(message);
                    })
                    .catch(err => console.log(err))

                setPatientSelected({});
                setShowBackdrop(false);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div
            onClick={() => {
                setDoctorSelected('');
                setNurseSelected('');
            }}
        >
            <p className="fs-20 fw-600 mb-2">Chọn bác sĩ chăm sóc bệnh nhân</p>
            <p className="fs-20 fw-600 mb-1">Danh sách bệnh nhân</p>
            <div className="row gap-16 mb-2">
                {
                    patientsUnDoctor.length > 0 ?
                        patientsUnDoctor.map(patient => {
                            return <PatientItem
                                hover="Chọn bác sĩ"
                                key={patient.id} item={patient}
                                clickOver={() => {
                                    setPatientSelected(patient);
                                    setShowBackdrop(true)
                                }}
                                showBtn={true}
                                moreClass="clickable"
                                title="Chọn"
                            />
                        })
                        :
                        <div className="col-12">
                            <p className="bg-green text-white p-1">Chưa có bệnh nhân.</p>
                        </div>

                }
            </div>

            <p className="fs-18 fw-600 mb-1">Danh sách bác sĩ {checkPosition(profile.position)} </p>
            <div className="row gap-10 mb-2"
            >
                {
                    doctors && doctors.map(doctor => {
                        return <DoctorItem
                            key={doctor.id}
                            item={doctor}
                            onClick={(e) => {
                                e.stopPropagation()
                                setDoctorSelected(doctor)
                            }}
                            selected={doctorSelected.id === doctor.id}
                        />
                    })
                }
            </div>

            <p className="fs-18 fw-600 mb-1">Danh sách y tá</p>
            <div className="row gap-10 mb-2">
                {
                    nurses && nurses.map(item => {
                        return <NurseItem
                            key={item.id}
                            item={item}
                            onClick={(e) => {
                                e.stopPropagation();
                                setNurseSelected(item)
                            }}
                            selected={nurseSelected.id === item.id}
                        />
                    })
                }
            </div>

            <BackDrop
                show={showBackdrop}
                setShow={setShowBackdrop}
                moreStyle={{
                    backgroundColor: 'white',
                    width: '95vw',
                    height: 'calc(100vh - 8rem)',
                    bottom: '47%',
                }}
                onScroll={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}

                onClick={() => {
                    setDoctorSelected('');
                    setNurseSelected('');
                }}
            >
                <Container maxWidth="lg">
                    <div
                        style={{ height: 'calc(100vh - 10rem)' }}
                    >
                        <div className="pt-2">
                            <div className="d-flex justify-content-end">
                                <Btn title="Quay lại" bgColor="bg-red" onClick={handleCancel} />
                            </div>
                            <p className="fs-18 fw-600 mb-1">Chọn bác sĩ</p>
                            <div className="row gap-16">

                                <div className="row gap-10"
                                    style={{ flex: '1' }}
                                >
                                    {
                                        doctors && doctors.map(doctor => {
                                            return <DoctorItem
                                                key={doctor.id}
                                                item={doctor}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDoctorSelected(doctor)
                                                }}
                                                selected={doctorSelected.id === doctor.id}
                                            />
                                        })
                                    }
                                </div>
                                <PatientItem item={patientSelected} moreStyle={{ width: '20rem' }} />
                            </div>

                        </div>
                        <hr className="mb-1" />
                        <p className="fs-18 fw-600 mb-1">Chọn y tá</p>
                        <div className="row gap-10">
                            {
                                nurses && nurses.map(item => {
                                    return <NurseItem
                                        key={item.id}
                                        item={item}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setNurseSelected(item)
                                        }}
                                        selected={nurseSelected.id === item.id}
                                    />
                                })
                            }
                        </div>
                        <hr className="mt-1 mb-1" />
                        <p className="text-red text-end">{error}</p>
                        <div className="d-flex justify-content-end mr-3 mt-2 pb-4">
                            <Btn title="Đã chọn xong" moreClass="mr-2" onClick={(e => {
                                e.stopPropagation();
                                handleSubmit();
                            })} />
                            <Btn title="Hủy" bgColor="bg-red" onClick={handleCancel} />
                        </div>

                    </div>
                </Container>

            </BackDrop>
        </div >
    );
}

export default Selective;
