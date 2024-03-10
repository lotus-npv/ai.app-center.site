import React from 'react';
import {
    Row,
    Col,
    Label,
    Input,
    FormFeedback,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import Switch from "react-switch";

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


const Address = (props) => {
    const { getIndex } = props;
    const formik = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            province: null,
            district: null,
            commune: null,
            detail: '',
            phone_number: '',
            fax: '',
            email: '',
            is_default: false
        },
        validationSchema: Yup.object().shape({
            province: Yup.string().required(
                "This value is required"
            ),
            district: Yup.string().required(
                "This value is required"
            ),
            commune: Yup.string().required(
                "This value is required"
            ),
            detail: Yup.string().required(
                "This value is required"
            ),
            phone_number: Yup.string().required(
                "This value is required"
            ),
            fax: Yup.string().required(
                "This value is required"
            ),
            email: Yup.string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),
        }),
        onSubmit: (values) => {
        }
    });

    console.log(`key - ${getIndex} :` + formik.values.district)

    return (
        <>
            {/* <Form className="needs-validation"
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    return false;
                }}> */}
            <div style={{ height: 'auto' }}>
                <Row className='mt-2'>
                    <Col lg={'2'} className='mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Select
                                name='province'
                                placeholder='Chọn tỉnh'
                                value={optionGroup.find(option => option.value === formik.values.province)}
                                onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                }}
                                options={optionGroup}
                            // isClearable
                            />
                        </div>
                    </Col>

                    <Col lg={2} className='mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Select
                                name='district'
                                value={optionGroup.find(option => option.value === formik.values.district)}
                                onChange={(item) => {
                                    formik.setFieldValue('district', item == null ? null : item.value);
                                }}
                                options={optionGroup}
                                className="select2-selection"
                            // isClearable
                            />
                        </div>
                    </Col>

                    <Col lg={2} className='mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Select
                                name='commune'
                                value={optionGroup.find(option => option.value === formik.values.commune)}
                                onChange={(item) => {
                                    formik.setFieldValue('commune', item == null ? null : item.value);
                                }}
                                options={optionGroup}
                                className="select2-selection"
                            // isClearable
                            />
                        </div>
                    </Col>

                    <Col lg={2} className='text-center mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Input
                                name="detail"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.detail || ""}
                                invalid={
                                    formik.touched.detail && formik.errors.detail ? true : false
                                }
                            />
                            {formik.touched.detail && formik.errors.detail ? (
                                <FormFeedback type="invalid">{formik.errors.detail}</FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                    <Col lg={1} className='text-center mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Input
                                name="phone_number"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone_number || ""}
                                invalid={
                                    formik.touched.phone_number && formik.errors.phone_number ? true : false
                                }
                            />
                            {formik.touched.phone_number && formik.errors.phone_number ? (
                                <FormFeedback type="invalid">{formik.errors.phone_number}</FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                    <Col lg={1} className='text-center mt-2 fw-bold gx-2'>
                        <div className="mb-3">
                            <Input
                                name="fax"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fax || ""}
                                invalid={
                                    formik.touched.fax && formik.errors.fax ? true : false
                                }
                            />
                            {formik.touched.fax && formik.errors.fax ? (
                                <FormFeedback type="invalid">{formik.errors.fax}</FormFeedback>
                            ) : null}
                        </div>
                    </Col>
                    <Col lg={2} className='text-center mt-2 fw-bold gx-2'>
                        <div className=" d-flex gap-1">
                            <div>
                                <Input
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email || ""}
                                    invalid={
                                        formik.touched.email && formik.errors.email ? true : false
                                    }
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                ) : null}

                            </div>

                            <UncontrolledDropdown
                            >
                                <DropdownToggle color={formik.values.is_default ? 'success' : 'primary'} type="button">
                                    <i className="mdi mdi-chevron-down"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-md p-4">
                                    <Switch
                                        name='is_default'
                                        uncheckedIcon={<Offsymbol />}
                                        checkedIcon={<OnSymbol />}
                                        className="me-3 mb-sm-8"
                                        onColor="#626ed4"
                                        onChange={(value) => formik.setFieldValue('is_default', value)}
                                        checked={formik.values.is_default}
                                    />
                                    <Label>Đặt địa chỉ mặc định</Label>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>


                    </Col>

                </Row>
                <div className='border-bottom border-secondary-subtle border-opacity-50'></div>

            </div>
            {/* </Form> */}
        </>
    )
}

export default Address;