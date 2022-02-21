import React from 'react';
import clsx from 'clsx';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import SelectItem from '../../../common/SelectItem';

const Menu = (props) => {
    const {
        showMenu,
        handlePlus,
        handleMinus,
        handleDelete,
    } = props;

    return (
        <div
            className={clsx('bg-topic animation-opacity br-8 pt-1 pb-1', showMenu ? 'd-block' : 'd-none')}
            style={{
                position: 'absolute',
                right: '16px',
                top: '44px',
                zIndex: 100,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <SelectItem
                title="Thêm số lượng"
                icon={faPlus}
                onClick={handlePlus}
            />
            <SelectItem
                title="Bớt số lượng"
                icon={faMinus}
                onClick={handleMinus}
            />
            <SelectItem
                title="Xóa"
                icon={faTrashAlt}
                onClick={handleDelete}
            />
        </div>
    )
}

export default Menu;
