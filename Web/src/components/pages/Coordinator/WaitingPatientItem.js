
import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

const WaitingPatientItem = ({ id }, key) => {
    const [item, setItem] = useState({});
    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: `/waiting/get-one/${id}`
        })
            .then(res => {
                if (res.data.data) {
                    setItem(res.data.data);
                }
            })
    }, [id])
    return (

        <div className={clsx('row align-items-center bg-gray shadow br-32 mb-3')}
            key={key}
        >
            <div
                style={{
                    width: '6.8rem',
                    height: '6.8rem',
                    backgroundImage: `url(${item.file ? item.file : process.env.REACT_APP_DEFAULT_IMG})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'none',
                    boxShadow: '8px 0 0 rgba(255, 255, 255)',
                }}
                className="br-full mr-3"
                title={item.name}
            >
            </div>
            <div className="">
                {item.name && <p className="fw-600 text-dark">{item.name}</p>}
                {item.score && <p>Tình trạng: {item.score}</p>}
            </div>
        </div>
    );
}

export default WaitingPatientItem;
