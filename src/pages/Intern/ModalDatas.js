import React, { useState, useEffect } from 'react';
import {
  Form,
  Modal,
  CardBody,
  Card,
  Badge,
  CardTitle
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

const optionColor = [
  {
    label: <Badge className="font-size-12 badge-soft-success" >
      success
    </Badge>
    , value: "success"
  },
  {
    label: <Badge className="font-size-12 badge-soft-danger">
      danger
    </Badge>, value: "danger"
  },
  {
    label: <Badge className="font-size-12 badge-soft-warning">
      warning
    </Badge>, value: "warning"
  },
];

const optionConditionMilestone = [
  { label: "Ngày nhập cảnh", value: "Ngày nhập cảnh" },
  { label: "Ngày hết hạn tư cách lưu trú", value: "Ngày hết hạn tư cách lưu trú" },
  { label: "Ngày sinh nhật", value: "Ngày sinh nhật" }
];

const ModalDatas = ({ item, isEdit, modal_fullscreen, setmodal_fullscreen, tog_fullscreen, dispatch, setApi, updateApi }) => {

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

  const [isAuto, setIsAuto] = useState(formik.values.status_type == 'automatic' ? true : false)

  useEffect(() => {
    isAuto ? formik.setFieldValue('status_type', 'automatic') : formik.setFieldValue('status_type', 'manual');
  }, [isAuto])


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
              Fullscreen Modal
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
            <h5>Overflowing text to show scroll behavior</h5>
            <p>Cras mattis consectetur purus sit amet fermentum.
              Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.</p>
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