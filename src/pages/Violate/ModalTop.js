import React, { useMemo, useState, useEffect, useContext } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  Label,
  Input,
  Button,
} from "reactstrap"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Avatar } from "primereact/avatar"
import { Button as ButtonPrime } from "primereact/button"

import Select from "react-select"
//Import Flatepicker
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"

import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import moment from "moment"

// import context
import DataContext from "../../data/DataContext"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  setViolate,
  setViolateList,
  updateAlienRegistrationCard,
  getInternAllInfo,
} from "store/actions"

const CustomOption = ({ innerProps, isFocused, isSelected, data }) => (
  <div
    {...innerProps}
    style={{
      backgroundColor: isFocused
        ? "lightgray"
        : isSelected
        ? "lightgray"
        : null,
      fontWeight: isSelected ? "bold" : "normal",
      height: "40px",
      padding: "4px",
      display: "flex",
      gap: "10px",
      justifyContent: "space-between",
    }}
  >
    {data.label}{" "}
    <Avatar
      className="p-overlay-badge"
      image={`https://api.lotusocean-jp.com/uploads/${data.avata}`}
      size="normal"
      shape="circle"
    ></Avatar>
  </div>
)

//--------------------------------------------------------------------------------------------------------------//

const ModalTop = ({
  setStatusDetailApi,
  statusDetailApiData,
  alienCardApiData,
  violateTypeData,
  rowSelect,
  violateData,
}) => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem("authUser"))[0]
  const dispatch = useDispatch()

  // --------------------------------------------------

  // data context
  const {
    isEditViolate,
    setIsEditViolate,
    tog_standard,
    modal_xlarge,
    tog_xlarge,
    setmodal_xlarge,
    rowsSelectedInternData,
    setRowSelectedInternData,
  } = useContext(DataContext)

  const { violateListAddDone, loading, dataInternAll } = useSelector(
    state => ({
      violateListAddDone: state.ViolateList.data,
      loading: state.ViolateList.loading,
      dataInternAll: state.Intern.datas,
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(getInternAllInfo())
  }, [dispatch])

  // Quan ly danh sach intern trong hop tim kiem
  const [internData, setInternData] = useState(dataInternAll)

  // Quan ly danh sach intern dang lua chon
  const [selectIntern, setSelectIntern] = useState([])

  // data form
  const [dateViolate, setDateViolate] = useState("")
  const [violateType, setViolateType] = useState("")
  const [note, setNote] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  // thuc thi viec ghi vi pham
  // => lay thong tin ngay vi pham
  // => lay thong tin kieu vi pham.
  // => lay ghi chu
  // =====> ghi vao bang violate_list

  // => lay id cua violate_list vua ghi.
  // => lay danh sach intern vi pham
  // => tao vong lap va ghi vao bang violate

  useEffect(() => {
    setSelectIntern(rowsSelectedInternData)
    let arr = dataInternAll.filter(
      intern => !rowsSelectedInternData.some(item => item.id === intern.id)
    )
    setInternData(arr)
  }, [rowsSelectedInternData])

  // Quan ly trang thai cho phep ghi du lieu vao bang violate
  const [isDone, setIsDone] = useState(false)

  const violateList = {
    key_license_id: 1,
    violate_type_id: "",
    violate_date: "",
    description: "",
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }

  const violate = {
    key_license_id: 1,
    intern_id: "",
    violate_list_id: "",
    description: "",
    create_at: null,
    create_by: 1,
    update_at: null,
    update_by: 1,
    delete_at: null,
    flag: 1,
  }

  const handleAddForm = () => {
    if(!isEditViolate) {
      const newViolate = {
        ...violateList,
        key_license_id: user.key_license_id,
        violate_type_id: violateType.id,
        violate_date: moment(dateViolate[0])
          .utcOffset("+07:00")
          .format("YYYY-MM-DD"),
        description: note,
      }
      dispatch(setViolateList(newViolate))
      setIsDone(true)
    } else {
      
    }    
  }

  useEffect(() => {
    if (violateListAddDone) {
      if (isDone && !loading && !isEditViolate) {
        console.log("check", selectIntern)
        const violate_type_id = violateListAddDone.id
        selectIntern.forEach(intern => {
          const vio = {
            ...violate,
            intern_id: intern.id,
            violate_list_id: violate_type_id,
            key_license_id: user.key_license_id,
          }
          dispatch(setViolate(vio))
        })
      }
      setIsEditViolate(false)
      setDateViolate("")
      setViolateType("")
      setNote("")
      setSelectIntern("")
      setInternData(dataInternAll)
      tog_xlarge()
    }
  }, [violateListAddDone])

  // Xu ly edit form
  useEffect(() => {
    if (isEditViolate) {
      setDateViolate(rowSelect.violate_date)
      const vt = violateTypeData.find(
        item => item.id === rowSelect.violate_type_id
      )
      if (vt) {
        setViolateType(vt)
      }
      setNote(rowSelect.description)
      // tim danh sach nhan vien co trong vi pham => set len setSelectIntern
      const arr = violateData.filter(
        violate => violate.violate_list_id === rowSelect.id
      )
      const newListIntern = internData.filter(intern =>
        arr.some(vio => vio.intern_id == intern.id)
      )
      console.log("newListIntern", newListIntern)
      setSelectIntern(newListIntern)
    }
  }, [isEditViolate, rowSelect])

  // render col name
  const nameBodyTemplate = rowData => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          className="p-overlay-badge"
          image={`https://api.lotusocean-jp.com/uploads/${rowData.avata}`}
          size="large"
          shape="circle"
        ></Avatar>
        <span>{rowData.full_name_jp}</span>
      </div>
    )
  }

  const actionBody = rowData => {
    return (
      <div className="d-flex gap-3">
        <ButtonPrime
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            const arr = selectIntern.filter(intern => intern.id !== rowData.id)
            setSelectIntern(arr)
            const newdata = [...internData, rowData]
            setInternData(newdata)
          }}
        />
      </div>
    )
  }

  const footer = `In total there are ${
    selectIntern ? selectIntern.length : 0
  } Intern.`

  // console.log(internApiData)
  // console.log('isEditViolate', isEditViolate)
  // console.log("selectIntern", selectIntern)
  // console.log("loading", loading)
  // console.log("rowsSelectedInternData", rowsSelectedInternData)

  return (
    <>
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
              setIsEditViolate(false)
              setDateViolate("")
              setViolateType("")
              setNote("")
              setSelectIntern("")
              setInternData(dataInternAll)
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
              {
                <Row className="mb-4">
                  <Col lg={3}>
                    <div className="mb-4">
                      <Label>Ngày vi phạm</Label>
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="yyyy-MM-dd"
                        options={{
                          altInput: true,
                          altFormat: "Y-m-d",
                          dateFormat: "Y-m-d",
                        }}
                        value={dateViolate}
                        onChange={date => setDateViolate(date)}
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="mb-4">
                      <Label htmlFor="edit-status">Loại vi phạm</Label>
                      <Select
                        id="edit-status"
                        name="status"
                        placeholder="Loại vi phạm"
                        value={violateType}
                        onChange={item => {
                          setViolateType(item)
                        }}
                        options={violateTypeData}
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
                        value={note}
                        onChange={e => {
                          setNote(e.target.value)
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              }

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
                      value=""
                      onChange={item => {
                        const arr = [...selectIntern, item]
                        setSelectIntern(arr)
                        const newdata = internData.filter(
                          intern => intern !== item
                        )
                        setInternData(newdata)
                      }}
                      options={internData}
                      components={{ Option: CustomOption }}
                      // className="select2-selection"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <div className="card">
                  <DataTable
                    value={selectIntern}
                    // header={header}
                    footer={footer}
                    tableStyle={{ minWidth: "60rem" }}
                  >
                    <Column
                      field="name"
                      header={t("Intern")}
                      body={nameBodyTemplate}
                    ></Column>
                    <Column
                      field="phone_abroad"
                      header={t("Phone Number")}
                    ></Column>
                    <Column
                      field="factory_name_jp"
                      header={t("Receiving Factory")}
                    ></Column>
                    <Column
                      field="description"
                      header={t("Description")}
                    ></Column>
                    <Column header={t("Action")} body={actionBody}></Column>
                  </DataTable>
                </div>
              </Row>
            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_xlarge()
              setIsEditViolate(false)
              setDateViolate("")
              setViolateType("")
              setNote("")
              setSelectIntern("")
              setInternData(dataInternAll)
            }}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleAddForm}
          >
            Save changes
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ModalTop
