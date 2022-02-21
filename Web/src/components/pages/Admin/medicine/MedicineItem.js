import React from 'react';

import MenuIcon from './MenuIcon';
import Menu from './Menu';

const MedicineItem = (props, key) => {
    const {
        item,
        onClick,
        showMenu,
        handlePlus,
        handleMinus,
        handleDelete,
    } = props;
    return (
        <div
            key={key}
            className="col-12 col-sm-6 col-lg-4"
            style={{
                position: 'relative',
            }}
        >
            <div className="br-50 d-flex align-items-center justify-content-space-between pl-2 pr-1"
                style={{
                    ...itemStyle,
                    border: item.total === 0 ? '1px solid #d32752' : '1px solid #4FC5BE',
                }}
            >
                <p
                    style={{
                        whiteSpace: 'nowrap',
                        lineClamp: '1',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}
                >
                    {item.name} | {item.total} | {item.unit}
                </p>
                <MenuIcon onClick={onClick} />
            </div>

            <Menu
                showMenu={showMenu}
                handlePlus={handlePlus}
                handleMinus={handleMinus}
                handleDelete={handleDelete}
            />
        </div>
    );
}

const itemStyle = {
    height: '4.4rem',
}

export default MedicineItem;
