import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import io from 'socket.io-client';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PollUserItem from './PollUserItem';
import BtnIcon from '../../../common/BtnIcon';
import Btn from '../../../common/Btn';

const socket = io.connect(process.env.REACT_APP_BASE_URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const checkPositionRoom = (position) => {
    switch (position) {
        case 1: return 'Khoa chấn thương'
        case 2: return 'Khoa hô hấp'
        case 3: return 'Khoa tim mạch'
        default: return ''
    }
}

const PollDetail = ({ poll, show, setShow }) => {
    console.log(poll);
    const profile = useSelector(state => state.account.account);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState([]);
    const [noAgreed, setNoAgreed] = useState([]);

    useEffect(() => {
        setAgreed(poll.agreed);
        setNoAgreed(poll.noAgreed);
    }, [poll])

    const handleSavePoll = () => {
        const newValues = {
            ...poll,
            agreed: agreed,
            noAgreed: noAgreed,
        }
        console.log('new', newValues);
        socket.emit('polls:update', newValues);
        setShowConfirm(false);
        setShow(false);
    }

    const handleShowConfirm = () => {
        if (!_.isEqual(poll.agreed, agreed) || !_.isEqual(poll.noAgreed, noAgreed)) {
            setShowConfirm(true);
        }
    }

    const handleAddAgreed = () => {
        setAgreed(prev => {
            if (prev.length !== 0 && prev.some(id => id === profile.id)) {
                const list = prev.filter(id => id !== profile.id);
                return list
            }
            else {
                return [...prev, profile.id]
            }
        })
        setNoAgreed(poll.noAgreed);
    }

    const handleAddNoAgreed = () => {
        setNoAgreed(prev => {
            if (prev.length !== 0 && prev.some(id => id === profile.id)) {
                const list = prev.filter(id => id !== profile.id);
                return list
            }
            else {
                return [...prev, profile.id]
            }
        })
        setAgreed(poll.agreed);
    }

    return (
        <>
            <div
                className={clsx(show ? 'd-block' : 'd-none')}
                style={backdropStyle}
                onClick={() => setShow(false)}
            >
                <div
                    className="bg-white big-shadow p-2 br-8"
                    style={formStylePoll}
                    onClick={(event) => event.stopPropagation()}
                >
                    <p className="fs-16 text-center mb-1">Thông tin cuộc bình chọn</p>

                    <div style={{ flex: 1 }}>
                        <div className={clsx('text-topic ml-1')}>
                            <p>- Vị trí: {checkPositionRoom(poll.positionRoom)}</p>
                            <p>- Mức độ: {poll.levelRoom}</p>
                            <p className="mb-1">- Đồng ý: {poll.agreed.length}/4</p>
                        </div>

                        <div
                            className="row gap-10 pb-1 mb-2"
                            style={{ flex: 1 }}
                        >
                            <div className="col-6">
                                <p className="text-center mb-1">Đồng ý</p>
                                {
                                    agreed.length > 0 &&
                                    agreed.map(id => {
                                        return (<PollUserItem key={id} id={id}
                                            user={id === profile.id ? profile : null}
                                        />)

                                    })
                                }
                                {
                                    ((profile && profile.role) === 2 &&
                                        poll.agreed.every(id => id !== profile.id) &&
                                        poll.noAgreed.every(id => id !== profile.id)) &&
                                    <div className="d-flex align-items-center">

                                        <BtnIcon
                                            icon={agreed.length !== 0 && agreed.some(id => id === profile.id) ? faMinus : faPlus}
                                            noShadow={true}
                                            onClick={handleAddAgreed}
                                        />


                                        <p className="ml-1">{agreed.length !== 0 && agreed.some(id => id === profile.id) ? 'Xóa' : 'Thêm'}</p>
                                    </div>
                                }
                            </div>

                            <div className="col-6">
                                <p className="text-center mb-1">Không đồng ý</p>
                                {
                                    noAgreed.length > 0 &&
                                    noAgreed.map(id => {
                                        return (<PollUserItem key={id} id={id}
                                            user={id === profile.id ? profile : null}
                                        />)
                                    })
                                }
                                {
                                    ((profile && profile.role === 2) &&
                                        poll.agreed.every(id => id !== profile.id) &&
                                        poll.noAgreed.every(id => id !== profile.id)) &&
                                    <div className="d-flex align-items-center">

                                        < BtnIcon onClick={handleAddNoAgreed}
                                            icon={noAgreed.length !== 0 && noAgreed.some(id => id === profile.id) ? faMinus : faPlus}
                                            noShadow={true}
                                        />
                                        <p className="ml-1">{noAgreed.length !== 0 && noAgreed.some(id => id === profile.id) ? 'Xóa' : 'Thêm'}</p>

                                    </div>
                                }
                            </div>
                        </div>
                        <hr className="mb-1" />
                    </div>

                    <div className="row justify-content-end">

                        <Btn
                            title="Lưu lại" noShadow={true} marginRight="2"
                            onClick={handleShowConfirm}
                        />
                        <Btn
                            title="Hủy" noShadow={true} bgColor="bg-red"
                            onClick={() => setShow(false)}
                        />
                    </div>
                </div>
            </div>

            <div
                className={clsx(showConfirm ? 'd-block' : 'd-none')}
                style={backdropStyle}
                onClick={() => setShowConfirm(false)}
            >
                <div
                    className="bg-white big-shadow p-2 br-8"
                    style={formStyle}
                    onClick={(event) => event.stopPropagation()}
                >
                    <p className="fs-16 fw-500 mb-2">Bạn có muốn lưu thông tin này không, hành động này sẽ không được hoàn tác!</p>
                    <div className="d-flex justify-content-end">
                        <Btn onClick={handleSavePoll} bgColor="bg-green" title="Ok" marginRight="2" />
                        <Btn title="Hủy" bgColor="bg-red" onClick={() => setShowConfirm(false)} />
                    </div>
                </div>

            </div>
        </>
    );
}

const backdropStyle = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 100
}

const formStylePoll = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(calc(-50% - 5rem))',
    maxWidth: '40rem',
    width: '100%',
    minHeight: '38rem',
    display: 'flex',
    flexDirection: 'column',
}

const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(calc(-50% - 5rem))',
    maxWidth: '38rem',
    width: '100%',
}

export default PollDetail;
