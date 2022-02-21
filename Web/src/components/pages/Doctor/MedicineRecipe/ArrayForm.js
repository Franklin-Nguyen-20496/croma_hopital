import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import BtnIcon from '../../../common/BtnIcon';
import SearchContent from './SearchContent';

const ArrayForm = (props) => {
    const {
        values,
        state,
        handleBlur,
        handleChange,
        dispatch,
    } = props;
    const medicines = useSelector(state => state.medicines.list);

    return (
        <FieldArray
            name="components"
        >
            {({ push, remove, replace }) => (
                <React.Fragment>
                    {values.components.map((_, index) => (
                        <div
                            key={index}
                            className="row gap-8 mb-1"
                        >
                            <div className="col-12 col-md-6"

                            >
                                <div
                                    style={{ position: 'relative' }}
                                >
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        name={`components.${index}.medicineName`}
                                        value={values.components[index].medicineName}
                                        onChange={(e) => {
                                            dispatch({
                                                type: 'set_search',
                                                payload: e.target.value
                                            })
                                            handleChange(e)
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(e);
                                            const id = values.components[index].medicineID;
                                            // console.log('id', id, state.medicines)
                                            if (medicines.length > 0 && id) {
                                                const item = medicines.find(item => item.id === id);
                                                replace(index, {
                                                    medicineID: item.id,
                                                    medicineName: item.name,
                                                    unit: item.unit,
                                                    total: values.components[index].total,
                                                })
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({
                                                type: 'set_selected',
                                                payload: index,
                                            })
                                            dispatch({
                                                type: 'set_search',
                                                payload: e.target.value
                                            })
                                        }}
                                        placeholder="Tên thuốc"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name={`components.${index}.medicineName`} children>
                                        {msg => <p className="fs-12 text-red">{msg}</p>}
                                    </ErrorMessage>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            // transform: 'translateY(-50%)',
                                            width: '3.2rem',
                                            height: '3.6rem',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({
                                                type: 'set_selected',
                                                payload: index,
                                            })
                                        }}
                                        className="text-black o-50 clickable d-flex justify-content-center align-items-center"
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </div>

                                    {
                                        state.selected === index &&
                                        <SearchContent
                                            replace={replace}
                                            dispatch={dispatch}
                                            index={index}
                                            search={state.search}
                                            components={values.components}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <Field
                                    name={`components.${index}.total`}
                                    type="number" placeholder="Số lượng"
                                    style={inputStyle}
                                />
                                <ErrorMessage name={`components.${index}.total`} children>
                                    {msg => <p className="fs-12 text-red">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            <div className="row col-6 col-md-3">

                                <div style={{ flex: 1 }}
                                    className="mr-1"
                                >
                                    <Field
                                        disabled
                                        name={`components.${index}.unit`}
                                        placeholder="đơn vị"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name={`components.${index}.unit`} children>
                                        {msg => <p className="fs-12 text-red">{msg}</p>}
                                    </ErrorMessage>
                                </div>
                                <BtnIcon
                                    icon={faMinus}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        remove(index)
                                    }}
                                />
                            </div>

                        </div>
                    ))}

                    <div className="d-flex justify-content-end">
                        <BtnIcon
                            icon={faPlus}
                            onClick={() => push({
                                medicineID: '',
                                medicineName: '',
                                total: '',
                                unit: '',
                            })}
                        />
                    </div>
                </React.Fragment>
            )}
        </FieldArray>
    );
}

const inputStyle = {
    border: 'none',
    height: '3.6rem',
    borderRadius: '4px',
}

export default ArrayForm;
