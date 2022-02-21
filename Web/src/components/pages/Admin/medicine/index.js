
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Btn from '../../../common/Btn';
import List from './List';
import MedicineForm from './MedicineForm';

const Medicine = () => {
    const [showForm, setShowForm] = useState(false);
    const [medicines, setMedicines] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: '/medicines',
        })
            .then(res => {
                const { data, message } = res.data
                if (data && data.length > 0) {
                    setMedicines(data);
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <p className="fs-20 fw-700 mb-2">Thuốc men</p>

            <List
                items={medicines}
                setMedicines={setMedicines}
            />

            <MedicineForm
                showForm={showForm}
                setShowForm={setShowForm}
                setMedicines={setMedicines}
            />

            <Btn
                title="Thêm thuốc"
                onClick={() => setShowForm(true)}
                moreClass={showForm ? 'd-none' : 'mt-1'}
            />
        </div>
    );
}

export default Medicine;
