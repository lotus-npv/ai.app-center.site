import React, { useState, useEffect, useContext } from "react"
import { FilterMatchMode, FilterService } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
// import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from "primereact/avatar"
import { InputText } from "primereact/inputtext"
import { TabView, TabPanel } from "primereact/tabview"
import moment from "moment"

import { Nav, NavItem, NavLink, Row, Col, Button as ButtonRS } from "reactstrap"
import classnames from "classnames"
import { Badge } from "reactstrap"
import { Badge as BadgePrime } from "primereact/badge"
import DataContext from "data/DataContext"
import DeleteModal from "components/Common/DeleteModal"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

FilterService.register("custom_activity", (value, filters) => {
  const [from, to] = filters ?? [null, null]
  if (from === null && to === null) return true
  if (from !== null && to === null) return from <= value
  if (from === null && to !== null) return value <= to
  return from <= value && value <= to
})

import { useSelector, useDispatch, shallowEqual } from "react-redux"

const TableDatas = ({ dataTable }) => {
  const dispatch = useDispatch()

  // data context
  const {
    modal_xlarge,
    setmodal_xlarge,
    tog_xlarge,
    isEditViolate,
    setIsEditViolate,
    modal,
    setmodal,
    ticketRowData,
    setTicketRowData,
    isEditTicket,
    setIsEditTicket,
    isInbox,
    setIsInbox,
    isOutbox,
    setIsOutbox,
  } = useContext(DataContext)

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
      dispatch(deleteTicket(item.id))

      // tim nhung tts co gan voi id cua vi pham moi xoa de xoa tiep
      // if (ticketData) {
      //   const arr = ticketData.filter(vio => vio.violate_list_id == item.id)
      //   if (arr) {
      //     arr.forEach((item, index) => {
      //       dispatch(deleteTicket(item.id))
      //     })
      //   }
      // }
      setDeleteModal(false)
    }
  }

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)
  const [selectedItems, setSelectedItems] = useState(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    send_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sender_name: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  })
  // Global search
  const [globalFilterValue, setGlobalFilterValue] = useState("")
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
      </div>
    )
  }

  const actionBody = rowData => {
    return (
      <div className="d-flex gap-3">
        <Button
          icon="pi pi-eye"
          rounded
          text
          severity="success"
          aria-label="Views"
          onClick={() => {
            setTicketRowData(rowData)
            setIsEditTicket(true)
            setmodal(!modal)
          }}
        />
        {/* <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="success"
          aria-label="Cancel"
          onClick={() => {
            setTicketRowData(rowData)
            tog_xlarge()
            setIsEditViolate(true)
          }}
        /> */}
        {/* <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            onClickDelete(rowData)
          }}
        /> */}
      </div>
    )
  }

  const getStatusColor = status => {
    switch (status) {
      case "new":
        return "success"
      case "processing":
        return "warning"
      case "done":
        return "info"
      default:
        return "secondary"
    }
  }

  const statusBodyTemplate = rowData => {
    return (
      <Badge
        className={
          "p-2 font-size-12 badge-soft-" +
          `${getStatusColor(rowData.ticket_status)}`
        }
        style={{ minWidth: "80px" }}
      >
        {rowData.ticket_status}
      </Badge>
    )
  }

  const screenAvailHeight = window.innerHeight
  const [vh, setVh] = useState(null)
  window.addEventListener("resize", function () {
    var screenHeight = window.innerHeight
    let wh = screenHeight - 190
    setVh(`${wh}px`)
    // setWindowHeight(screenHeight);
  })

  useEffect(() => {
    let wh = screenAvailHeight - 190
    setVh(`${wh}px`)
  }, [])

  const onRowSelect = event => {
    setTicketRowData(event.data)
    setIsEditTicket(true)
    setmodal(!modal)
  }

  // const onRowUnselect = event => {
  //   console.log("select row")
  // }

  return (
    <div className="">
      <DataTable
        onRowSelect={onRowSelect}
        // onRowUnselect={onRowUnselect}
        value={dataTable}
        paginator
        rows={15}
        stripedRows
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        dragSelection
        selectionMode="single"
        filters={filters}
        selection={selectedItems}
        onSelectionChange={e => setSelectedItems(e.value)}
        dataKey="id"
        globalFilterFields={["send_date", "title", "receiver_name"]}
        header={renderHeader}
        emptyMessage="Không tìm thấy kết quả phù hợp."
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        scrollHeight={vh}
        style={{ minHeight: vh }}
        size={"small"}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        {/* <Column
          selectionMode="multiple"
          exportable={false}
          headerStyle={{ width: "3rem" }}
        ></Column> */}
        <Column
          field="id"
          header="ID"
          filterField="id"
          sortable
          style={{ minWidth: "4rem" }}
        ></Column>
        <Column
          field="send_date"
          header="Ngày gửi"
          filterField="send_date"
          // filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "10rem" }}
        ></Column>
        <Column
          field="title"
          header="Tiêu đề"
          filterField="title"
          style={{ minWidth: "15rem" }}
        ></Column>
        {isInbox && (
          <Column
            field="sender_name"
            header="Người gửi"
            filterField="date_of_joining_syndication"
            // filter
            filterPlaceholder="Tìm kiếm bằng tên"
            // sortable
            style={{ minWidth: "12rem" }}
          ></Column>
        )}
        {isOutbox && (
          <Column
            field="receiver_name"
            header="Người nhận"
            style={{ minWidth: "12rem" }}
          ></Column>
        )}
        {/* <Column
          field="priority"
          header="Mức độ"
          style={{ minWidth: "8rem" }}
        ></Column> */}
        <Column
          field="ticket_status"
          header="Trạng thái"
          body={statusBodyTemplate}
          style={{ minWidth: "8rem" }}
        ></Column>
        {/* <Column
          field="action"
          header="Thao tác"
          style={{ minWidth: "10rem" }}
          body={actionBody}
        ></Column> */}
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
    </div>
  )
}

TableDatas.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(TableDatas)
