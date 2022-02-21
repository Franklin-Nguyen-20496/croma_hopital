import React from 'react';
import clsx from 'clsx';

const DoctorItem = (props, key) => {
    const { item, selected, onClick } = props;

    return (
        <div
            key={key}
            className="col-6 col-sm-4 col-md-3 col-lg-2_5 col-xl-2 transition"
            onClick={onClick}
        >
            <div
                className={clsx('br-8 clickable pt-1', selected ? 'bg-topic' : 'bg-brown')}
            >
                <div
                    className="shadow"
                    style={{
                        backgroundImage: `url(${item.file ? item.file : process.env.REACT_APP_DEFAULT_IMG})`,
                        ...imgStyle
                    }}>
                </div>
                <div
                    className={clsx('text-center mt-1', selected ? 'text-white' : '')}
                >
                    <p
                        style={textStyle}
                    >{item.name}
                    </p>
                    <p style={textStyle}>
                        BN: {item.patientsID.length}/3
                    </p>
                </div>

            </div>
        </div>
    );
}

const imgStyle = {
    width: '50%',
    paddingBottom: '50%',
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
    height: '2.25rem'
}
export default DoctorItem;
