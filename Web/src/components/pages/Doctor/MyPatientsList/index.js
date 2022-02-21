import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import PatientItem from './PatientItem';
import BackDrop from '../../../common/BackDrop';
import Btn from '../../../common/Btn';
import { checkDuration } from '../../../../helper/checkDuration.helper';

const MyPatientsList = () => {
    const [state, dispatch] = useOutletContext();
    const format = process.env.REACT_APP_DATE_FORMAT;
    const { profile } = state;
    console.log('profile', profile);
    const [patientSelected, setPatientSelected] = useState('');
    const [patientsType1, setPatientsType1] = useState([]);
    const [patientsType2, setPatientsType2] = useState([]);
    const normalPatients = useSelector(state => state.patients.normal);
    const unRoomPatients = useSelector(state => state.patients.unRoom);
    const now = moment().format(format);

    useEffect(() => {
        async function handleGetProfile() {
            try {
                if (profile && (normalPatients.length > 0 || unRoomPatients.length > 0)) {
                    console.warn('patients changed, calculating list patient')
                    const allPatients = [...normalPatients, ...unRoomPatients];
                    console.log('allPatients', allPatients);
                    let result = [];
                    console.log('patientsID', profile.patientsID);
                    if (profile.patientsID.length > 0) {
                        await profile.patientsID.forEach(id => {
                            let item = allPatients.find(value => {
                                return value.id === id
                            });
                            console.log('item find', item);
                            result.push(item);
                        })
                    }
                    setPatientsType1(result.filter(patient => patient.recipeID === ''));
                    setPatientsType2(result.filter(patient => patient.recipeID !== ''))
                }
            } catch (error) {
                console.log('error')
            }
        };

        handleGetProfile()
    }, [profile, normalPatients, unRoomPatients])

    return (
        <div className="mb-5">
            <p className="fs-20 fw-600 mb-1">Bệnh nhân cần điều trị</p>
            <div className="row gap-16 mb-2">
                {
                    patientsType1.length > 0 ?
                        patientsType1.map(item => {
                            return <PatientItem
                                item={item}
                                key={item.id}
                                dispatch={dispatch}
                            />
                        })
                        :
                        <div className="col-12">
                            <p className="bg-green p-1">Chưa có bệnh nhân!</p>
                        </div>
                }
            </div>
            <hr
                className="mb-2 o-30"
                style={{ borderTop: '1px solid #000000' }}
            />

            <p className="fs-20 fw-600 mb-1">Bệnh nhân đang điều trị</p>

            <div className="row gap-16 mb-2">
                {
                    patientsType2.length > 0 ?
                        patientsType2.map(item => {
                            return <PatientItem
                                item={item}
                                key={item.id}
                                title="Kiểm tra"
                                dispatch={dispatch}
                                notify
                                now={now}
                                onClick={() => {
                                    setPatientSelected(item);
                                }}
                            />
                        })
                        :
                        <div className="col-12">
                            <p className="bg-green p-1">Chưa có bệnh nhân!</p>
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
                                Bệnh nhân: {patientSelected.name}
                            </p>
                            <p
                                className="text-one-line mb-1"
                            >
                                {'Giờ uống thuốc: '}
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
                                        <p className="bg-red p-1">Đã quá giờ!</p> :
                                        <p className="bg-green p-1">Chưa tới giờ!</p>
                                    }
                                </div>
                            </div>}

                            <div className="d-flex justify-content-end">
                                <Btn
                                    title="Đóng"
                                    bgColor="bg-red"
                                    onClick={() => setPatientSelected('')}
                                />
                            </div>
                        </div>
                    </div>
                }
            </BackDrop>

        </div>
    );
}

export default MyPatientsList;
