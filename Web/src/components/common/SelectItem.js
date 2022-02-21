import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const SelectItem = (props) => {
    const {
        icon,
        title,
        onClick,
        borderRadius,
        moreClass,
        selected,
    } = props;

    return (
        <div
            className={
                clsx('btn-hover-dark fw-500 pr-2 pl-2',
                    selected ? 'text-black' : 'text-white',
                    borderRadius ? `br-${borderRadius}` : '',
                    moreClass,
                )
            }
            title={title}
            style={styles}
            onClick={onClick}
        >
            {icon &&
                <div
                    style={{
                        height: '40px',
                        width: '24px',
                    }}
                    className="d-flex align-items-center justify-content-center mr-1 fs-18"
                >
                    <FontAwesomeIcon icon={icon ? icon : faEllipsisH} />
                </div>
            }
            <p
                style={stylesIcon}
            >
                {title}
            </p>

        </div>
    );
}

const styles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    height: '4rem',
    width: '100%',
    transition: 'all 0.3s ease-out',
    cursor: 'pointer'
}

const stylesIcon = {
    flex: '1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineBreak: '1',
}

export default memo(SelectItem);
