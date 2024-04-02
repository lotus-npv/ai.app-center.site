import React, { useState, useEffect, useContext } from "react"
import { FilterMatchMode, FilterService } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

import DataContext from "data/DataContext"

import DeleteModal from "components/Common/DeleteModal"
import ModalDatas from "./ModalDatas"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getCareerAll,
  updateCareer,
  deleteCareer,
  setCareer,
  getInternAll,
} from "store/actions"

// The rule argument should be a string in the format "custom_[field]".
FilterService.register("custom_activity", (value, filters) => {
  const [from, to] = filters ?? [null, null]
  if (from === null && to === null) return true
  if (from !== null && to === null) return from <= value
  if (from === null && to !== null) return value <= to
  return from <= value && value <= to
})

const TableDatas = () => {
  const { vh } = useContext(DataContext)

  const [selectedItems, setSelectedItems] = useState(null)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState("")

  const dispatch = useDispatch()

  const { datas, loading, loadingIntern, dataUpdateReponse } = useSelector(
    state => ({
      datas: state.Career.datas,
      loading: state.Career.loading,
      loadingIntern: state.Intern.loading,
      dataUpdateReponse: state.Status.dataUpdateReponse,
    }),
    shallowEqual
  )

  // Get du lieu lan dau F
  useEffect(() => {
    dispatch(getCareerAll())
    dispatch(getInternAll())
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getCareerAll())
    }, 10000)
    // Hàm dọn dẹp khi unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // modal edit or addnew
  const [isEdit, setIsEdit] = useState(false)
  const [modal_xlarge, setmodal_xlarge] = useState(false)
  function tog_xlarge() {
    setmodal_xlarge(!modal_xlarge)
    removeBodyCss()
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  // //delete modal
  const [item, setItem] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = data => {
    setItem(data)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (item && item.id) {
      console.log("delete id :" + item.id)
      dispatch(deleteCareer(item.id))

      setDeleteModal(false)
    }
  }

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)

  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters["global"].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Nhập từ khoá tìm kiếm ..."
          />
        </span>

        <Button className="btn btn-primary" onClick={addForm}>
          Thêm mới
        </Button>
      </div>
    )
  }

  const addForm = () => {
    setRowSelect(null)
    setIsEdit(false)
    tog_xlarge()
  }

  const actionBody = rowData => {
    return (
      <div className="d-flex gap-3">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="success"
          aria-label="Cancel"
          onClick={() => {
            setRowSelect(rowData)
            tog_xlarge()
            setIsEdit(true)
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            onClickDelete(rowData)
          }}
        />
      </div>
    )
  }

  const header = renderHeader()

  // console.log('loadingIntern', loadingIntern)
  // console.log('dataUpdateReponse', dataUpdateReponse)

  return (
    <div className="card">
      <DataTable
        value={datas}
        paginator
        rows={15}
        stripedRows
        // rowsPerPageOptions={[5, 10, 15, 20, 50]}
        dragSelection
        selectionMode={"multiple"}
        selection={selectedItems}
        onSelectionChange={e => setSelectedItems(e.value)}
        dataKey="id"
        filters={filters}
        loading={false}
        globalFilterFields={["id", "name", "description"]}
        header={header}
        emptyMessage="Không tìm thấy kết quả phù hợp."
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        scrollHeight={vh}
        size={"small"}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        <Column
          selectionMode="multiple"
          exportable={false}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="id"
          header="ID"
          sortable
          style={{ width: "15rem" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="description"
          header="Description"
          showFilterMenu={true}
          style={{ minWidth: "14rem" }}
        ></Column>
        <Column
          field="action"
          header="Action"
          style={{ minWidth: "14rem" }}
          body={actionBody}
        ></Column>
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <ModalDatas
        item={rowSelect}
        isEdit={isEdit}
        modal_xlarge={modal_xlarge}
        setmodal_xlarge={setmodal_xlarge}
        tog_xlarge={tog_xlarge}
        dispatch={dispatch}
        setApi={setCareer}
        updateApi={updateCareer}
      />
    </div>
  )
}

export default TableDatas
