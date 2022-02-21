
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NurseItem = ({ item }) => {
    const [nurse, setNurse] = useState('');

    useEffect(() => {
        if (item) {
            axios({
                method: 'get',
                url: `/users/id/${item.nurseID}`
            })
                .then(res => {
                    const { message, data } = res.data;
                    if (data) {
                        setNurse(data);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err));
        }
    }, [item])

    return (
        <div>
            {
                nurse ?
                    <div
                        className="d-flex align-items-center mb-2"
                    >
                        <div
                            style={{
                                backgroundImage: `url(${nurse.file ? nurse.file : process.env.REACT_APP_DEFAULT_IMG})`,
                                ...imgStyle,
                            }}
                            className="shadow"
                        >
                        </div>
                        <div
                            className="ml-2"
                        >
                            <p className="text-one-line">Công việc phối hợp cùng Y tá {nurse.name}</p>
                            <p className="text-one-line">Bệnh nhân đang chăm sóc: {nurse.patientsID.length}/4</p>
                            <p className="text-one-line">email: {nurse.email} </p>
                        </div>
                    </div>
                    :
                    <div className="d-flex align-items-center mb-2">
                        <div
                            style={{
                                backgroundImage: `url(${process.env.REACT_APP_DEFAULT_IMG})`,
                                ...imgStyle,
                            }}
                            className="shadow"
                        >
                        </div>
                        <p className="text-one-line mb-2 ml-2">Y tá ???</p>
                    </div>

            }

        </div>
    );
}

const imgStyle = {
    width: '80px',
    height: '80px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    borderRadius: '50%',
    // margin: '0 auto'
}

export default NurseItem;
