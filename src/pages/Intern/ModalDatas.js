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


const optionGroup = [
  { label: "Mustard", value: "Mustard" },
  { label: "Ketchup", value: "Ketchup" },
  { label: "Relish", value: "Relish" }
];

const ModalDatas = ({ item, dispatch, setApi, updateApi }) => {

  // data context
  const { modal_fullscreen, setmodal_fullscreen, tog_fullscreen, setIsEdit, isEdit , addressIntern,addressDataIntern,updateAddressDataIntern,} = useContext(DataContext)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

    },
    validationSchema: Yup.object().shape({

    }),

    onSubmit: async (value) => {

      if (isEdit) {
        let obj = {
          id: value.id,
          key_license_id: 1,
          colors: value.colors,
          status_type: value.status_type, // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
          name: value.name,
          condition_date: value.condition_date,
          condition_milestone: value.condition_milestone,
          condition_value: value.condition_value,
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
          colors: value.colors,
          status_type: value.status_type, // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
          name: value.name,
          condition_date: value.condition_date,
          condition_milestone: value.condition_milestone,
          condition_value: value.condition_value,
          description: value.description,
          create_at: value.create_at,
          create_by: 1,
          update_at: null,
          update_by: 1,
          delete_at: null,
          flag: 1
        }
        dispatch(setApi(obj));
      }
      formik.resetForm();
      tog_xlarge();
    }
  });

  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();
  }

  // xu ly address intern
  const handleAddForm = () => {
      updateAddressDataIntern([...addressDataIntern, addressIntern])
  };

  const handleDeleteColumn = (getIndex) => {
    const arr = [...addressDataIntern];
    arr.splice(getIndex, 1);
    updateAddressDataIntern(arr);
}

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
      <Form>
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
              {isEdit ? 'Sửa thông tin' : 'Thêm thực tập sinh'}
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
            <Form>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row >
                        <Col lg={2} xl={2}>
                          <Card
                            style={{ width: '90%' }}
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
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Input
                                  name="password1"
                                  type="text"
                                  autoComplete="off"
                                  placeholder="Họ (En)"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.password1 || ""}
                                  invalid={
                                    formik.touched.password1 && formik.errors.password1 ? true : false
                                  }
                                />
                                {formik.touched.password1 && formik.errors.password1 ? (
                                  <FormFeedback type="invalid">{formik.errors.password1}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={4} className='gx-1'>
                              <div className="mb-3">
                                <Label>Tên đệm</Label>
                                <Input
                                  name="password"
                                  type="text"
                                  autoComplete="off"
                                  placeholder="Tên đệm"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.password || ""}
                                  invalid={
                                    formik.touched.password && formik.errors.password ? true : false
                                  }
                                />
                                {formik.touched.password && formik.errors.password ? (
                                  <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Input
                                  name="email"
                                  placeholder="Tên đệm (En)"
                                  type="text"
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
                            </Col>
                            <Col lg={4} className='gx-1'>
                              <div className="mb-3">
                                <Label>Tên</Label>
                                <Input
                                  name="password"
                                  type="text"
                                  autoComplete="off"
                                  placeholder="Tên"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.password || ""}
                                  invalid={
                                    formik.touched.password && formik.errors.password ? true : false
                                  }
                                />
                                {formik.touched.password && formik.errors.password ? (
                                  <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Input
                                  name="number"
                                  placeholder="Tên (En)"
                                  type="text"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.number || ""}
                                  invalid={
                                    formik.touched.number && formik.errors.number ? true : false
                                  }
                                />
                                {formik.touched.number && formik.errors.number ? (
                                  <FormFeedback type="invalid">{formik.errors.number}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Quốc gia</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn quốc gia'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
                              </div>
                            </Col>
                            <Col lg={4} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Giới tính</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn giới tính'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
                              </div>
                            </Col>
                            <Col lg={4} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Ngày sinh</Label>
                                <Input
                                  name="username"
                                  placeholder="Type Something"
                                  type="date"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
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
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
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
                                  type="date"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Ngày hết hạn</Label>
                                <Input
                                  name="username"
                                  placeholder="Type Something"
                                  type="date"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
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
                                <Label className="form-label">Công ty phái cử</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn công ty phái cử'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
                              </div>
                            </Col>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Xí nghiệp tiếp nhận</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn xí nghiệp tiếp nhận'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Số thẻ ngoại kiều</Label>
                                <Input
                                  name="username"
                                  placeholder="Nhập số thẻ ngoại kiều"
                                  type="text"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Tư cách lưu trú</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn tư cách lưu trú'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
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
                                  type="date"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username || ""}
                                  invalid={
                                    formik.touched.username && formik.errors.username ? true : false
                                  }
                                />
                                {formik.touched.username && formik.errors.username ? (
                                  <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label>Ngày hết hạn</Label>
                                <Input
                                  name="password"
                                  type="date"
                                  autoComplete="off"
                                  placeholder="Password"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.password || ""}
                                  invalid={
                                    formik.touched.password && formik.errors.password ? true : false
                                  }
                                />
                                {formik.touched.password && formik.errors.password ? (
                                  <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Trạng thái</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn trạng thái'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
                              </div>
                            </Col>
                            <Col lg={6} className='gx-1'>
                              <div className="mb-3">
                                <Label className="form-label">Ngành nghề</Label>
                                <Select
                                  name='province'
                                  placeholder='Chọn ngành nghề'
                                  value={optionGroup.find(option => option.value === formik.values.province)}
                                  onChange={(item) => {
                                    formik.setFieldValue('province', item == null ? null : item.value);
                                  }}
                                  options={optionGroup}
                                // isClearable
                                />
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
                                  placeholder="Nhập ghi chú"
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

                      <Row className='border border-secondary mt-3'>
                        <div>
                          <Row className='bg-secondary text-light'>
                            <Col lg={2} className='text-center mt-2 fw-bold'>
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

                        {/* {addressData.map((_, index) => {
                                                return <Address key={index} getIndex={index} />
                                            })} */}

                        {addressDataIntern.map((_, index) => {
                          return (
                            <Row className='mt-2' key={index}>
                              <Col lg={2} className='mt-2 fw-bold '>
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

                              <Col lg={2} className='mt-2 fw-bold '>
                                <div className="mb-3">
                                  <Select
                                    name='district'
                                    placeholder='Chọn quận/huyện'
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
                                    placeholder='Chọn xã/phường'
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

                              <Col lg={2} className='mt-2 fw-bold'>
                                <div className="mb-3">
                                  <Input
                                    name="detail"
                                    type="text"
                                    placeholder='Nhập chi tiết'
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
                              <Col lg={1} className='mt-2 fw-bold'>
                                <div className="mb-3">
                                  <Input
                                    name="phone_number"
                                    type="text"
                                    placeholder='Nhập số điện thoại'
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
                                    placeholder='Nhập fax'
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
                                  <Col lg={8} className='text-center fw-bold gx-1'>
                                    <div className=" d-flex gap-1">
                                      <div>
                                        <Input
                                          name="email"
                                          type="email"
                                          placeholder='Nhập email'
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
                                  <Col lg={4} className='d-flex justify-content-center gap-2'>
                                    <div className='ms-4'>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios1"
                                        value="option1"
                                        style={{ marginTop: '12px' }}
                                      />
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
              {/* <div className="d-flex flex-wrap justify-content-end gap-2 mt-2">
                <Button type="submit" color="primary" >
                  Submit
                </Button>{" "}
                <Button type="reset" color="secondary" >
                  Cancel
                </Button>
              </div> */}

            </Form>

          </div>


          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_fullscreen();
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary "
            >
              Save changes
            </button>
          </div>
        </Modal>
      </Form>
    </>
  )
}

export default ModalDatas;