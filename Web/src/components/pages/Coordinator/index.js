
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import actions from '../../../redux/actions';
import WaitingPatientCard from '../../common/waitingPatientCard';
import WaitingPatientList from './WaitingPatientList';
import Btn from '../../common/Btn';
import PatientDetail from './PatientDetail';
import PDFPreview from '../../common/PDFPreview';
import { PDFViewer } from '@react-pdf/renderer';
import { role } from '../../../helper/user.role.helper';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const { setAllWaitingPatients, setSelectedPatient } = actions;

const Coordinator = () => {
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);
    const navigate = useNavigate();
    const profile = useSelector(state => state.account.account);
    const list = useSelector(state => state.waitingPatients.list);
    const patient = useSelector(state => state.waitingPatients.selectedPatient);
    console.log('waitingpatient selected', patient);
    const finishedId = useSelector(state => state.waitingPatients.finishedId);

    //check role
    useLayoutEffect(() => {
        if (profile && (profile.role !== role.COORDINATOR && profile.role !== role.ADMIN)) {
            navigate('/')
        }
    })

    // get array id data patients when reload 
    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: '/waiting'
        })
            .then(res => {
                console.log('get_all_waiting_patients', res);
                const { message, data } = res.data;
                if (data) {
                    dispatch(setAllWaitingPatients(data))
                }
                else console.warn(message)
            })
            .catch(err => console.log(err))
    }, [dispatch])

    // get selected item when reload
    useEffect(() => {
        axios({
            method: 'get',
            url: '/waiting/get-by-selected'
        })
            .then(res => {
                console.log('res when get by api selected', res);
                const { message, data } = res.data;
                if (data) {
                    dispatch(setSelectedPatient(data));
                    setStart(true)
                }
                else {
                    setStart(false)
                    console.warn(message)
                }
            })
            .catch(err => console.log(err))
    }, [dispatch])

    // start job and select id selected
    const handleStartJob = async () => {
        try {
            if (list.length > 0) {
                const id = list[0];
                socket.emit('waiting_patients:selected', id);
                setStart(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNextPatient = async () => {
        try {
            if (finishedId === patient._id) {
                handleStartJob()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-5">
            <h1 className="fs-20 fw-600 text-dark">Điều phối</h1>

            <div className="row gap-16 mt-2 mb-2">
                <div className="col-12 col-sm-5 text-center"
                >
                    <p className="fs-18 fw-600 text-white mb-2 d-none d-sm-block">Bệnh nhân</p>
                    <div className="d-flex flex-direction-column align-items-center text-center justify-content-center mb-3"
                        style={{ position: 'relative' }}
                    >
                        {!start && <Btn title="Bắt đầu ca làm việc" onClick={handleStartJob} />}
                        {start && <WaitingPatientCard patient={patient} finishedId={finishedId === patient._id} />}
                    </div>
                    {list.length > 0 && !_.isEmpty(patient) && <Btn
                        title="Next"
                        fontSize="fs-14"
                        disabled={true}
                        onClick={handleNextPatient}
                    />}
                </div>
                <div className="col-12 col-sm-7">
                    <WaitingPatientList />
                </div>
            </div>

            <hr className="mt-2 mb-2" />

            <p className=" fs-18 fw-600 text-dark text-center mb-3">Template gửi cho bác sĩ</p>

            <div className="row">

                <div className="col-12 col-sm-7 col-md-8">
                    <PatientDetail />
                </div>

                <div
                    className="col-12 col-sm-5 col-md-4"
                >
                    <div className="videoWrapper">
                        <PDFViewer>
                            <PDFPreview patient={patient} />
                        </PDFViewer>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Coordinator;
