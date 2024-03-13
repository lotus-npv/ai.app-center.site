import React, { useRef, useState, useContext } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    CardTitle,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
    UncontrolledTooltip
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import avata from '../../assets/images/users/avatar-1.jpg'

// context
import DataContext from 'data/DataContext';

const optionGroup = [
    { label: "Mustard", value: "Mustard" },
    { label: "Ketchup", value: "Ketchup" },
    { label: "Relish", value: "Relish" }
];

const InputIntern = () => {
    document.title = "Depatching Company Input Page";
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            name_jp: '',
            name_en: '',
            jont_date: '',
            tax_code: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            name_jp: Yup.string().required(
                "This value is required"
            ),
            name_en: Yup.string().required(
                "This value is required"
            ),
            email: Yup.string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),
            jont_date: Yup.date().required(
                "Please select date"
            ),
            description: Yup.string().required(
                "Please Enter Your Textarea"
            ),
            tax_code: Yup.string().required(
                "Please Enter Your Tax code"
            ),
        }),
        onSubmit: (values) => {

        }
    });

    const back = () => {
        navigate(-1);
    }

    const { address, addressData, updateAddressData } = useContext(DataContext);

    const handleAddForm = () => {
        const count = addressData.length
        address['name'] = count;
        updateAddressData([...addressData, address])
    };

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

    const handleDeleteColumn = (getIndex) => {
        const arr = [...addressData];
        arr.splice(getIndex, 1);
        updateAddressData(arr);
    }

    console.log(addressData)

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title='' breadcrumbItem="Depatching Company Form" />
                    <div className="d-flex mb-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-success  w-sm"
                            onClick={back}
                        >
                            <i className="bx bx-arrow-back d-block font-size-24"></i>{" "}
                        </button>
                    </div>

                    <Form className="needs-validation"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            return false;
                        }}>
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>

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
                                                                name="name_jp"
                                                                placeholder="Nhập tên xí nghiệp (Tiếng Nhật)"
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.name_jp || ""}
                                                                invalid={
                                                                    formik.touched.name_jp && formik.errors.name_jp ? true : false
                                                                }
                                                            />
                                                            {formik.touched.name_jp && formik.errors.name_jp ? (
                                                                <FormFeedback type="invalid">{formik.errors.name_jp}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label>Tên xí nghiệp (Tiếng Anh)</Label>
                                                            <Input
                                                                name="name_en"
                                                                type="text"
                                                                placeholder="Nhập tên xí nghiệp (Tiếng Anh)"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.name_en || ""}
                                                                invalid={
                                                                    formik.touched.name_en && formik.errors.name_en ? true : false
                                                                }
                                                            />
                                                            {formik.touched.name_en && formik.errors.name_en ? (
                                                                <FormFeedback type="invalid">{formik.errors.name_en}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label className="form-label">Quốc gia</Label>
                                                            <Input
                                                                name="country"
                                                                placeholder="Nhập quốc gia"
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.tax_code || ""}
                                                                invalid={
                                                                    formik.touched.tax_code && formik.errors.tax_code ? true : false
                                                                }
                                                            />
                                                            {formik.touched.tax_code && formik.errors.tax_code ? (
                                                                <FormFeedback type="invalid">{formik.errors.tax_code}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <div className="mb-3">
                                                            <Label>Ngày gia nhập</Label>
                                                            <Input
                                                                name="jont_date"
                                                                type="date"
                                                                placeholder="Chọn ngày"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.jont_date || ""}
                                                                invalid={
                                                                    formik.touched.jont_date && formik.errors.jont_date ? true : false
                                                                }
                                                            />
                                                            {formik.touched.jont_date && formik.errors.jont_date ? (
                                                                <FormFeedback type="invalid">{formik.errors.jont_date}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col lg={3}>
                                                        <div className="mb-3">
                                                            <Label className="form-label">Mã số thuế</Label>
                                                            <Input
                                                                name="tax_code"
                                                                placeholder="Nhập mã số thuế"
                                                                type="text"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.tax_code || ""}
                                                                invalid={
                                                                    formik.touched.tax_code && formik.errors.tax_code ? true : false
                                                                }
                                                            />
                                                            {formik.touched.tax_code && formik.errors.tax_code ? (
                                                                <FormFeedback type="invalid">{formik.errors.tax_code}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="mt-2">
                                                            <Label>Ghi chú</Label>
                                                            <Input
                                                                name='description'
                                                                type="textarea"
                                                                id="textarea"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.description || ""}
                                                                maxLength="225"
                                                                rows="3"
                                                                placeholder="Nhập nội dung"
                                                                invalid={
                                                                    formik.touched.description && formik.errors.description ? true : false
                                                                }
                                                            />
                                                            {formik.touched.description && formik.errors.description ? (
                                                                <FormFeedback type="invalid">{formik.errors.description}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Row className='border border-secondary mt-3'>
                                            <div>
                                                <Row className='bg-secondary text-light'>
                                                    <Col lg={8}>
                                                        <Row>
                                                            <Col lg={2} className='text-center mt-2 fw-bold'>
                                                                <p>Quốc gia</p>
                                                            </Col>
                                                            <Col lg={2} className='text-center mt-2 fw-bold'>
                                                                <p>Tỉnh</p>
                                                            </Col>
                                                            <Col lg={2} className='text-center mt-2 fw-bold'>
                                                                <p>Quận/ Huyện</p>
                                                            </Col>
                                                            <Col lg={2} className='text-center mt-2 fw-bold'>
                                                                <p>Xã/ Phường</p>
                                                            </Col>
                                                            <Col lg={4} className='text-center mt-2 fw-bold'>
                                                                <p>Số nhà, đường, phố...</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col lg={1} className='text-center mt-2 fw-bold'>
                                                        <p>Số điện thoại</p>
                                                    </Col>
                                                    <Col lg={1} className='text-center mt-2 fw-bold'>
                                                        <p>Fax</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <Row>
                                                            <Col lg={8}>
                                                                <p>Email</p>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <p>Mặc định</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>

                                            {addressData.map((_, index) => {
                                                return (
                                                    <Row className='mt-2' key={index}>
                                                        <Col lg={8}>
                                                            <Row>
                                                                <Col lg={2} className='mt-2 fw-bold '>
                                                                    <div className="mb-3">
                                                                        <Select
                                                                            name='country'
                                                                            placeholder='Quốc gia'
                                                                            value={optionGroup.find(option => option.value === formik.values.province)}
                                                                            onChange={(item) => {
                                                                                formik.setFieldValue('province', item == null ? null : item.value);
                                                                            }}
                                                                            options={optionGroup}
                                                                        // isClearable
                                                                        />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={2} className='mt-2 fw-bold '>
                                                                    <div className="mb-3">
                                                                        <Select
                                                                            name='province'
                                                                            placeholder='Tỉnh'
                                                                            value={optionGroup.find(option => option.value === formik.values.province)}
                                                                            onChange={(item) => {
                                                                                formik.setFieldValue('province', item == null ? null : item.value);
                                                                            }}
                                                                            options={optionGroup}
                                                                        // isClearable
                                                                        />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={2} className='mt-2 fw-bold '>
                                                                    <div className="mb-3">
                                                                        <Select
                                                                            name='district'
                                                                            placeholder='Quận/Huyện'
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

                                                                <Col lg={2} className='mt-2 fw-bold '>
                                                                    <div className="mb-3">
                                                                        <Select
                                                                            name='commune'
                                                                            placeholder='Xã/Phường'
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

                                                                <Col lg={4} className='mt-2 fw-bold'>
                                                                    <div className="mb-3">
                                                                        <Input
                                                                            name="detail"
                                                                            type="text"
                                                                            placeholder='Số nhà, đường, phố...'
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
                                                            </Row>
                                                        </Col>

                                                        <Col lg={1} className='mt-2 fw-bold'>
                                                            <div className="mb-3">
                                                                <Input
                                                                    name="phone_number"
                                                                    type="text"
                                                                    placeholder='Điện thoại'
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
                                                        <Col lg={1} className='mt-2 fw-bold'>
                                                            <div className="mb-3">
                                                                <Input
                                                                    name="fax"
                                                                    type="text"
                                                                    placeholder='Fax'
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
                                                        <Col lg={2} className='mt-2'>
                                                            <Row>
                                                                <Col lg={9} className='text-center fw-bold gx-1'>
                                                                    <div className=" d-flex gap-1">
                                                                        <div>
                                                                            <Input
                                                                                name="email"
                                                                                type="email"
                                                                                placeholder='Email'
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
                                                                    </div>
                                                                </Col>
                                                                <Col lg={3} className='d-flex justify-content-center gap-2'>
                                                                    <div className='ms-2'>
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="exampleRadios"
                                                                            id={`radio-${index}`}
                                                                            value="option1"
                                                                            style={{ marginTop: '12px' }}
                                                                        />
                                                                        <UncontrolledTooltip placement="top" target={`radio-${index}`}>
                                                                            Đặt làm mặc định
                                                                        </UncontrolledTooltip>
                                                                    </div>
                                                                    <Link
                                                                        to="#"
                                                                        className="text-danger"
                                                                        onClick={() => {
                                                                            handleDeleteColumn(index);
                                                                        }}
                                                                    >
                                                                        <i className="mdi mdi-delete font-size-24" id="deletetooltip" />
                                                                        <UncontrolledTooltip placement="top" target="deletetooltip">
                                                                            Delete
                                                                        </UncontrolledTooltip>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                )
                                            })}
                                            <Row className='mb-2 mt-2'>
                                                <Col lg={6} className='d-flex gap-2'>
                                                    <Button onClick={handleAddForm} color="secondary" >
                                                        Add Address
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex flex-wrap justify-content-end gap-2 mt-2">
                            <Button type="submit" color="primary" >
                                Submit
                            </Button>{" "}
                            <Button type="reset" color="secondary" >
                                Cancel
                            </Button>
                        </div>

                    </Form>

                </Container>
            </div>
        </>
    );
}

export default InputIntern;