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
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, Route, useNavigate } from "react-router-dom";
import avata from '../../assets/images/users/avatar-1.jpg'

const DispatchingConpanyInput = () => {
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

    const fileInputRef = useRef();

    const [selectedFile, setSelectedFile] = useState(avata);

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    validationType.handleSubmit();
                    return false;
                }}>

                <Row>
                    <Col lg={3} xl={2}>
                        <Card
                            style={{
                                width: '90%',
                            }}
                        >

                            <CardBody className='d-flex flex-column'>
                                <div style={{ aspectRatio: 1 }}>
                                    <img
                                        style={{ width: '100%', height: '100%' }}
                                        className='rounded-circle img-thumbnail'
                                        alt="avata"
                                        src={selectedFile}
                                    />
                                </div>


                                <CardTitle tag="h5" className='text-center mt-2'>
                                    Admin
                                </CardTitle>
                                <Button onClick={() => fileInputRef.current.click()}>
                                    Tải ảnh
                                </Button>{" "}
                                <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={9} xl={10}>
                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label className="form-label">Tên xí nghiệp (Tiếng Nhật)</Label>
                                    <Input
                                        name="username"
                                        placeholder="Type Something"
                                        type="text"
                                        onChange={validationType.handleChange}
                                        onBlur={validationType.handleBlur}
                                        value={validationType.values.username || ""}
                                        invalid={
                                            validationType.touched.username && validationType.errors.username ? true : false
                                        }
                                    />
                                    {validationType.touched.username && validationType.errors.username ? (
                                        <FormFeedback type="invalid">{validationType.errors.username}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label>Tên xí nghiệp (Tiếng Anh)</Label>
                                    <Input
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Password"
                                        onChange={validationType.handleChange}
                                        onBlur={validationType.handleBlur}
                                        value={validationType.values.password || ""}
                                        invalid={
                                            validationType.touched.password && validationType.errors.password ? true : false
                                        }
                                    />
                                    {validationType.touched.password && validationType.errors.password ? (
                                        <FormFeedback type="invalid">{validationType.errors.password}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label>Ngày gia nhập</Label>
                                    <Input
                                        name="password1"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Re-type Password"
                                        onChange={validationType.handleChange}
                                        onBlur={validationType.handleBlur}
                                        value={validationType.values.password1 || ""}
                                        invalid={
                                            validationType.touched.password1 && validationType.errors.password1 ? true : false
                                        }
                                    />
                                    {validationType.touched.password1 && validationType.errors.password1 ? (
                                        <FormFeedback type="invalid">{validationType.errors.password1}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label className="form-label">Mã số thuế</Label>
                                    <Input
                                        name="email"
                                        placeholder="Enter Valid Email"
                                        type="email"
                                        onChange={validationType.handleChange}
                                        onBlur={validationType.handleBlur}
                                        value={validationType.values.email || ""}
                                        invalid={
                                            validationType.touched.email && validationType.errors.email ? true : false
                                        }
                                    />
                                    {validationType.touched.email && validationType.errors.email ? (
                                        <FormFeedback type="invalid">{validationType.errors.email}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3">
                                    <Label className="form-label">Ghi chú</Label>
                                    <Input
                                        name="number"
                                        placeholder="Enter Only number"
                                        type="number"
                                        onChange={validationType.handleChange}
                                        onBlur={validationType.handleBlur}
                                        value={validationType.values.number || ""}
                                        invalid={
                                            validationType.touched.number && validationType.errors.number ? true : false
                                        }
                                    />
                                    {validationType.touched.number && validationType.errors.number ? (
                                        <FormFeedback type="invalid">{validationType.errors.number}</FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>


                    </Col>
                </Row>
            </Form>
        </>
    )

}

export default DispatchingConpanyInput;