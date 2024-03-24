import React, { useState, useEffect } from 'react';
import { Modal, Label, Input, FormFeedback, Form, Button } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const ModalDatas = ({ item, isEdit, modal_xlarge, setmodal_xlarge, tog_xlarge, dispatch,setApi, updateApi }) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item !== null ? item.id : '',
      name: item !== null ? item.name : '',
      description: item !== null ? item.description : '',
      create_at: item !== null ? item.create_at : '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        "Please Enter Content"
      ),
      description: Yup.string().required(
        "Please Enter Content"
      ),
    }),
    onSubmit: async (value) => {

      if(isEdit) {
        let obj = {
          id: value.id,
          key_license_id: 1,
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
          key_license_id: 1,
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

  // console.log(formik.values)

  return (
    <>
      <Form
      >
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
            <div className="mb-4">
              <Label className="form-label">Tên ngành nghề</Label>
              <Input
                name="name"
                placeholder="Nhập tên ngành nghề"
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

            <div className="mb-4">
              <Label className="form-label">Ghi chú</Label>
              <Input
                name="description"
                placeholder="Nhập ghi chú"
                type="text"
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
            <Button  color="primary" onClick={handleSubmit}>
              Save changes
            </Button>
          </div>
        </Modal>
      </Form>
    </>
  )
}

export default ModalDatas;