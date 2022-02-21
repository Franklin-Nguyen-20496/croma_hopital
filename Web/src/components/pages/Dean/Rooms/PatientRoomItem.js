
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import _ from 'lodash';

const PatientRoomItem = ({ id }, key) => {

    const [patient, setPatient] = useState({});

    useEffect(() => {
        axios({
            method: 'get',
            url: `/patients/${id}`
        })
            .then(res => {
                console.log('res in get patient by id', res)
                const { message, data } = res.data
                if (data) {
                    setPatient(data)
                }
                else {
                    console.warn(message)
                }
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <div
            className="col-4 mb-1"
            key={key}
        >
            <div
                style={{
                    backgroundImage: `url('${patient.file ? patient.file : process.env.REACT_APP_DEFAULT_IMG}')`,
                    ...patientStyle
                }}
                className="br-full m-auto"
                title={patient.name ? patient.name : null}
            >
            </div>

            <p className="text-center fs-14">{patient.name ? patient.name : ''}</p>
        </div>
    );
}

const patientStyle = {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    lineClamp: '2',
    WebkitLineClamp: '2',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    width: '70%',
    paddingBottom: '70%',
}

export default PatientRoomItem;
