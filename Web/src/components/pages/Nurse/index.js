
import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import PatientOfNurse from './PatientOfNurse';
import BackDrop from '../../common/BackDrop';
import { checkDuration } from '../../../helper/checkDuration.helper';
import Btn from '../../common/Btn';
import { role } from '../../../helper/user.role.helper';

const Nurse = () => {
    const format = process.env.REACT_APP_DATE_FORMAT;
    const navigate = useNavigate();
    const profile = useSelector(state => state.account.account);
    const [nurse, setNurse] = useState('');
    const [patientSelected, setPatientSelected] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [updatePatient, setUpdatePatient] = useState('')
    const now = moment().format(format);

    //check role
    useLayoutEffect(() => {
        if (!profile && (profile.role !== role.NURSE && profile.role !== role.ADMIN)) {
            navigate('/')
        }
    })

    useLayoutEffect(() => {
        if (profile && profile.id) {
            axios({
                method: 'get',
                url: `/users/id/${profile.id}`
            })
                .then(res => {
                    const { message, data } = res.data;
                    if (data) {
                        setNurse(data)
                        // console.log(data);
                        console.log('patients', data.patientsID.length)
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err))
        }
    }, [profile]);

    const handleUpdatePatient = () => {
        if (patientSelected.id) {
            const updateAt = moment().format(format)
            const newValues = {
                id: patientSelected.id,
                updateAt: updateAt,
            }

            axios({
                method: 'put',
                url: `/patients/update/${newValues.id}`,
                data: newValues,
            })
                .then(res => {
                    const { message, data } = res.data;
                    if (data) {
                        setUpdatePatient(data.id);
                        setShowConfirm(false);
                        setPatientSelected('');
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <p
                className="fs-20 fw-600 mb-2"
            >
                Danh s??ch b???nh nh??n c???n ch??m s??c
            </p>
            <div className="row gap-10 gap-md-16">
                {
                    nurse && nurse.patientsID.length > 0 ?
                        nurse.patientsID.map(id => {
                            return <PatientOfNurse
                                key={id}
                                id={id}
                                setPatientSelected={setPatientSelected}
                                setUpdatePatient={setUpdatePatient}
                                update={updatePatient === id}
                            />
                        })
                        :
                        <div className="col-12">
                            <p className="bg-green text-white p-1">Ch??a c?? b???nh nh??n n??o!</p>
                        </div>
                }
            </div>

            <BackDrop
                show={patientSelected}
                onClick={() => setPatientSelected('')}
            >
                {
                    patientSelected &&
                    <div
                        className="text-center bg-white animation-opacity big-shadow p-2"
                        style={{ maxWidth: '36rem', width: '98vw' }}
                    >
                        <div className="p-1">

                            <p
                                className="fs-16 fw-600 mb-2 text-one-line"
                            >
                                B???nh nh??n: {patientSelected.name}
                            </p>
                            <p
                                className="text-one-line mb-1"
                            >
                                {'Gi??? u???ng thu???c: '}
                                <span className="text-topic">
                                    {
                                        moment(patientSelected.updateAt, format)
                                            .add(Number(checkDuration(patientSelected.medicationTime)), 'milliseconds')
                                            .format('hh:mm a DD/MM/YY')
                                    }
                                </span>
                            </p>
                            {<div className="mb-2">
                                <div className="text-white">
                                    {moment(now, format).diff(moment(patientSelected.updateAt, format)) >
                                        checkDuration(patientSelected.medicationTime) ?
                                        <p className="bg-red p-1">???? qu?? gi???!</p> :
                                        <p className="bg-green p-1">Ch??a t???i gi???!</p>
                                    }
                                </div>
                            </div>}

                            <div className="d-flex justify-content-end">
                                {
                                    moment(now, format).diff(moment(patientSelected.updateAt, format)) >
                                    checkDuration(patientSelected.medicationTime) &&
                                    <Btn
                                        title="???? u???ng thu???c"
                                        moreClass="mr-1"
                                        onClick={() => setShowConfirm(true)}
                                    />
                                }
                                <Btn
                                    title="????ng"
                                    bgColor="bg-red"
                                    onClick={() => setPatientSelected('')}
                                />
                            </div>
                        </div>
                    </div>
                }
            </BackDrop>

            <BackDrop
                show={showConfirm}
                onClick={() => setShowConfirm(false)}
            >
                <div
                    className="text-center bg-white animation-opacity big-shadow p-2"
                    style={{ maxWidth: '32rem', width: '98vw' }}
                >
                    <p
                        className="fs-16 fw-600 mb-2 text-two-line"
                    >
                        B???n c?? ch???n ch???n ???? cho b???nh nh??n
                        <span className="text-topic">
                            {patientSelected && patientSelected.name ? ` ${patientSelected.name} ` : null}
                        </span>
                        u???ng thu???c!
                    </p>
                    <p className="mb-2">H??nh ?????ng n??y kh??ng th??? ho??n t??c</p>

                    <div className="d-flex justify-content-end">
                        <Btn
                            title="X??c nh???n"
                            moreClass="mr-1"
                            onClick={() => handleUpdatePatient()}
                        />
                        <Btn
                            title="H???y"
                            bgColor="bg-red"
                            onClick={() => {
                                setShowConfirm(false)
                            }}
                        />
                    </div>
                </div>
            </BackDrop>

        </div>
    );
}

export default Nurse;
