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
import { Link, Route, useNavigate } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const InputCareer = () => {
    document.title = "Status Page";
    const navigate = useNavigate();
    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            note: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(
                "This value is required"
            ),
            note: Yup.string().required(
                "Please Enter Your Textarea"
            ),
        }),
        onSubmit: (values) => {
            alert(values.name)
        }
    });

    const back = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Status Form" breadcrumbItem="Status Form" />

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
                                            <Label className="form-label">Tên ngành nghề</Label>
                                            <Input
                                                name="name"
                                                placeholder="Type Something"
                                                type="text"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                value={validationType.values.name || ""}
                                                invalid={
                                                    validationType.touched.name && validationType.errors.name ? true : false
                                                }
                                            />
                                            {validationType.touched.name && validationType.errors.name ? (
                                                <FormFeedback type="invalid">{validationType.errors.name}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">Ghi chú</Label>
                                            <Input
                                                name="note"
                                                placeholder="Type Something"
                                                type="text"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                value={validationType.values.note || ""}
                                                invalid={
                                                    validationType.touched.note && validationType.errors.note ? true : false
                                                }
                                            />
                                            {validationType.touched.note && validationType.errors.note ? (
                                                <FormFeedback type="invalid">{validationType.errors.note}</FormFeedback>
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

export default InputCareer;