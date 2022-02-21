
import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import { checkDuration } from '../../../helper/checkDuration.helper';
import BtnNotify from '../../common/BtnNotify';

const getGender = (number) => {
    switch (number) {
        case 1: return 'Nam';
        case 2: return 'Nữ';
        default: return '...'
    }
}

const checkMedicationTime = (number) => {
    switch (number) {
        case 1: return '6h 1 lần';
        case 2: return '8h 1 lần';
        case 3: return '12h 1 lần'
        default: return '';
    }
}

const PatientOfNurse = (props) => {
    const {
        id,
        setPatientSelected,
        setUpdatePatient,
        update,
    } = props;
    const format = process.env.REACT_APP_DATE_FORMAT;
    const [item, setItem] = useState('');
    const now = moment().format(format);

    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: `/patients/${id}`,
        })
            .then(res => {
                const { message, data } = res.data;
                if (data) {
                    setItem(data);
                    setUpdatePatient('')
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }, [id, update, setUpdatePatient])

    return (

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            {
                item && <div className="position-relative bg-brown br-8 d-flex align-items-center flex-direction-column p-2">
                    <div
                        style={{
                            ...imgStyle,
                            backgroundImage: `url(${item.file ? item.file : process.env.REACT_APP_DEFAULT_IMG})`,
                        }}
                    >
                    </div>
                    <p className=" mt-2">{item.name}</p>
                    <p>{item.disease}</p>
                    {<p>Giới tính: {getGender(item.gender)}</p>}
                    {<p>Tuổi: {item.age > 0 ? item.age : '...'}</p>}
                    {item.score && <p>Tình trạng: {item.score}</p>}
                    {item.medicationTime && <p className="mb-1">Uống thuốc: {checkMedicationTime(item.medicationTime)}</p>}
                    <div style={btnStyle}>
                        <BtnNotify
                            onClick={() => {
                                setPatientSelected(item);
                            }}
                            notify={moment(now, format).diff(moment(item.updateAt, format)) > checkDuration(item.medicationTime)}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

const imgStyle = {
    width: '50%',
    paddingBottom: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    margin: '0 auto',
}

const btnStyle = {
    position: 'absolute',
    top: '8px',
    left: '8px',
}

export default PatientOfNurse;
