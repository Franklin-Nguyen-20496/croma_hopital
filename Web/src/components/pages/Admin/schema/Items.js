import React, { useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { ListContext } from './index';
import actions from '../../../../redux/actions';
const { setUpdateFalse } = actions;

const stylesTitle = {
    flex: '1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineBreak: '1',
}


const Items = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const classId = Number(params.classId);
    const list = useContext(ListContext);

    return (
        <div className="row gap-10 gap-md-20">
            {
                list.map((item, index) => {
                    return (
                        <div
                            key={index} className="col-12 col-sm-4"
                            onClick={() => dispatch(setUpdateFalse())}
                        >
                            <Link to={`${index + 1}`}>
                                <div
                                    style={{
                                        position: 'relative',
                                        backgroundImage: `url(${item.img})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        with: '100%',
                                        paddingBottom: '62.5%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        maxWidth: '40rem',
                                        maxHeight: 'calc(40rem*0.625)',
                                        transform: classId === item.id ? 'scale(1.05)' : 'scale(1)',
                                        zIndex: -10,
                                    }}
                                    className="d-none d-sm-block shadow transition br-16 mb-2"
                                >
                                </div>
                                <p
                                    className={clsx('transition text-start fs-16 fs-sm-16 fs-md-18',
                                        classId === item.id ? 'text-comp-topic' : 'text-black')}
                                    style={stylesTitle}
                                    title={item.name}
                                >
                                    {item.name}
                                </p>
                            </Link>
                        </div>
                    )
                })
            }
        </div >
    );
}

export default Items;
