import React, { useState, useEffect } from 'react';
import { Modal, Label, Input } from "reactstrap";

const ModalDatas = ({ item, isEdit, modal_xlarge,setmodal_xlarge, tog_xlarge }) => {
  console.log(item)

  return (
    <>
      <Modal
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
            <Label htmlFor="name">Tên ngành nghề</Label>
            <Input
              id='name'
              name="name"
              type="text"
              // value={rowSelect != null ? rowSelect.name : ''}
              onChange={(e) => {
                // setRowSelect({ ...rowSelect, name: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="note">Ghi chú</Label>
            <Input
              id='note'
              name="note"
              type="text"
              // value={rowSelect != null ? rowSelect.description : ''}
              onChange={(e) => {
                // setRowSelect({ ...rowSelect, description: e.target.value });
              }}
            />
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
          <button
            type="button"
            className="btn btn-primary "
            onClick={() => {
              // dispatch(updateCareer(rowSelect));
              tog_xlarge();
            }}
          >
            Save changes
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalDatas;