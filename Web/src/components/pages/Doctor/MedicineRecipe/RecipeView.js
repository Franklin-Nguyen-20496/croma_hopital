
import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';

import BackDrop from '../../../common/BackDrop';
import Btn from '../../../common/Btn';

const RecipeView = ({ state, dispatch }) => {
    const [doctor, setDoctor] = useState('')

    useEffect(() => {
        const id = state.selected.doctorID;
        if (id) {
            axios({
                method: 'get',
                url: `/users/id/${id}`
            })
                .then(res => {
                    const { message, data } = res.data;
                    if (data) {
                        console.log('doctor user', data);
                        setDoctor(data);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err));
        }
    }, [state.selected.doctorID])

    return (
        <div>
            <BackDrop
                show={state.showPreview}
                onClick={() => {
                    dispatch({ type: 'reset' })
                }}
            >
                <div
                    className="bg-white big-shadow animation-scale"
                    style={{ lineHeight: 1.7 }}
                >
                    {
                        state.selected && state.showPreview &&
                        <div className="p-2">
                            <p className="text-start text-topic fs-18 fw-600 mb-1">Tên công thức: {state.selected.name}</p>
                            {
                                doctor && <div className="d-flex justify-content-start align-items-center">
                                    <div
                                        style={{
                                            backgroundImage: `url(${doctor.file ? doctor.file : process.env.REACT_APP_DEFAULT_IMG})`,
                                            ...imgStyle,
                                        }}
                                    ></div>
                                    <p className="ml-1">{doctor.name}</p>

                                </div>
                            }
                            <p className="text-start">Mức độ bệnh: {state.selected.type === 1 ? '1-2' : '3-6'}</p>
                            <p className="text-start">Thành phần:</p>
                            <div className="bg-brown text-start">
                                {
                                    state.selected.components.map(item => {
                                        return <div
                                            key={item.medicineID}
                                            className="row"
                                        >
                                            <div className="col-7"
                                                style={{
                                                    borderBottom: '1px solid white',
                                                    borderRight: '1px solid white',
                                                }}
                                            >
                                                <p className="pl-1">{item.medicineName}</p>
                                            </div>
                                            <div className="col-5"
                                                style={{ borderBottom: '1px solid white' }}

                                            >
                                                <p className="pl-1">{item.total} {item.unit}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <Btn
                                    title="Đóng"
                                    bgColor="bg-red"
                                    onClick={() => dispatch({ type: 'reset' })}
                                />
                            </div>
                        </div>
                    }
                </div>
            </BackDrop>
        </div>
    );
}

const imgStyle = {
    width: '4rem',
    height: '4rem',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    borderRadius: '50%',
    // margin: '0 auto'
}

export default memo(RecipeView);
