import React, { useMemo, useState, useEffect, useContext } from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  Label,
  Input,
} from "reactstrap"

import Select from "react-select"
//Import Flatepicker
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"

import { useTranslation } from "react-i18next"
import { toast } from "react-toastify";

// import context
import DataContext from "../../data/DataContext"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"

// Tao doi luong luu bang chi tiet trang thai

const statusDetailObj = {
  key_license_id: null,
  intern_id: null,
  status_id: null,
  description: null,
  create_at: 1,
  create_by: null,
  update_at: null,
  update_by: 1,
  delete_at: null,
  flag: 1,
}

//--------------------------------------------------------------------------------------------------------------//

const ModalTop = ({
  setStatusDetailApi,
  statusApidata,
  statusOfResidenceApiData,
  violateTypeApiData,
  internApiData,
  statusDetailApiData,
}) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  // --------------------------------------------------
  // Modal top
  const [isUpdateStatus, setIsUpdateStatus] = useState(false)

  // edit status
  const [status, setStatus] = useState("")
  // --------------------------------------------------

  // theo doi lua chon status
  const [selectedMultiStatus, setselectedMultiStatus] = useState([])
  function handleMulti(selectedMultiStatus) {
    setselectedMultiStatus(selectedMultiStatus)
  }

  const [selectStatusOfResidence, setSelectStatusOfResidence] = useState(null)

  // data context
  const {
    tog_fullscreen,
    setIsEditIntern,
    tog_standard,
    modal_standard,
    setmodal_standard,
    modal_xlarge,
    tog_xlarge,
    setmodal_xlarge,
    rowsSelectedInternData,
    setRowSelectedInternData,
  } = useContext(DataContext)

  //   console.log("rowsSelectedInternData", rowsSelectedInternData)
  const handleSave = () => {
    if (isUpdateStatus) {
      handleUpdateStatus()
    } else {
      handleUpdateStatusOfResidence()
    }
  }

  const handleUpdateStatus = () => {
    if(rowsSelectedInternData.length==0) {
        toast.warning("Please select intern before edit !", { autoClose: 2000 });
    }
    // kiem tra moi nguoi duoc chon da co trang thai do hay chua  => tao vong lap cho intern da chon //
    // => lay danh sach status detail cuar nguoi dung => lay status_id
    // => tao vong lap danh sach status moi chon => tao vong lap long ben trong cho status da co => so sanh neu chua co thi tao moi, neu da co thi bo qua.
    rowsSelectedInternData.forEach(intern => {
      const stData = statusDetailApiData.filter(st => st.intern_id == intern.id)
      for (let i = 0; i < selectedMultiStatus.length; i++) {
        let isExist = false
        for (let j = 0; j < stData.length; j++) {
          if (selectedMultiStatus[i].id == stData[j].status_id) {
            isExist = true;
            toast.info(`Status ${selectedMultiStatus[i].name} already exist!`, { autoClose: 2000 });
            break
          }
        }
        if (!isExist) {
          const statusId = selectedMultiStatus[i].id
          const internId = intern.id
          const statusDetail = {
            ...statusDetailObj,
            key_license_id: intern.key_license_id,
            intern_id: internId,
            status_id: statusId,
          }
          const { name, colors, ...newObj } = statusDetail
          dispatch(setStatusDetailApi(newObj));
        }
      }
    });

    tog_standard();
  }

  const handleUpdateStatusOfResidence = () => {
    console.log("handleUpdateStatusOfResidence")
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex gap-3">
          <Button
            color="gray-soft"
            onClick={() => {
                if(rowsSelectedInternData.length==0) {
                    toast.warn("Please select intern before edit !", { autoClose: 2000 });
                } else {
                    tog_standard()
                    setIsUpdateStatus(true)
                }
            }}
          >
            <i className="fas fa-info-circle text-secondary"></i>{" "}
            {t("Update Status")}
          </Button>
          <Button
            color="gray-soft"
            onClick={() => {
                if(rowsSelectedInternData.length==0) {
                    toast.warn("Please select intern before edit !", { autoClose: 2000 });
                } else {
                    tog_standard()
                    setIsUpdateStatus(false)
                }
            }}
          >
            <i className="fas fa-user-shield text-secondary"></i>{" "}
            {t("Residence update")}
          </Button>
          <Button
            color="gray-soft"
            onClick={() => {
              tog_xlarge()
            }}
          >
            <i className="fas fa-ban text-secondary"></i> {t("Add violations")}
          </Button>
        </div>
        <div>
          <Button
            color="primary"
            onClick={() => {
              setIsEditIntern(false)
              tog_fullscreen()
            }}
          >
            {t("Add Intern")}
          </Button>
        </div>
      </div>
      <Modal
        isOpen={modal_standard}
        toggle={() => {
          tog_standard()
        }}
      >
        <div className="modal-header bg-primary">
          <h4 className="modal-title mt-0 text-light" id="myModalLabel">
            {isUpdateStatus
              ? "Cập nhật trạng thái"
              : "Cập nhật tư cách lưu trú"}
          </h4>
          <button
            type="button"
            onClick={() => {
              setmodal_standard(false)
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Card>
          <CardBody>
            {isUpdateStatus && (
              <div className="mb-3">
                <Label className="form-label fw-bold">{t("Status")}</Label>
                <Select
                  placeholder={t("Status")}
                  value={selectedMultiStatus}
                  isMulti={true}
                  onChange={value => {
                    handleMulti(value)
                  }}
                  options={statusApidata}
                  className="select2-selection"
                  isLoading={true}
                />
              </div>
            )}
            {!isUpdateStatus && (
              <div className="modal-body">
                <Label htmlFor="edit-status">{t("Residence Status")}</Label>
                <Select
                  name="status"
                  placeholder="Chọn tư cách lưu trú"
                  value={status}
                  onChange={item => {
                    setStatus(item["name"])
                  }}
                  options={statusOfResidenceApiData}
                />
              </div>
            )}
          </CardBody>
        </Card>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_standard()
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            {t("Cancel")}
          </button>

          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSave}
          >
            {t("Save")}
          </button>
        </div>
      </Modal>

      <Modal
        size="xl"
        isOpen={modal_xlarge}
        toggle={() => {
          tog_xlarge()
        }}
      >
        <div className="modal-header bg-primary">
          <h4
            className="modal-title mt-0 text-light"
            id="myExtraLargeModalLabel"
          >
            Thêm vi phạm
          </h4>
          <button
            onClick={() => {
              setmodal_xlarge(false)
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
          <Card>
            <CardBody>
              <Row className="mb-4">
                <Col lg={3}>
                  <div className="mb-4">
                    <Label>Default Functionality</Label>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="yyyy-MM-dd"
                      options={{
                        altInput: true,
                        altFormat: "Y-m-d",
                        dateFormat: "Y-m-d",
                      }}
                    />
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="mb-4">
                    <Label htmlFor="edit-status">Loại vi phạm</Label>
                    <Select
                      id="edit-status"
                      name="status"
                      placeholder="Chọn tư cách lưu trú"
                      value={status}
                      onChange={item => {
                        setStatus(item["name"])
                      }}
                      options={violateTypeApiData}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-4">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Input
                      id="note"
                      name="note"
                      type="text"
                      onChange={e => {}}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="pb-3">
                <Col lg={3}>
                  <h5>Hình ảnh vi phạm</h5>
                  <Button>
                    <i className="fas fa-plus"></i>
                  </Button>
                </Col>
                <Col></Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <Label>Danh sách TTS vi phạm</Label>
                    <Select
                      id="search"
                      name="search_intern"
                      value={status}
                      onChange={() => {
                        // handleSelectGroup();
                      }}
                      options={internApiData}
                      // className="select2-selection"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                {/* <TableContainer
                                    columns={columnsOfViolateTable}
                                    data={internDatas}
                                    isGlobalFilter={false}
                                    isAddOptions={false}
                                    customPageSize={5}
                                    isPagination={true}
                                    iscustomPageSizeOptions={false}
                                    isInternMenu={false}
                                    tableClass="align-middle table-nowrap table-check table"
                                    theadClass="table-dark"
                                    paginationDiv="col-12"
                                    pagination="justify-content-center pagination pagination-rounded"
                                /> */}
              </Row>
            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_xlarge()
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary ">
            Save changes
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalTop
