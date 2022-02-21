
import React from 'react';
import PatientItem from '../../../common/PatientItem';

const FakePatientItems = () => {
    return (
        <>
            <PatientItem item={{}} key={1} />
            <PatientItem moreClass="d-none d-sm-block" item={{}} key={2} />
            <PatientItem moreClass="d-none d-md-block" item={{}} key={3} />
            <PatientItem moreClass="d-none d-lg-block" item={{}} key={4} />
            <PatientItem moreClass="d-none d-xxl-block" item={{}} key={5} />
            <PatientItem moreClass="d-none d-xxxl-block" item={{}} key={6} />
        </>
    );
}

export default FakePatientItems;
