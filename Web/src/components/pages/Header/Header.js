
import React, { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';

import styles from './Header.module.scss';
import Navbar from './Navbar';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import actions from '../../../redux/actions';
const { clearAccount, resetUsers, notifyInfo } = actions;

const Header = () => {
    console.log('header render');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultImg = process.env.REACT_APP_DEFAULT_IMG;

    const [showNav, setShowNav] = useState(false);
    const [selected, setSelected] = useState('');
    const account = useSelector((state) => state.account.account ? state.account.account : {});

    const handleToggleClick = () => {
        console.log('click on header');
        setShowNav(!showNav);
    }

    const handleSelectItem = (e) => {
        const value = e.target.textContent;
        console.log('value', value);
        setSelected(value);
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
                    dispatch(notifyInfo(''))
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
                    <Link to="/">
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
                        {account.name === undefined ? <FontAwesomeIcon className="btn-hover-scale" icon={faBars} /> : (
                            <div className="btn-hover-scale d-flex align-items-center">
                                <p className="fs-14">
                                    <FontAwesomeIcon icon={faUser} />
                                </p>
                                <p
                                    className="fs-16 ml-1"
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
                selected={selected}
                selectedItem={handleSelectItem}
                display={showNav}
            />

        </div>

    );
}

export default memo(Header);
