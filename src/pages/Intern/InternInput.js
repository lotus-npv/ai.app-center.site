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

const InternInput = () => {
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

    const [textareabadge, settextareabadge] = useState(0);
    const [textcount, settextcount] = useState(0);

    function textareachange(event) {
        const count = event.target.value.length;
        if (count > 0) {
            settextareabadge(true);
        } else {
            settextareabadge(false);
        }
        settextcount(event.target.value.length);
    }

    return (
        <>
            <Row >
                <Col lg={2} xl={2}>
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
                <Col lg={5} xl={5} className=''>
                    <Row>
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Họ</Label>
                                <Input
                                    name="username"
                                    placeholder="Họ"
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

                            <div className="mb-3">
                                <Input
                                    name="password1"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Họ (En)"
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
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label>Tên đệm</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Tên đệm"
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

                            <div className="mb-3">
                                <Input
                                    name="email"
                                    placeholder="Tên đệm (En)"
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
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label>Tên</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Tên"
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

                            <div className="mb-3">
                                <Input
                                    name="number"
                                    placeholder="Tên (En)"
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
                    <Row>
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Quốc gia</Label>
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
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Giới tính</Label>
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
                        <Col lg={4} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Ngày sinh</Label>
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
                    </Row>

                    <Row>
                        <Col lg={12} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Số hộ chiếu</Label>
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
                    </Row>

                    <Row>
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Ngày cấp</Label>
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
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Ngày hết hạn</Label>
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
                    </Row>


                </Col>

                <Col lg={1} className='d-flex justify-content-center'>
                    <div style={{ width: '2px', height: '100%' }} className='border border-left border-secondary'></div>
                </Col>

                <Col lg={4} xl={4} className=''>
                    <Row>
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Số thẻ ngoại kiều</Label>
                                <Input
                                    name="username"
                                    placeholder="Nhập số thẻ ngoại kiều"
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
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label>Tư cách lưu trú</Label>
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
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Ngày cấp</Label>
                                <Input
                                    name="username"
                                    placeholder="Nhập số thẻ ngoại kiều"
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
                        <Col lg={6} className='gx-1'>
                            <div className="mb-3">
                                <Label>Ngày hết hạn</Label>
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
                        <Col lg={12} className='gx-1'>
                            <div className="mb-3">
                                <Label className="form-label">Ngành nghề</Label>
                                <Input
                                    name="username"
                                    placeholder="Nhập số thẻ ngoại kiều"
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
                    </Row>
                    <Row>
                        <Col lg={12} className='gx-1'>
                            <div className="mt-2">
                                <Label>Ghi chú</Label>
                                <Input
                                    type="textarea"
                                    id="textarea"
                                    onChange={e => {
                                        textareachange(e);
                                    }}
                                    maxLength="225"
                                    rows="3"
                                    placeholder="This textarea has a limit of 225 chars."
                                />
                                {textareabadge ? (
                                    <span className="badgecount badge bg-success">
                                        {" "}
                                        {textcount} / 225{" "}
                                    </span>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )

}

export default InternInput;