
import React from 'react';
import { Link } from 'react-router-dom';
import {
    faUserCircle, faIdCard, faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import SelectItem from '../../common/SelectItem';
import * as styles from './Header.module.scss';

const Navbar = (props) => {

    const { display, selectedItem, selected, handleSignOut } = props;

    return (

        <div
            className={clsx('btn-topic', styles.headerNavbar)}
            style={{
                width: '20rem',
                transform: display ? 'translateX(-100%)' : 'translateX(0%)',
            }}
        >
            <div className={clsx('pt-1 pb-1', styles.headerNavbarContainer)}>
                <Link to="admin/schema">
                    <SelectItem selected={selected}
                        onClick={selectedItem}
                        icon={faIdCard}
                        title="Sơ Đồ Tổ Chức" />
                </Link>

                <Link to="admin/register">
                    <SelectItem selected={selected}
                        onClick={selectedItem}
                        icon={faUserCircle}
                        title="Tạo Tài Khoản"
                    />
                </Link>
            </div>

            <div className={clsx('pt-1 pb-1', styles.headerNavbarContainer)}>
                <Link to="login">
                    <SelectItem
                        selected={selected}
                        onClick={selectedItem}
                        icon={faSignInAlt}
                        title="Đăng nhập"
                    />
                </Link>

                <div
                    onClick={handleSignOut}
                    style={{ cursor: 'pointer' }}
                >
                    <SelectItem
                        selected={selected}
                        onClick={selectedItem}
                        icon={faSignOutAlt}
                        title="Đăng xuất"
                    />
                </div>

            </div>
        </div>
    );
}

export default Navbar;
