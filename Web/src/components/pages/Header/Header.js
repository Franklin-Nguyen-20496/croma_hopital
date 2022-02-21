
import React, { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';
import _ from 'lodash';

import styles from './Header.module.scss';
import Navbar from './Navbar';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import checkPosition from '../../../helper/checkPosition.helper';
import userRoleHelper from '../../../helper/user.role.helper';
import actions from '../../../redux/actions';
import { checkNavigation } from '../../../helper/navigate.helper';
const { clearAccount, resetUsers, notifyInfo, hideNotify } = actions;

const Header = () => {
    console.log('header rerender');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.account.account);
    const defaultImg = process.env.REACT_APP_DEFAULT_IMG;

    const [showNav, setShowNav] = useState(false);
    const account = useSelector((state) => state.account.account ? state.account.account : {});

    const handleToggleClick = () => {
        console.log('click on header');
        setShowNav(!showNav);
    }

    const handleSelectItem = () => {
        setShowNav(false);
    }

    const handleCloseNav = () => {
        setShowNav(false)
    }

    const handleSignOut = () => {
        const token = JSON.parse(localStorage.getItem('refresh_token'));
        axios({
            url: '/auth/logout',
            method: 'post',
            data: {
                token: token,
            }
        })
            .then(res => {
                dispatch(clearAccount());
                dispatch(resetUsers());
                dispatch(notifyInfo(res.data.message));
                axios.defaults.headers.common['Authorization'] = 'bearer ';
                setTimeout(() => {
                    dispatch(hideNotify())
                }, 4000)
                localStorage.clear();
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                navigate('/login');
            })
    }

    return (

        <div className={styles.header}>

            <Container>

                <div
                    className={styles.headerContainer}
                >

                    {!_.isEmpty(profile) &&
                        <p
                            className={clsx('fs-16 text-white ml-5', styles.text)}
                            title={`${userRoleHelper(profile.role)} - ${profile.role <= 3 && checkPosition(profile.position)}`}
                        >
                            {userRoleHelper(profile.role)}{(profile.role <= 3 && profile.role > 1) && ` - ${checkPosition(profile.position)}`}
                        </p>}

                    <Link to={profile.role ? checkNavigation(profile.role) : '/'}>
                        <div className={styles.headerHome}>
                            <div
                                className={clsx('text-black', 'fs-20', 'br-full')}
                                title={account.name !== undefined ? account.name : ''}
                                style={{
                                    backgroundImage: `url(${(account.file !== undefined) ? account.file : defaultImg})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                            </div>
                        </div>
                    </Link>

                    {showNav && <div onClick={handleCloseNav} className={styles.headerNavbarDrop}></div>}


                    <div onClick={handleToggleClick} className={clsx('fs-18 text-white', styles.account)}>
                        {account.name === undefined ?
                            <FontAwesomeIcon className="btn-hover-scale" icon={faBars} />
                            :
                            (
                                <div className="btn-hover-scale d-flex align-items-center">
                                    <p className="fs-14">
                                        <FontAwesomeIcon icon={faUser} />
                                    </p>
                                    <p
                                        className={clsx('fs-16 ml-1', styles.text)}
                                        style={{ zIndex: '100' }}
                                    >{account.name}
                                    </p>
                                </div>)
                        }
                    </div>

                </div>
            </Container>


            <Navbar
                handleSignOut={handleSignOut}
                selectedItem={handleSelectItem}
                display={showNav}
            />

        </div>

    );
}

export default memo(Header);
