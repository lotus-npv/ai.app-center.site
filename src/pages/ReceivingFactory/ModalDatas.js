import React, { useState, useEffect, useContext, useRef } from 'react';
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
  UncontrolledTooltip,
  Modal
} from "reactstrap";

import Switch from "react-switch";
import Select from "react-select";
import { Link, Route, useNavigate } from "react-router-dom";


import * as Yup from "yup";
import { useFormik } from "formik";

// import context
import DataContext from "../../data/DataContext";
import avata from '../../assets/images/users/avatar-1.jpg'
import { add } from 'lodash';


const optionGroup = [
  { label: "Mustard", value: "Mustard" },
  { label: "Ketchup", value: "Ketchup" },
  { label: "Relish", value: "Relish" }
];

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getProvinceByNationId } from "store/actions";

const ModalDatas = ({ item, dispatch, setApi, updateApi }) => {

  // data context
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen, isEdit, setIsEdit, addressFactory, addressDataFactory, updateAddressDataFactory, } = useContext(DataContext);

  const {provinceDataByNationId} = useSelector(state => (
    {
      provinceDataByNationId: state.Province.dataByNationId,
    }
  ))

  useEffect(() => {
    dispatch(getProvinceByNationId(1));
  }, [dispatch])


  console.log('provinceDataByNationId:', provinceDataByNationId);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item != null ? item.id : '',
      logo: item != null ? item.logo : '',
      name_jp: item != null ? item.name_jp : '',
      name_en: item != null ? item.name_en : '',
      tax_code: item != null ? item.tax_code : '',
      date_of_joining_syndication: item != null ? item.date_of_joining_syndication : '',
      description: item !== null ? item.description : '',
      create_at: item !== null ? item.create_at : '',

      // description_address: "",
    },
    validationSchema: Yup.object().shape({
      name_jp: Yup.string().required(
        "This value is required"
      ),
      name_en: Yup.string().required(
        "This value is required"
      ),
      date_of_joining_syndication: Yup.date().required(
        "Please select date"
      ),
      description: Yup.string().required(
        "Please Enter Your Textarea"
      ),
      tax_code: Yup.string().required(
        "Please Enter Your Tax code"
      ),
      // description_address: Yup.string().required(
      //   "Please Enter Your Textarea"
      // ),
      // email: Yup.string()
      //   .email("Must be a valid Email")
      //   .max(255)
      //   .required("Email is required"),
    }),

    onSubmit: async (value) => {

      if (isEdit) {
        let obj = {
          id: value.id,
          key_license_id: 1,
          syndication_id: 1,
          logo: './fff/ff', // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
          name_jp: value.name_jp,
          name_en: value.name_en,
          tax_code: value.tax_code,
          date_of_joining_syndication: value.date_of_joining_syndication,
          description: value.description,
          create_at: value.create_at,
          create_by: 1,
          update_at: null,
          update_by: 1,
          delete_at: null,
          flag: 1
        }
        dispatch(updateApi(obj));
      } else {
        let obj = {
          key_license_id: 1,
          syndication_id: 1,
          logo: './fff/ff', // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
          name_jp: value.name_jp,
          name_en: value.name_en,
          tax_code: value.tax_code,
          date_of_joining_syndication: value.date_of_joining_syndication,
          description: value.description,
          create_at: null,
          create_by: 1,
          update_at: null,
          update_by: 1,
          delete_at: null,
          flag: 1
        }
        dispatch(setApi(obj));
      }
      formik.resetForm();
      console.log('submit done');
      tog_fullscreen();
    }
  });

  const formilkAddress = useFormik({
    initialValues: {

    },
    validationSchema: {

    },
    onSubmit: async (values) => {

    }
  })

  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();
  }

  // xu ly form address
  const handleAddForm = () => {
    updateAddressDataFactory([...addressDataFactory, addressFactory])
  };

  const handleDeleteColumn = (getIndex) => {
    const arr = [...addressDataFactory];
    arr.splice(getIndex, 1);
    updateAddressDataFactory(arr);
  }

  // xu ly form nhap anh
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



  // console.log('addressData:', addressDataFactory)
  // console.log('data:', formik.values)


  return (
    <>
        <Modal
          size="xl"
          isOpen={modal_fullscreen}
          toggle={() => {
            tog_fullscreen();
          }}
          className="modal-fullscreen"
        >
          <div className="modal-header">
            <h5
              className="modal-title mt-0"
              id="exampleModalFullscreenLabel"
            >
              {isEdit ? `Chỉnh sửa xí nghiệp` : 'Thêm xí nghiệp'}
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false);
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {/* <Form> */}
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>

                    <Form>
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
                                <Label>Ngày gia nhập</Label>
                                <Input
                                  name="date_of_joining_syndication"
                                  type="date"
                                  placeholder="Chọn ngày"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.date_of_joining_syndication || ""}
                                  invalid={
                                    formik.touched.date_of_joining_syndication && formik.errors.date_of_joining_syndication ? true : false
                                  }
                                />
                                {formik.touched.date_of_joining_syndication && formik.errors.date_of_joining_syndication ? (
                                  <FormFeedback type="invalid">{formik.errors.date_of_joining_syndication}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
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
                    {/* </Form> */}


                    {/* <Form> */}
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

                        {addressDataFactory.map((address, index) => {
                          return (
                            <Row className='mt-2' key={index} id={"nested" + index}>
                              <Col lg={8}>
                                <Row>
                                  <Col lg={2} className='mt-2 fw-bold '>
                                    <div className="mb-3">
                                      <Input
                                        name="description_address"
                                        type="text"
                                        placeholder='Branch name'
                                        onChange={(e) => {
                                          const arr = [...addressDataFactory];
                                          arr[index] = { ...arr[index], description: e.target.value }
                                          updateAddressDataFactory(arr);
                                        }}
                                        onBlur={formilkAddress.handleBlur}
                                        value={address.description}
                                        invalid={
                                          formilkAddress.touched.detail && formilkAddress.errors.detail ? true : false
                                        }
                                      />
                                      {formilkAddress.touched.detail && formilkAddress.errors.detail ? (
                                        <FormFeedback type="invalid">{formilkAddress.errors.detail}</FormFeedback>
                                      ) : null}
                                    </div>
                                  </Col>

                                  <Col lg={2} className='mt-2 fw-bold '>
                                    <div className="mb-3">
                                      <Select
                                        name='province'
                                        placeholder='Tỉnh'
                                        value={optionGroup.find(option => option.value === formilkAddress.values.province)}
                                        onChange={(item) => {
                                          formilkAddress.setFieldValue('province', item == null ? null : item.value);
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
                                        value={optionGroup.find(option => option.value === formilkAddress.values.district)}
                                        onChange={(item) => {
                                          formilkAddress.setFieldValue('district', item == null ? null : item.value);
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
                                        value={optionGroup.find(option => option.value === formilkAddress.values.commune)}
                                        onChange={(item) => {
                                          formilkAddress.setFieldValue('commune', item == null ? null : item.value);
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
                                        onChange={formilkAddress.handleChange}
                                        onBlur={formilkAddress.handleBlur}
                                        value={formilkAddress.values.detail || ""}
                                        invalid={
                                          formilkAddress.touched.detail && formilkAddress.errors.detail ? true : false
                                        }
                                      />
                                      {formilkAddress.touched.detail && formilkAddress.errors.detail ? (
                                        <FormFeedback type="invalid">{formilkAddress.errors.detail}</FormFeedback>
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
                                    onChange={formilkAddress.handleChange}
                                    onBlur={formilkAddress.handleBlur}
                                    value={formilkAddress.values.phone_number || ""}
                                    invalid={
                                      formilkAddress.touched.phone_number && formilkAddress.errors.phone_number ? true : false
                                    }
                                  />
                                  {formilkAddress.touched.phone_number && formilkAddress.errors.phone_number ? (
                                    <FormFeedback type="invalid">{formilkAddress.errors.phone_number}</FormFeedback>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg={1} className='mt-2 fw-bold'>
                                <div className="mb-3">
                                  <Input
                                    name="fax"
                                    type="text"
                                    placeholder='Fax'
                                    onChange={formilkAddress.handleChange}
                                    onBlur={formilkAddress.handleBlur}
                                    value={formilkAddress.values.fax || ""}
                                    invalid={
                                      formilkAddress.touched.fax && formilkAddress.errors.fax ? true : false
                                    }
                                  />
                                  {formilkAddress.touched.fax && formilkAddress.errors.fax ? (
                                    <FormFeedback type="invalid">{formilkAddress.errors.fax}</FormFeedback>
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
                                          onChange={formilkAddress.handleChange}
                                          onBlur={formilkAddress.handleBlur}
                                          value={formilkAddress.values.email || ""}
                                          invalid={
                                            formilkAddress.touched.email && formilkAddress.errors.email ? true : false
                                          }
                                        />
                                        {formilkAddress.touched.email && formilkAddress.errors.email ? (
                                          <FormFeedback type="invalid">{formilkAddress.errors.email}</FormFeedback>
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
                              <i className="mdi mdi-plus font-size-18" id="deletetooltip" />
                            </Button>
                          </Col>
                        </Row>
                      </Row>
                    </Form>

                  </CardBody>
                </Card>
              </Col>
            </Row>

          </div>


          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_fullscreen();
                formik.resetForm();
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary "
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </Modal>
    </>
  )
}

export default ModalDatas;