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
import axios from 'axios';

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setCareer } from "store/actions";

const InputCareer = () => {
    document.title = "Career Page";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationType = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(
                "This value is required"
            ),
            description: Yup.string().required(
                "Please Enter Your Textarea"
            ),
        }),
        onSubmit: (value) => {

            const obj = {
                syndication_id: 1,
                name: value.name,
                description: value.description,
                create_at: '',
                create_by: 1,
                update_at: '',
                update_by: 1,
                delete_at: '',
                flag: 1
            }

            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // axios
            //     .post("http://api.lotusocean-jp.com/api/career/insert",
            //         {
            //             syndication_id: 1,
            //             name: value.name,
            //             description: value.description,
            //             create_at: '',
            //             create_by: 1,
            //             update_at: '',
            //             update_by: 1,
            //             delete_at: '',
            //             flag: 1
            //         },
            //         config
            //     ).then((response) => {
            //         console.log("Du lieu đã được thêm:", response.data);
            //     })
            //     .catch((error) => {
            //         console.error("Lỗi khi thêm du lieu:", error);
            //     });

            // console.log(obj);
            // dispatch(setCareer(obj));

            try {
                let response = axios
                    .post("http://api.lotusocean-jp.com/api/career/insert",
                        {
                            syndication_id: 1,
                            name: value.name,
                            description: value.description,
                            create_at: '',
                            create_by: 1,
                            update_at: '',
                            update_by: 1,
                            delete_at: '',
                            flag: 1
                        },
                        config
                    );
                console.log("Upload success:", response.data);
            } catch (error) {
                console.error("Upload failed:", error);
            }

            // try {
            //     const formData = new FormData();
            //     formData.append("syndication_id", 1001);
            //     formData.append("name", value.name);
            //     formData.append("description", value.description);
            //     formData.append("create_at", 1);
            //     formData.append("create_by", 1);
            //     formData.append("update_at", '');
            //     formData.append("update_by", 1);
            //     formData.append("delete_at", '');
            //     formData.append("flag", "1");

            //     console.log(formData);
            //     const response = await axios.post("http://api.lotusocean-jp.com/api/career/insert", formData, {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //         },
            //     });
            //     console.log("Upload success:", response.data);
            // } catch (error) {
            //     console.error("Upload failed:", error);
            // }

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
                                                placeholder="Nhập tên"
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
                                                name="description"
                                                placeholder="Nhập ghi chú"
                                                type="text"
                                                onChange={validationType.handleChange}
                                                onBlur={validationType.handleBlur}
                                                value={validationType.values.description || ""}
                                                invalid={
                                                    validationType.touched.description && validationType.errors.description ? true : false
                                                }
                                            />
                                            {validationType.touched.description && validationType.errors.description ? (
                                                <FormFeedback type="invalid">{validationType.errors.description}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="d-flex flex-wrap gap-2 justify-content-end">
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