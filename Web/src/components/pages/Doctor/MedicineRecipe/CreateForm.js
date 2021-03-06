import React, { useReducer, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import Btn from '../../../common/Btn';
import ArrayForm from './ArrayForm';
import actions from '../../../../redux/actions';

const { addOneRecipe, updateOneRecipe, notifyInfo, hideNotify } = actions;

const initialState = {
    selected: '',
    search: '',
    medicines: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_selected':
            return {
                ...state,
                selected: action.payload
            }
        case 'set_search':
            return {
                ...state,
                search: action.payload
            }
        case 'set_medicines':
            return {
                ...state,
                medicines: action.payload,
            }
        default:
            return state;
    }
}

const initialValues = {
    name: '',
    description: '',
    type: '',
    doctorID: '',
    components: [
        {
            medicineID: '',
            medicineName: '',
            total: '',
            unit: '',
        },
        {
            medicineID: '',
            medicineName: '',
            total: '',
            unit: '',
        }
    ],
}

const CreateForm = (props) => {
    const {
        state: recipeState,
        dispatch: recipeDispatch
    } = props;
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const medicines = useSelector(state => state.medicines.list);
    const profile = useSelector(state => state.account.account);
    const [initialForm, setInitialForm] = useState(initialValues);

    useEffect(() => {
        if (recipeState.showEdit) {
            setInitialForm(recipeState.selected)
        }
    }, [recipeState])

    useEffect(() => {
        dispatch({
            type: 'set_medicines',
            payload: medicines,
        })
    }, [dispatch, medicines]);


    useEffect(() => {
        const handleCloseSearchContent = () => {
            dispatch({
                type: 'set_selected',
                payload: '',
            })
        }
        window.addEventListener('click', handleCloseSearchContent)
        return () => {
            window.removeEventListener('click', handleCloseSearchContent)
        }
    }, [])

    const SignupSchema = yup.object().shape({
        name: yup.string().max(32, 'T???i ??a 32 k?? t???').required('Ch??a ??i???n c??ng th???c thu???c!'),
        description: yup.string().max(64).nullable(),
        type: yup.number().min(1).max(2).required(),
        components: yup.array()
            .of(
                yup.object({
                    medicineName: yup.string().required('This value is required'),
                    medicineID: yup.string().required('Ch??a c?? id c???a lo???i thu???c'),
                    total: yup.number().min(1, 'S??? kh??ng h???p l???').required('Ch??a ??i???n s??? l?????ng thu???c'),
                    unit: yup.string().required('Ch??a c?? ????n v???'),
                })
            )
            .min(1, 'C??ng th???c thu???c ph???i c?? t???i thi???u 1 lo???i thu???c').required(),
    })

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">{recipeState.showEdit ? 'Ch???nh s???a c??ng th???c thu???c' : 'T???o c??ng th???c thu???c'}</p>
            <Formik
                enableReinitialize
                initialValues={initialForm}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                    // console.log('is change', !_.isEqual(values, recipeState.selected), values, recipeState.selected);
                    if (recipeState.showEdit && !_.isEqual(values, recipeState.selected)) {
                        // console.log('updating')
                        axios({
                            method: 'put',
                            url: '/recipes/update',
                            data: values,
                        })
                            .then(res => {
                                const { message } = res.data;
                                if (message === 'success') {
                                    reduxDispatch(notifyInfo(`???? ch???nh s???a c??ng th???c thu???c: ${values.name}`));
                                    setTimeout(() => {
                                        reduxDispatch(hideNotify())
                                    }, [4000])
                                    reduxDispatch(updateOneRecipe(values));
                                    recipeDispatch({ type: 'reset' })
                                    setInitialForm(initialValues);
                                }
                            })
                            .catch(err => console.log(err))
                    }
                    else if (profile.role && profile.role === 3) {
                        // console.log('creating')
                        const newValues = {
                            ...values,
                            doctorID: profile.id,
                        }
                        // console.log('new values', newValues);
                        axios({
                            method: 'post',
                            url: '/recipes/create',
                            data: newValues,
                        })
                            .then(res => {
                                const { message, data } = res.data;
                                if (data) {
                                    // console.log('res create', data);
                                    // setInitialForm(initialValues);
                                    reduxDispatch(notifyInfo(`???? t???o c??ng th???c thu???c: ${data.name}`));
                                    setTimeout(() => {
                                        reduxDispatch(hideNotify())
                                    }, [4000])
                                    reduxDispatch(addOneRecipe(data));
                                    resetForm();
                                }
                                else console.warn(message);
                            })
                            .catch(err => console.log(err));
                    }
                }}
            >
                {({ values, errors, handleBlur, handleChange }) => (
                    <Form>
                        <div className="row gap-16 mb-1">
                            <div className="col-12">
                                <Field name="name" type="text" placeholder="T??n c??ng th???c" />
                                <ErrorMessage name="name">
                                    {msg => <p className="fs-12 text-red ml-2">{msg}</p>}
                                </ErrorMessage>
                            </div>
                            <div className="col-12">
                                <Field name="description" type="text" placeholder="M?? t??? c??ng th???c" />
                                <ErrorMessage name="description">
                                    {msg => <p className="fs-12 text-red ml-2">{msg}</p>}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div className="br-16 bg-brown p-2">
                            <label htmlFor="type" className="mr-1" >Ch???n m???c ?????</label>
                            <Field
                                as="select"
                                name="type"
                                type="number"
                                style={{
                                    maxWidth: '12rem',
                                    height: '3.2rem',
                                    border: errors.type ? '1px solid #e61919' : 'none',
                                    borderRadius: '4px',
                                }}
                                className="bg-white mb-1"
                            >
                                <option value="">M???c ?????</option>
                                <option value={1}>1-2</option>
                                <option value={2}>3-6</option>
                            </Field>

                            <ArrayForm
                                state={state}
                                values={values}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                dispatch={dispatch}
                            />

                            {
                                (typeof errors.components) === 'string' &&
                                <p className="fs-14 text-red">{errors.components}</p>
                            }
                        </div>

                        <div className="d-flex justify-content-center mt-2">
                            <Btn
                                type="submit"
                                title={recipeState.showEdit ? 'L??u c??ng th???c' : 'T???o c??ng th???c'}
                            />
                            {recipeState.showEdit && <Btn
                                title="H???y"
                                bgColor="bg-red"
                                onClick={() => {
                                    setInitialForm(initialValues)
                                    recipeDispatch({ type: 'reset' })
                                }}
                                moreClass="ml-1"
                            />}
                        </div>
                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateForm;
