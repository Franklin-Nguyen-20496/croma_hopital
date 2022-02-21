import React, { useState, useEffect, useRef, memo } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import BtnIcon from './BtnIcon';
import SelectItem from './SelectItem';
import actions from '../../redux/actions';
const { selectUser, setUpdateTrue, notifyInfo, deleteUser } = actions;

const UserItem = (props) => {
    const { user } = props;
    console.log('user item re-render');
    const [style, setStyle] = useState(false);
    const [menu, setMenu] = useState(false);
    const showBtn = useRef();
    const HideBtn = useRef();
    const deleteBtn = useRef();
    const position = useSelector(state => state.users.positionUpdateUser);
    const dispatch = useDispatch();

    const imgStyle = {
        minWidth: '4.8rem',
        maxWidth: '4.8rem',
        height: '4.8rem',
        backgroundImage: `url(${user.file ? user.file : process.env.REACT_APP_DEFAULT_IMG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    useEffect(() => {

        const handleDeleteUser = () => {
            axios({
                method: 'delete',
                url: `/users/delete/${user.id}`,
            })
                .then(res => {
                    console.log('res.data.message', res.data.message);
                    dispatch(notifyInfo(res.data.message));
                    setTimeout(() => {
                        dispatch(notifyInfo(''));
                    }, 4000);
                    dispatch(deleteUser(user.id));
                })
                .catch(err => console.log(err));
        }

        deleteBtn.current.addEventListener('click', handleDeleteUser)
    }, [dispatch, user.id])

    useEffect(() => {

        const handleShowMenu = (e) => {
            e.stopPropagation();
            setMenu(true);
        };

        const handleHideMenu = (e) => {
            e.stopPropagation();
            setMenu(false);
        };

        const handleClickWindow = () => {
            setMenu(false);
        }

        showBtn.current.addEventListener('click', handleShowMenu);

        HideBtn.current.addEventListener('click', handleHideMenu);


        document.addEventListener('click', handleClickWindow);

        return () => {
            document.removeEventListener('click', handleHideMenu);
        }
    }, [])

    return (
        <div
            className="d-flex"
            style={itemStyle}
            onMouseOver={() => {
                setStyle(true)
            }}
            onMouseLeave={() => {
                setStyle(false)
            }}
        >
            <div
                style={imgStyle}
                className="br-full shadow"
                alt={user.name}
                title={user.name}
            >
            </div>

            <div
                className="ml-1 text-shadow"
                style={{ flex: 1 }}
            >
                <h3 className="">{user.name}</h3>
            </div>
            <div className={clsx('br-full ml-1 animation', style ? 'd-block' : 'd-none')}
                style={{ alignSelf: 'flex-start', width: '4rem' }}
            >
                <div
                    className={menu ? 'd-none' : 'd-block'}
                >
                    <BtnIcon ref={showBtn} />
                </div>

                <div className={menu ? 'd-block' : 'd-none'}>
                    <BtnIcon ref={HideBtn} />
                </div>
            </div>

            <div
                className={clsx('btn-topic', menu ? 'd-block' : 'd-none', 'animation')}
                style={menuStyle}
            >
                <div
                    onClick={() => {
                        window.scrollTo(0, position - 64)
                        dispatch(setUpdateTrue());
                        dispatch(selectUser(user));
                    }}
                >    <SelectItem title="Chỉnh sửa" />
                </div>
                <div
                    ref={deleteBtn}
                >
                    <SelectItem title="xóa" />
                </div>
            </div>

        </div >
    );
}

const itemStyle = {
    position: 'relative',
    alignItems: 'center',
    maxWidth: '28rem',
}

const menuStyle = {
    display: 'block',
    position: 'absolute',
    right: '0.2rem',
    top: '3.6rem',
    cursor: 'pointer',
    zIndex: '10',
}

export default memo(UserItem);
