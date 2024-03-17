import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Modal
} from "reactstrap";

import Switch from "react-switch";
import Select from "react-select";

import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getStatusAll, updateStatus, deleteStatus } from "store/actions";

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

const ModalDatas = ({ item, isEdit, modal_xlarge, setmodal_xlarge, tog_xlarge, dispatch, setApi, updateApi }) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item.name,
      note: item.description,
      auto: item.status_type == 'manual' ? false : true,
      condition: item.condition_milestone,
      condition_date: item.condition_date,
      number: item.condition_value,
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
    onSubmit: async (value) => {

      if (isEdit) {
        let obj = {
          id: value.id,
          syndication_id: 1,
          name: value.name,
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
          syndication_id: 1,
          name: value.name,
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

      tog_xlarge();
    }
  });

  const handleSubmit = () => {
    console.log('submit');
    formik.handleSubmit();
  }

  console.log(formik.values)

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
          return false;
        }}>

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
              {isEdit ? 'Edit Career' : 'Add new Career'}
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
                placeholder="Type Something"
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
                name="note"
                type="text"
                autoComplete="off"
                placeholder="note some thing"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note || ""}
                invalid={
                  formik.touched.note && formik.errors.note ? true : false
                }
              />
              {formik.touched.note && formik.errors.note ? (
                <FormFeedback type="invalid">{formik.errors.note}</FormFeedback>
              ) : null}
            </div>

            <div className="mb-3">
              <Switch
                name='auto'
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                className="me-3 mb-sm-8"
                onColor="#626ed4"
                onChange={(value) => formik.setFieldValue('auto', value)}
                checked={formik.values.auto}
              />
              <Label>Tự động thêm trạng thái</Label>
            </div>

            {formik.values.auto && <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label>Điều kiện</Label>
                  <Select
                    value={formik.values.condition}
                    onChange={(val) => {
                      formik.setFieldValue('condition', val);
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
      </Form>
    </>
  )
}

export default ModalDatas;