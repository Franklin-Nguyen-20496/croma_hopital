
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';
import { PDFViewer } from '@react-pdf/renderer';

import WaitingPatientCard from '../../common/waitingPatientCard';
import actions from '../../../redux/actions';
import PDFPreview from '../../common/PDFPreview';
import AddDiseaseForm from './AddDiseaseForm';

const { setSelectedPatient } = actions;
const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const WaitingPatientCheck = () => {
    const [profile, setProfile] = useState({});
    const finishedId = useSelector(state => state.waitingPatients.finishedId);
    const dispatch = useDispatch();
    const patient = useSelector(state => state.waitingPatients.selectedPatient);

    // get selected patient whenreload
    useEffect(() => {
        axios({
            method: 'get',
            url: '/waiting/get-by-selected'
        })
            .then(res => {
                console.log(res);
                const { data, message } = res.data
                if (data) {
                    dispatch(setSelectedPatient(data))
                }
                else console.warn(message)
            })
            .catch(err => console.log(err))
    }, [dispatch]);

    const handleFinishedProfile = (values) => {
        console.log(values);
        const { disease, score } = values;
        if (disease && score) {
            const newPatient = { ...patient, ...values };
            setProfile(newPatient)
        }
    }

    const handlePatientSubmit = (newValues, { resetForm }) => {
        if (patient._id) {
            const values = { ...patient, ...newValues }
            socket.emit('waiting_patients:finished', values);
            dispatch(setSelectedPatient(values));
            resetForm();
        }
    }

    return (
        <div className="mb-5">
            <p className="fs-20 fw-600 mb-2">Chẩn đoán sơ lượt</p>

            <div className="row gap-16">
                <div className="col-12 col-md-5">
                    <div>
                        <div
                            className="mb-2"
                            style={{ maxWidth: '20rem' }}
                        >
                            <WaitingPatientCard patient={patient} finishedId={finishedId} />
                        </div>
                        <div className="p-2">
                            <AddDiseaseForm
                                handlePatientSubmit={handlePatientSubmit}
                                handleFinishedProfile={handleFinishedProfile}
                            />
                        </div>

                    </div>

                </div>
                <div className="col-12 col-md-7">

                    <div className="videoWrapper">
                        <PDFViewer>
                            <PDFPreview patient={!_.isEmpty(profile) ? profile : patient} />
                        </PDFViewer>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default WaitingPatientCheck;
