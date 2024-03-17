import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Modal,
  CardBody,
  Card
} from "reactstrap";

import Switch from "react-switch";
import Select from "react-select";

import * as Yup from "yup";
import { useFormik } from "formik";


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

const optionConditionDate = [
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
];

const optionConditionMilestone = [
  { label: "Ngày nhập cảnh", value: "Ngày nhập cảnh" },
  { label: "Ngày hết hạn tư cách lưu trú", value: "Ngày hết hạn tư cách lưu trú" },
  { label: "Ngày sinh nhật", value: "Ngày sinh nhật" }
];

const ModalDatas = ({ item, isEdit, modal_xlarge, setmodal_xlarge, tog_xlarge, dispatch, setApi, updateApi }) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item !== null ? item.name : '',
      status_type: item !== null ? item.status_type : 'manual',
      color: item !== null ? item.color : '',
      condition_date: item !== null ? item.condition_date : '',
      condition_milestone: item !== null ? item.condition_milestone : '',
      condition_value: item !== null ? item.condition_value : '',
      description: item !== null ? item.description : '',
      create_at: item !== null ? item.create_at : ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        "This value is required"
      ),
      status_type: Yup.string().required(
        "This value is required"
      ),
      color: Yup.string().required(
        "This value is required"
      ),
      condition_date: Yup.string().required(
        "This value is required"
      ),
      condition_milestone: Yup.string().required(
        "This value is required"
      ),
      condition_value: Yup.number().required(
        "Please Enter Your Number"
      ),
      description: Yup.string().required(
        "This value is required"
      ),
    }),
    onSubmit: async (value) => {

      if (isEdit) {
        let obj = {
          id: value.id,
          key_license_id: 1,
          color: value.color,
          status_type: value.status_type, // Có thể chỉ nhận giá trị 'manual' hoặc 'automatic'
          name: value.name,
          condition_date: value.condition_date.value,
          condition_milestone: value.condition_milestone.value,
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
          color: value.color,
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

  const [isAuto, setIsAuto] = useState(formik.values.status_type == 'automatic' ? true : false)

  useEffect(() => {
    isAuto ? formik.setFieldValue('status_type', 'automatic') : formik.setFieldValue('status_type', 'manual');
  }, [isAuto])

  console.log(formik.values)

  return (
    <>
      <Form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   formik.handleSubmit();
      //   return false;
      // }}
      >
        <Card>
          <CardBody>
            <Modal className="needs-validation"
              size="xl"
              isOpen={modal_xlarge}
              toggle={() => {
                tog_xlarge();
              }}
            >
              <div className="modal-header">
                <h5
                  className="modal-title mt-0"
                  id="myExtraLargeModalLabel"
                >
                  {isEdit ? 'Edit Status' : 'Add new Status'}
                </h5>
                <button
                  onClick={() => {
                    setmodal_xlarge(false);
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
                <div className="mb-3">
                  <Label className="form-label">Tên trạng thái</Label>
                  <Input
                    name="name"
                    placeholder="Nhập tên trạng thái"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name || ""}
                    invalid={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label>Ghi chú</Label>
                  <Input
                    name="description"
                    type="text"
                    autoComplete="off"
                    placeholder="Nhập ghi chú"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description || ""}
                    invalid={
                      formik.touched.description && formik.errors.description ? true : false
                    }
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormFeedback type="invalid">{formik.errors.description}</FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Switch
                    name='status_type'
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    className="me-3 mb-sm-8"
                    onColor="#626ed4"
                    onChange={(value) => { setIsAuto(value) }}
                    checked={isAuto}
                  />
                  <Label>{isAuto ? 'Trạng thái tự động' : 'Trạng thái thủ công'}</Label>
                </div>

                {isAuto && <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label>Điều kiện</Label>
                      <Select
                      name='condition_date'
                        value={optionConditionDate.find((item) => item.value === formik.values.condition_date)}
                        onChange={(item) => {
                          console.log(item.value)
                          formik.setFieldValue('condition_date', item.value);
                        }}
                        options={optionConditionDate}
                        className="select2-selection"
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label>Mốc thời gian</Label>
                      <Select
                      name='condition_milestone'
                        value={formik.values.condition_milestone}
                        onChange={(item) => {
                          formik.setFieldValue('condition_milestone', item.value);
                        }}
                        options={optionConditionMilestone}
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
                </Row>}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    tog_xlarge();
                  }}
                  className="btn btn-secondary "
                  data-dismiss="modal"
                >
                  Close
                </button>
                <Button color="primary" onClick={handleSubmit}>
                  Save changes
                </Button>
              </div>
            </Modal>
          </CardBody>
        </Card>
      </Form>
    </>
  )
}

export default ModalDatas;