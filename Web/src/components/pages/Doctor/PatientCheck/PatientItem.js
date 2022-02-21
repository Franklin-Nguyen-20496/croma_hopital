
import React, { memo } from 'react';
import clsx from 'clsx';

const PatientItem = (props, key) => {
    const {
        item,
        moreClass,
        clickOver,
        hover,
        moreStyle,
        level
    } = props;

    return (
        <div
            key={key}
            onClick={clickOver}
            className={clsx('col-12 col-sm-5 col-md-4 col-xl-3', moreClass)}
            title={hover}
            style={moreStyle}
        >

            <div
                className="bg-gray shadow br-8 pl-2 pr-2 pt-3 pb-3"
                style={{ position: "relative", maxWidth: '280px' }}
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
                            {<p className="text-center" style={textStyle}>
                                {item.room ?
                                    `Phòng ${item.room}` :
                                    'Chưa có phòng'} {level ? `- level ${level}` : null}
                            </p>}
                            <p className="text-center" style={textStyle}>{item.age > 0 ? item.age : '...'} tuổi</p>
                            <p className="text-center " style={textStyle}>{item.disease}</p>
                            <p className="text-center " style={textStyle}> Mức độ bệnh {item.score}</p>
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
