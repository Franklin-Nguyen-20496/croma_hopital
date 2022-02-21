
import React, { useState, useEffect, memo } from 'react';
import _ from 'lodash';
import clsx from 'clsx';

import Btn from '../../../common/Btn';

const PatientItem = (props, key) => {
    const {
        item,
        moreClass,
        onClick,
        clickOver,
        showBtn,
        hover,
        title,
        moreStyle,
    } = props;
    const [isItem, setIsItem] = useState(true);

    useEffect(() => {
        if (_.isEmpty(item)) {
            setIsItem(false);
        }
        else setIsItem(true);
    }, [item])

    return (
        <div
            key={key}
            onClick={clickOver}
            className={clsx('col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2_5 col-xxxl-2', moreClass)}
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
                    isItem ?
                        <>
                            <p className="text-center fw-600 mt-2" style={textStyle}>{item.name}</p>
                            <p className="text-center" style={textStyle}>{item.age ? item.age : '...'} tuổi</p>
                            <p className="text-center " style={textStyle}>{item.disease}, mức {item.score}</p>
                            <p className="text-center " style={textStyle}>{item.room ? `Phòng ${item.room} ` : ''}
                                {item.position ? `| tầng ${item.position}` : ''}</p>

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
                {
                    isItem && showBtn && <div
                        style={{
                            position: 'absolute',
                            top: '-0.8rem',
                            right: '-0.8rem',
                        }}
                    >
                        <Btn onClick={onClick} title={title ? title : 'Chuyển'} />
                    </div>
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
