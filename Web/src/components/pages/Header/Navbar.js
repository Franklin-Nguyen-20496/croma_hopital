
import React from 'react';
import { Link } from 'react-router-dom';
import {
    faUserCircle,
    faIdCard,
    faSignInAlt,
    faSignOutAlt,
    faListOl,
    faListUl,
    faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import SelectItem from '../../common/SelectItem';
import * as styles from './Header.module.scss';
import { checkProfile } from '../../../helper/navigate.helper';

const Navbar = (props) => {
    const { display, selectedItem, handleSignOut } = props;

    const profile = useSelector(state => state.account.account);
    const pathname = window.location.pathname;

    return (

        <div
            className={clsx('btn-topic', styles.headerNavbar)}
            style={{
                width: '20rem',
                transform: display ? 'translateX(-100%)' : 'translateX(0%)',
            }}
        >
            {/* admin */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 1 ? 'd-block' : 'd-none')}
            >
                <Link to="dean/rooms">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Phòng bệnh"
                        selected={pathname === '/dean/rooms'}
                    />
                </Link>

                <Link to="admin/schema">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faIdCard}
                        title="Sơ Đồ Tổ Chức"
                        selected={
                            pathname === '/admin/schema/1' ||
                            pathname === '/admin/schema/2' ||
                            pathname === '/admin/schema/3'
                        }
                    />
                </Link>

                <Link to="admin/medicine">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListOl}
                        title="Kho thuốc"
                        selected={pathname === '/admin/medicine'}
                    />
                </Link>

                <Link to="admin/register">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faUserCircle}
                        title="Tạo Tài Khoản"
                        selected={pathname === '/admin/register'}
                    />
                </Link>
            </div>

            {/* dean */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 2 ? 'd-block' : 'd-none')}
            >
                <Link to="dean/rooms">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Phòng bệnh"
                        selected={pathname === '/dean/rooms'}
                    />
                </Link>

                <Link to="dean/patient-transfer">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faClipboardCheck}
                        title="Chọn phòng cho bệnh nhân"
                        selected={pathname === '/dean/patient-transfer'}
                    />
                </Link>

                <Link to="/dean/selective">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faUserCircle}
                        title="Chọn bác sĩ/y tá"
                        selected={pathname === '/dean/selective'}
                    />
                </Link>
            </div>

            {/* doctor */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 3 ? 'd-block' : 'd-none')}
            >
                <Link to="doctor/my-patients">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Bệnh nhân"
                        selected={pathname === '/doctor/my-patients'}
                    />
                </Link>

                <Link to="/doctor/patient-check">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faUserCircle}
                        title="Khám | điều trị"
                        selected={pathname === '/doctor/patient-check'}
                    />
                </Link>

                <Link to="doctor/recipes">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faClipboardCheck}
                        title="Công thức thuốc"
                        selected={pathname === '/doctor/recipes'}
                    />
                </Link>

                <Link to="doctor/waiting-patient">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faClipboardCheck}
                        title="Khám bệnh"
                        selected={pathname === '/doctor/waiting-patient'}
                    />
                </Link>

            </div>

            {/* nurse */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 4 ? 'd-block' : 'd-none')}
            >
                <Link to="nurse">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Danh sách bệnh nhân"
                        selected={pathname === '/nurse'}
                    />
                </Link>
            </div>

            {/* coordinator */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 5 ? 'd-block' : 'd-none')}
            >
                <Link to="coordinator">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Khám bệnh"
                        selected={pathname === '/coordinator'}
                    />
                </Link>

            </div>

            {/* patients */}
            <div
                className={clsx('pt-1 pb-1', styles.headerNavbarContainer,
                    checkProfile(profile) === 6 ? 'd-block' : 'd-none')}
            >
                <Link to="patient/register">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faListUl}
                        title="Khám bệnh"
                        selected={pathname === '/patient/register'}
                    />
                </Link>

                <Link to="patient/info">
                    <SelectItem
                        onClick={selectedItem}
                        icon={faIdCard}
                        title="Tra cứu thông tin"
                        selected={pathname === '/patient/register'}
                    />
                </Link>

            </div>

            <div className={clsx('pt-1 pb-1', styles.headerNavbarContainer)}>
                <Link to="login" className={profile ? 'd-none' : 'd-block'}>
                    <SelectItem
                        onClick={selectedItem}
                        icon={faSignInAlt}
                        title="Đăng nhập"
                        selected={pathname === '/login'}
                    />
                </Link>

                <div
                    onClick={handleSignOut}
                    style={{ cursor: 'pointer' }}
                    className={profile ? 'd-block' : 'd-none'}
                >
                    <SelectItem
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
