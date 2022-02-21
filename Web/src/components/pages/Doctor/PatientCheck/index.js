
import React from 'react';
import { useOutletContext } from 'react-router-dom';

import PatientCheckForm from './PatientCheckForm';

const PatientCheck = () => {
    const [state, dispatch] = useOutletContext();

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">Điều trị cho bệnh nhân</p>

            <PatientCheckForm
                item={state.patientSelected}
                dispatch={dispatch}
                profile={state.profile}
            />

        </div>
    );
}

export default PatientCheck;
