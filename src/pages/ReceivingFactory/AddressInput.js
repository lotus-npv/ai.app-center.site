import React, { useRef, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    CardTitle,
    CardSubtitle,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";


const Address = () => {

    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            username: '',
            password: '',
            password1: '',
            email: '',
            digits: '',
            number: '',
            alphanumeric: '',
            tinh: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(
                "This value is required"
            ),
            password: Yup.string().required(
                "This value is required"
            ),
            password1: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: () => Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                ),
            }),
            email: Yup.string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),
            url: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                )
                .required("Please enter correct Url"),
            digits: Yup.number().required(
                "Please Enter Your Digits"
            ),
            number: Yup.number().required(
                "Please Enter Your Number"
            ),
            alphanumeric: Yup.string()
                .matches(
                    /^[a-z0-9]+$/i,
                    "Enter correct Alphanumeric!"
                )
                .required("Please Enter Your Alphanumeric"),
            textarea: Yup.string().required(
                "Please Enter Your Textarea"
            ),
            tinh: Yup.string().required(
                "This value is required"
            ),
        }),
        onSubmit: (values) => {
        }
    });

    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validationType.handleSubmit();
                    return false;
                }}>

                <div style={{ height: 'auto' }}>
                    <Row className='text-light'>
                        <Col lg={1} className='mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="tinh"
                                    type="text"
                                    onChange={validationType.handleChange}
                                    onBlur={validationType.handleBlur}
                                    value={validationType.values.tinh || ""}
                                    invalid={
                                        validationType.touched.tinh && validationType.errors.tinh ? true : false
                                    }
                                />
                                {validationType.touched.tinh && validationType.errors.tinh ? (
                                    <FormFeedback type="invalid">{validationType.errors.tinh}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col lg={2} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                        <Col lg={2} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                        <Col lg={2} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                        <Col lg={2} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                        <Col lg={1} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                        <Col lg={2} className='text-center mt-2 fw-bold'>
                            <div className="mb-3">
                                <Input
                                    name="number"
                                    type="text"
                                    // onChange={validationType.handleChange}
                                    // onBlur={validationType.handleBlur}
                                    value={validationType.values.number || ""}
                                    invalid={
                                        validationType.touched.number && validationType.errors.number ? true : false
                                    }
                                />
                                {/* {validationType.touched.number && validationType.errors.number ? (
                                                                <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                                            ) : null} */}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    )
}

export default Address;