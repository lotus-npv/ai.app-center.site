import React from 'react';
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
import { Link, Route, useNavigate  } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const InputDispatchingConpany = () => {
    document.title = "Dispatching Company Input Page";
    const navigate = useNavigate();
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
        }),
        onSubmit: (values) => {
        }
    });

    const back = () => {
        navigate(-1);
    }




    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Dispatching Company" breadcrumbItem="Dispatching Company Form" />

                    <div className="d-flex mb-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-success  w-sm"
                            onClick={back}
                        >
                            <i className="bx bx-arrow-back d-block font-size-24"></i>{" "}
                        </button>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    {/* <CardTitle>Validation type</CardTitle>
                                    <CardSubtitle className="mb-3">
                                        Parsley is a availity reactstrap validation. It helps you
                                        provide your users with feedback on their form submission
                                        before sending it to your server.
                                    </CardSubtitle> */}

                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validationType.handleSubmit();
                                            return false;
                                        }}>
                                        <div className="mb-3">
                                            <Label className="form-label">Required</Label>
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
                                        <div className="mb-3">
                                            <Label>Equal To</Label>
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
                                        <div className="mb-3">
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
                                        <div className="mb-3">
                                            <Label className="form-label">E-Mail</Label>
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
                                        <div className="mb-3">
                                            <Label className="form-label">Digits</Label>
                                            <Input
                                                name="digits"
                                                label="Digits"
                                                placeholder="Enter Only Digits"
                                                type="number"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                value={validationType.values.digits || ""}
                                                invalid={
                                                    validationType.touched.digits && validationType.errors.digits ? true : false
                                                }
                                            />
                                            {validationType.touched.digits && validationType.errors.digits ? (
                                                <FormFeedback type="invalid">{validationType.errors.digits}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Number</Label>
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
                                        <div className="mb-3">
                                            <Label className="form-label">Alphanumeric</Label>
                                            <Input
                                                name="alphanumeric"
                                                placeholder="Enter Only alphanumeric value"
                                                type="text"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                value={validationType.values.alphanumeric || ""}
                                                invalid={
                                                    validationType.touched.alphanumeric && validationType.errors.alphanumeric ? true : false
                                                }
                                            />
                                            {validationType.touched.alphanumeric && validationType.errors.alphanumeric ? (
                                                <FormFeedback type="invalid">{validationType.errors.alphanumeric}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button type="submit" color="primary" >
                                                Submit
                                            </Button>{" "}
                                            <Button type="reset" color="secondary" >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default InputDispatchingConpany;