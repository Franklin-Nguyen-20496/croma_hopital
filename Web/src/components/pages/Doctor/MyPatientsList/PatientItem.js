
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import Btn from '../../../common/Btn';
import BtnNotify from '../../../common/BtnNotify';
import { checkDuration } from '../../../../helper/checkDuration.helper';


const PatientItem = (props, key) => {
    const {
        item,
        title,
        moreClass,
        clickOver,
        hover,
        moreStyle,
        dispatch,
        notify,
        now,
        onClick,
    } = props;
    const format = process.env.REACT_APP_DATE_FORMAT;
    const navigate = useNavigate();

    return (
        <div
            key={key}
            onClick={clickOver}
            className={clsx('col-12 col-sm-6 col-md-4', moreClass)}
            title={hover}
            style={moreStyle}
        >

            <div
                className="bg-gray shadow br-8 pl-2 pr-2 pt-3 pb-3"
                style={{ position: "relative" }}
            >
                <div
                    style={{
                        backgroundImage: `url(${item.file ? item.file : process.env.REACT_APP_DEFAULT_IMG})`,
                        ...imgStyle
                    }}
                    title={item.name ? item.name : 'Chưa có bệnh nhân'}
                >
                </div>
                {
                    item ?
                        <>
                            <p className="text-center fw-600 mt-2" style={textStyle}>{item.name}</p>
                            <p className="text-center" style={textStyle}>
                                {item.room === 0 ? `Chuyển phòng bệnh` : `Phòng ${item.room}`}
                            </p>
                            <p className="text-center" style={textStyle}>{item.age ? item.age : '...'} tuổi</p>
                            <p className="text-center " style={textStyle}>{item.disease}, mức độ {item.score}</p>
                            {item.recipeName && <p className="text-center " style={textStyle}>Đơn thuốc: {item.recipeName}</p>}
                        </>
                        :
                        <div
                            className="d-flex flex-direction-column justify-content-center align-items-center mt-2"
                        >
                            <div
                                className="mb-1"
                                style={{ width: '70%', ...fakeTextStyle }}
                            ></div>
                            <div
                                className="mb-1"
                                style={{ width: '40%', ...fakeTextStyle }}
                            ></div>
                            <div
                                className="mb-1"
                                style={{ width: '75%', ...fakeTextStyle }}
                            ></div>

                        </div>
                }

                <div
                    style={{
                        position: 'absolute',
                        top: '-0.8rem',
                        right: '-0.8rem',
                    }}
                >
                    <Btn title={title ? title : 'Điều trị'}
                        onClick={() => {
                            dispatch({
                                type: 'add_patient_selected',
                                payload: item,
                            });
                            navigate('/doctor/patient-check');
                        }}
                    />
                </div>

                {
                    notify && <BtnNotify
                        style={{
                            position: 'absolute',
                            top: '0.8rem',
                            left: '0.8rem',
                        }}
                        onClick={onClick}
                        notify={moment(now, format).diff(moment(item.updateAt, format)) > checkDuration(item.medicationTime)}
                    />
                }

            </div>
        </div>
    );
}

const imgStyle = {
    width: '60%',
    paddingBottom: '60%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    borderRadius: '50%',
    margin: '0 auto'
}

const textStyle = {
    lineClamp: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
}

const fakeTextStyle = {
    backgroundColor: '#858585',
    height: '1.5rem'
}

export default memo(PatientItem);
