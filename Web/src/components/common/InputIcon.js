import React from 'react';
import { Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const InputIcon = (props) => {
    const {
        icon,
        className,
        ...more
    } = props;
    return (
        <div

            style={{ position: 'relative' }}
            className={className}
        >
            <Field
                {...more}
            />

            <div
                style={{
                    position: 'absolute',
                    top: 'calc(50% + 2px)',
                    right: '0.8rem',
                    transform: 'translateY(-50%)',
                }}
            >
                <FontAwesomeIcon
                    icon={icon ? icon : faEllipsisH}
                    className={className}
                    style={{ fontSize: '22px' }}
                />
            </div>
        </div>
    );
}

export default InputIcon;
