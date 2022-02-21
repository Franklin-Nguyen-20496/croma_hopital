
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';

import actions from '../../../../redux/actions';
import PollItem from './PollItem';
import Btn from '../../../common/Btn';
import PollDetail from './PollDetail';
import PollProcessedItem from './PollProcessedItem';
import * as styles from './index.module.scss';

const { setAllNewPolls, setAllProcessedPolls } = actions;

const buttons = [
    {
        id: 1,
        title: 'Thông báo mới',
        marginBottom: '2',
        marginLeft: '1'
    },
    {
        id: 2,
        title: 'Lịch sử',
        marginLeft: '2'
    }
]

const Polls = () => {
    const dispatch = useDispatch();
    const [poll, setPoll] = useState({ agreed: [], noAgreed: [] });
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(1)
    const newPolls = useSelector(state => state.polls.newPolls);
    const processedPolls = useSelector(state => state.polls.processedPolls);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/polls/new',
        })
            .then(res => {
                console.log('res in get new polls', res);
                if (res.data.data) {
                    dispatch(setAllNewPolls(res.data.data))
                }
                else console.warn(res.data.message);
            })
            .catch(err => console.error(err));
    }, [dispatch])

    useEffect(() => {
        axios({
            method: 'get',
            url: '/polls',
        })
            .then(res => {
                console.log('res in get processed polls', res);
                if (res.data.data) {
                    dispatch(setAllProcessedPolls(res.data.data))
                }
                else console.warn(res.data.message)
            })
            .catch(err => console.log(err))
    }, [dispatch])

    return (
        <div
            className="row"

        >

            <div className="row">
                {
                    buttons.map(btn => {
                        return (
                            <Btn
                                key={btn.id}
                                title={btn.title}
                                marginBottom={btn.marginBottom ? btn.marginBottom : ''}
                                marginLeft={btn.marginLeft ? btn.marginLeft : ''}
                                selected={selected === btn.id}
                                noShadow={selected === btn.id}
                                onClick={() => setSelected(btn.id)}
                            />
                        )
                    })
                }
                {/* <Btn title="Thông báo mới" marginBottom="2" marginLeft="1" selected={true} />
                <Btn title="Lịch sử" marginLeft="2" /> */}
            </div>

            <div
                className={clsx('col-12 br-8', styles.controlScroll)}
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: 'calc(6.2rem * 6)'
                }}
                onScroll={event => event.preventDefault()}
            >
                {
                    (newPolls.length > 0 && selected === 1) ? newPolls.map(poll => {
                        return (
                            <PollItem
                                onClick={() => {
                                    setPoll(poll);
                                    setShow(true)
                                }}
                                key={poll.id}
                                poll={poll}
                            />
                        )
                    }) : null
                }

                {
                    (processedPolls.length > 0 && selected === 2) ?
                        processedPolls.map(poll => {
                            return (
                                <PollProcessedItem key={poll.id} poll={poll} />
                            )
                        }) : null
                }

                {
                    (newPolls.length === 0 && selected === 1) &&
                    <p className="text-center br-8 fs-16 bg-gray d-flex justify-content-center align-items-center"
                        style={{ minHeight: 'calc(6.2rem * 6)' }}
                    >( Trống )</p>
                }

                {
                    (processedPolls.length === 0 && selected === 2) &&
                    <p className="text-center br-8 fs-16 bg-gray d-flex justify-content-center align-items-center"
                        style={{ minHeight: 'calc(6.2rem * 6)' }}
                    >( Trống )</p>
                }
            </div>

            <PollDetail show={show} setShow={setShow} poll={poll} />

        </div >
    );
}

export default Polls;
