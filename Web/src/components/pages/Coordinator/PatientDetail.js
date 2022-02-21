import React from 'react';
import { useSelector } from 'react-redux';
// import _ from 'lodash';
import DetailItem from './DetailItem';

const PatientDetail = () => {
    const patient = useSelector(state => state.waitingPatients.selectedPatient);
    const { name, age, score, gender, antecedent, covid19, phone, file } = patient;

    return (
        <div
            className="d-flex"
            style={{
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
            }}
        >
            <div>
                <DetailItem checked={name} title="Tên bệnh nhân" />
                <DetailItem checked={age} title="Tuổi bệnh nhân" />
                <DetailItem checked={score} title="Tình trạng" />
                <DetailItem checked={gender} title="Giới tính" />
            </div>
            <div>
                <DetailItem checked={antecedent} title="Tiền sử" />
                <DetailItem checked={covid19} title="Covid-19" />
                <DetailItem checked={phone} title="Số điện thoại" />
                <DetailItem checked={file} title="Hình ảnh bệnh nhân" />
            </div>

        </div>
    );
}

export default PatientDetail;
