import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';

import Btn from '../../../common/Btn';

const RecipeItem = ({ item, profile, btnPreviewClick, btnEditClick }, key) => {
    const [auth, setAuth] = useState({
        name: '...'
    });

    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: `/users/id/${item.doctorID}`
        })
            .then(res => {
                const { message, data } = res.data;
                if (data) {
                    setAuth(data)
                }
                else console.warn(message);
            })
            .catch(err => console.log(err));
    }, [item.doctorID])

    return (
        <div
            className="col-12 col-sm-6 col-xl-4"
            key={key}
        >
            <div className="bg-brown br-8 d-flex align-items-center justify-content-space-between p-2">
                <div
                    className="text-one-line"
                >
                    <p className="text-one-line fs-16 text-topic fw-700">{item.name}{item.type === 1 ? ' mức 1-2' : ' mức 3-6'}</p>
                    <p className="text-one-line fs-14">Người tạo: {profile.id === item.doctorID ? 'tôi' : auth.name}</p>
                </div>
                {
                    profile.id === item.doctorID ?
                        <Btn title="Sửa" onClick={btnEditClick} /> :
                        <Btn title="Xem" onClick={btnPreviewClick} />
                }

            </div>
        </div>
    );
}

export default RecipeItem;
