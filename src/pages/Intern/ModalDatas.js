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
  Card,
  Badge
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

const ModalDatas = ({ item, isEdit, modal_xlarge, setmodal_xlarge, tog_xlarge, dispatch, setApi, updateApi }) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: item !== null ? item.name : null,
      status_type: item !== null ? item.status_type : 'manual',
      colors: item !== null ? item.colors : null,
      condition_date: item !== null ? item.condition_date : null,
      condition_milestone: item !== null ? item.condition_milestone : null,
      condition_value: item !== null ? item.condition_value : null,
      description: item !== null ? item.description : null,
      create_at: item !== null ? item.create_at : null
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        "This value is required"
      ),
      status_type: Yup.string().required(
        "This value is required"
      ),
      colors: Yup.string().required(
        "This value is required"
      ),
      // condition_date: Yup.string().required(
      //   "This value is required"
      // ),
      // condition_milestone: Yup.string().required(
      //   "This value is required"
      // ),
      // condition_value: Yup.number().required(
      //   "Please Enter Your Number"
      // ),
      description: Yup.string().required(
        "This value is required"
      ),
    }),
  //   validate: (data) => {
  //     let errors = {};

  //     if (data.status_type == 'automatic') {
  //         if(data.condition_value) {
  //           errors.condition_value = 'City is required.';
  //         }
  //     }

  //     return errors;
  // },
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
      <Form
      >

      </Form>
    </>
  )
}

export default ModalDatas;