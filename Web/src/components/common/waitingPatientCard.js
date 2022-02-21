
import React, { } from 'react';
import _ from 'lodash';

import Btn from '../common/Btn';

const getGender = (number) => {
    switch (number) {
        case 1:
            return 'Nam'
        case 2:
            return 'Nữ'
        case 3:
            return 'LGBT'
        default:
            break;
    }
}

const WaitingPatientCard = ({ onClick, patient, finishedId }) => {

    return (
        <div
            style={{ position: 'relative' }}
        >
            {
                !_.isEmpty(patient) && (
                    <div
                        className="
                    bg-gray text-center animation-scale br-16 shadow pt-2 pb-2 pl-3 pr-3 m-auto
                    d-flex flex-direction-column justify-content-center
                    "
                        style={{ minHeight: '26.8rem' }}
                    >
                        <div
                            style={{
                                width: '10rem',
                                height: '10rem',
                                backgroundImage: `url(${patient.file ? patient.file : process.env.REACT_APP_DEFAULT_IMG})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'none',
                                borderRadius: '50%',
                                margin: '0 auto'
                            }}
                            title={patient.name}
                        >
                        </div>
                        <h3 className="fs-600 mt-2">{patient.name}</h3>
                        {patient.gender && <p>{getGender(patient.gender)}</p>}
                        {<p>Tuổi: {patient.age > 0 ? patient.age : '...'}</p>}
                        {patient.score && <p className="mb-1">Tình trạng: {patient.score}</p>}

                    </div>

                )
            }

            {
                !_.isEmpty(patient) &&
                <div
                    style={{ position: 'absolute', top: '-1.6rem', left: '-1.6rem' }}
                >
                    <Btn
                        noShadow={true} fontSize="fs-10"
                        title={finishedId ? 'Chẩn đoán xong' : 'Đang chẩn đoán'}
                        bgColor={finishedId ? 'bg-green' : 'bg-red'}
                        loop={true}
                        noHover={true}
                    />

                </div>
            }

            {_.isEmpty(patient) &&
                <div>
                    <p
                        className="bg-green text-center p-1"
                        style={{ width: '100%', }}
                    >
                        Chưa có bệnh nhân nào!
                    </p>
                </div>
            }

        </div >
    );
}

export default WaitingPatientCard;
