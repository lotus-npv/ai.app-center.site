import React, { useState } from 'react';
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
    Form
} from "reactstrap";

import Switch from "react-switch";
import Select from "react-select";


// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, Route, useNavigate } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Offsymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            No
        </div>
    );
};

const OnSymbol = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "#fff",
                paddingRight: 2
            }}
        >
            {" "}
            Yes
        </div>
    );
};

const optionGroup = [
    { label: "Mustard", value: "Mustard" },
    { label: "Ketchup", value: "Ketchup" },
    { label: "Relish", value: "Relish" }
];

const InputStatus = () => {
    document.title = "Status Page";
    const navigate = useNavigate();
    const [switch1, setswitch1] = useState(false);
    const [selectedGroup, setselectedGroup] = useState(null);

    const validationType = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            note: '',
            auto: false,
            condition: '',
            condition_date: '',
            number: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(
                "This value is required"
            ),
            note: Yup.string().required(
                "This value is required"
            ),
            condition: Yup.string().required(
                "This value is required"
            ),
            condition_date: Yup.date().required("Please Enter Your Date"),
            number: Yup.number().required(
                "Please Enter Your Number"
            )
        }),
        onSubmit: (values) => {
        }
    });

    const back = () => {
        navigate(-1);
    }

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }

    console.log(validationType.values)



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
                                    <Form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validationType.handleSubmit();
                                            return false;
                                        }}>
                                        <div className="mb-3">
                                            <Label className="form-label">Tên trạng thái</Label>
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
                                            <Label>Ghi chú</Label>
                                            <Input
                                                name="note"
                                                type="text"
                                                autoComplete="off"
                                                placeholder="note some thing"
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

                                        <div className="mb-3">
                                            <Switch
                                                name='auto'
                                                uncheckedIcon={<Offsymbol />}
                                                checkedIcon={<OnSymbol />}
                                                className="me-3 mb-sm-8"
                                                onColor="#626ed4"
                                                onChange={(value) => validationType.setFieldValue('auto', value)}
                                                checked={validationType.values.auto}
                                            />
                                            <Label>Tự động thêm trạng thái</Label>

                                        </div>

                                        <Row>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label>Điều kiện</Label>
                                                    <Select
                                                        value={validationType.values.condition}
                                                        onChange={(val) => {
                                                            validationType.setFieldValue('condition', val);
                                                        }}
                                                        options={optionGroup}
                                                        className="select2-selection"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label>Mốc thời gian</Label>
                                                    <Select
                                                        value={selectedGroup}
                                                        onChange={() => {
                                                            handleSelectGroup();
                                                        }}
                                                        options={optionGroup}
                                                        className="select2-selection"
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label className="form-label">Số ngày</Label>
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

export default InputStatus;