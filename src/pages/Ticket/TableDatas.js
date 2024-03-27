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

const TableDatas = ({dataTable}) => {
  // data context
  const {
    modal_xlarge,
    setmodal_xlarge,
    tog_xlarge,
    isEditViolate,
    setIsEditViolate,
    modal, setmodal,
    ticketRowData, setTicketRowData,
    isEditTicket,
    setIsEditTicket,
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

      // // tim nhung tts co gan voi id cua vi pham moi xoa de xoa tiep
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
    nam_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date_of_joining_syndication: {
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


  const [isInbox, setIsInbox] = useState(true)

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
            setTicketRowData(rowData);
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

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Nhập từ khoá tìm kiếm ..." />
        </span>
      </div>
    );
  };

  const screenAvailHeight = window.innerHeight;
  const [vh, setVh] = useState(null)
  window.addEventListener("resize", function () {
    var screenHeight = window.innerHeight
    let wh = screenHeight - 220
    setVh(`${wh}px`)
    // setWindowHeight(screenHeight);
  })

  useEffect(() => {
    let wh = screenAvailHeight - 220
    setVh(`${wh}px`)
  }, [])

  return (
    <div className="">
      <DataTable
        value={dataTable}
        paginator
        rows={15}
        stripedRows
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        dragSelection
        selectionMode={"multiple"}
        selection={selectedItems}
        onSelectionChange={e => setSelectedItems(e.value)}
        dataKey="id"
        globalFilterFields={["id", "nam_jp", "phone_number"]}
        header={renderHeader}
        emptyMessage="Không tìm thấy kết quả phù hợp."
        tableStyle={{ minWidth: "50rem"}}
        scrollable
        scrollHeight={vh}
        style={{ minHeight: vh }}
        size={"small"}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        <Column
          selectionMode="multiple"
          exportable={false}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="send_date"
          header="Send Date"
          filterField="send_date"
          // filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          filterField="title"
          // filter
          filterPlaceholder="Tìm kiếm bằng tên"
          // sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        {isInbox && <Column
          field="sender_name"
          header="Sender"
          filterField="date_of_joining_syndication"
          // filter
          filterPlaceholder="Tìm kiếm bằng tên"
          // sortable
          style={{ minWidth: "12rem" }}
        ></Column>}
       {!isInbox &&  <Column
          field="receiver_name"
          header="Receiver"
          style={{ minWidth: "12rem" }}
        ></Column>}
        <Column
          field="priority"
          header="Priority"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="ticket_status"
          header="Ticket Status"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="action"
          header="Thao tác"
          style={{ minWidth: "10rem" }}
          body={actionBody}
        ></Column>
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
