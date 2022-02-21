
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import MedicineItem from './MedicineItem';
import BackDrop from '../../../common/BackDrop';
import Btn from '../../../common/Btn';
import ConfirmAction from '../../../common/ConfirmAction';

const List = ({ items, setMedicines }) => {
    const [selected, setSelected] = useState('');
    const [chosen, setChosen] = useState('')
    const [showPlusForm, setShowPlusForm] = useState(false);
    const [showMinusForm, setShowMinusForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const btnPlus = useRef();
    const btnMinus = useRef();

    useEffect(() => {
        const handleHideMenu = () => {
            setSelected('');
        }

        window.addEventListener('click', handleHideMenu)

        return () => {
            window.removeEventListener('click', handleHideMenu)
        }
    }, [])

    const handleSubmitPlus = (e) => {
        e.preventDefault();
        const value = chosen.total + Number(btnPlus.current.value);
        const data = {
            ...chosen,
            total: value
        }

        if (btnPlus.current.value) {
            console.log(btnPlus.current.value)
            axios({
                method: 'put',
                url: '/medicines/update',
                data: data
            })
                .then(res => {
                    const { data, message } = res.data;
                    if (data) {
                        setMedicines(prev => {
                            if (prev && prev.length > 0) {
                                const result = prev.map(value => {
                                    if (data.id === value.id) {
                                        return data
                                    }
                                    else return value
                                })
                                setSelected('');
                                return result;
                            }
                        })
                        setShowPlusForm(false);
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err))
        }
    }

    const handleSubmitMinus = (e) => {
        e.preventDefault();
        const value = chosen.total - Number(btnMinus.current.value);
        const data = {
            ...chosen,
            total: value
        }
        console.log(data);
        axios({
            method: 'put',
            url: '/medicines/update',
            data: data
        })
            .then(res => {
                const { data, message } = res.data;
                if (data) {
                    setMedicines(prev => {
                        if (prev && prev.length > 0) {
                            const result = prev.map(value => {
                                if (data.id === value.id) {
                                    return data
                                }
                                else return value
                            })
                            setSelected('');
                            return result;
                        }
                    })
                    setShowMinusForm(false);
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (e) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/medicines/delete/${chosen.id}`,
        })
            .then(res => {
                const { message } = res.data;
                if (message === 'success') {
                    setMedicines(prev => {
                        return prev.filter(value => value.id !== chosen.id)
                    })
                    setShowConfirmDelete(false);
                }
                else console.warn(message)
            })
    }

    return (
        <>
            <div className="row gap-16 mb-2">
                {
                    items ? items.map(item => {
                        return <MedicineItem
                            item={item}
                            key={item.id}
                            onClick={(e) => {
                                e.stopPropagation();

                                if (selected && selected.id === item.id) {
                                    setSelected('')
                                }
                                else setSelected(item)

                            }}
                            showMenu={item.id === selected.id}
                            handlePlus={() => {
                                setChosen(item);
                                setShowPlusForm(true);
                            }}
                            handleMinus={() => {
                                setChosen(item);
                                setShowMinusForm(true);
                            }}
                            handleDelete={() => {
                                setChosen(item);
                                setShowConfirmDelete(true)
                            }}
                        />
                    })
                        :
                        <div className="col-12 ">
                            <p className="bg-green p-1">Chưa có công thức thuốc nào!</p>
                        </div>
                }
            </div>

            <BackDrop show={showPlusForm}>
                {
                    chosen &&
                    <form
                        className="bg-white shadow br-8 p-2"
                        style={{ minWidth: '36rem', width: '100%' }}
                        onSubmit={(e) => handleSubmitPlus(e)}
                    >
                        <p className="text-center fs-20 fw-700 mb-1">Mua thêm thuốc</p>
                        <p>Còn {chosen.total} {chosen.unit} {chosen.name}</p>
                        <input ref={btnPlus} placeholder="mua thêm" type="number" />
                        <div className="d-flex justify-content-end mt-2">
                            <Btn
                                moreClass="mr-1"
                                type="submit"
                                title="Mua"
                            />
                            <Btn
                                bgColor="bg-red"
                                title="Hủy"
                                onClick={() => setShowPlusForm(false)}
                            />
                        </div>
                    </form>
                }
            </BackDrop>

            <BackDrop show={showMinusForm}>
                {
                    chosen &&
                    <form
                        className="bg-white shadow br-8 p-2"
                        style={{ minWidth: '36rem', width: '100%' }}
                        onSubmit={(e) => handleSubmitMinus(e)}
                    >
                        <p className="text-center fs-20 fw-700 mb-1">Thanh lý thuốc</p>
                        <p>Còn {chosen.total} {chosen.unit} {chosen.name}</p>
                        <input ref={btnMinus} placeholder="000" type="number" />
                        <div className="d-flex justify-content-end mt-2">
                            <Btn
                                moreClass="mr-1"
                                type="submit"
                                title="Thanh lý"
                            />
                            <Btn
                                bgColor="bg-red"
                                title="Hủy"
                                onClick={() => setShowMinusForm(false)}
                            />
                        </div>
                    </form>
                }
            </BackDrop>

            <ConfirmAction
                show={showConfirmDelete}
                onSubmit={handleDelete}
                onClick={() => {
                    setShowConfirmDelete(false);
                    setSelected('');
                }}
            >
                Bạn có chắc chắn muốn bỏ loại thuốc này không?
            </ConfirmAction>
        </>
    );
}

export default List;
