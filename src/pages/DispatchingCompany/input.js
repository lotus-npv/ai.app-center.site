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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DispatchingConpanyInput from './DispatchingConpanyInput';
import Address from './AddressInput';
import FormMask from 'pages/Forms/FormMask';

const InputDispatchingConpany = () => {
    document.title = "Dispatching Company Input Page";
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }

    const [formCount, setFormCount] = useState(1);

    const handleAddForm = () => {
        setFormCount((prevCount) => prevCount + 1);
    };

    const handleRemoveForm = () => {
        if (formCount > 1) {
            setFormCount((prevCount) => prevCount - 1);
        }
    };

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
                    <Form>
                        
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    


                                        <DispatchingConpanyInput />
                                        <Row className='border border-secondary'>
                                            <div>
                                                <Row className='bg-secondary text-light'>
                                                    <Col lg={1} className='text-center mt-2 fw-bold'>
                                                        <p>Tỉnh</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <p>Quận/ Huyện</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <p>Xã/ Phường</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <p>Số nhà, đường, phố...</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <p>Số điện thoại</p>
                                                    </Col>
                                                    <Col lg={1} className='text-center mt-2 fw-bold'>
                                                        <p>Fax</p>
                                                    </Col>
                                                    <Col lg={2} className='text-center mt-2 fw-bold'>
                                                        <p>Email</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {[...Array(formCount)].map((_, index) => (
                                                <Address key={index} />
                                            ))}
                                            <Row className='mb-2'>
                                                <Col lg={6} className='d-flex gap-2'>
                                                    <Button onClick={handleAddForm} color="secondary" >
                                                        Add Address
                                                    </Button>
                                                    <Button onClick={handleRemoveForm} color="secondary" >
                                                        Remove Address
                                                    </Button>
                                                </Col>

                                            </Row>
                                        </Row>
                                    
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2 mt-2">
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

export default InputDispatchingConpany;