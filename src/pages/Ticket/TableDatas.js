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
// import ModalDatas from './ModalDatas'
import ModalTop from "./ModalTop"

import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

import "./table.scss"

// // //redux
// import { useSelector, useDispatch, shallowEqual } from "react-redux"
// import {
//   deleteTicket,
//   getCareerAll,
//   getDispatchingCompanyAll,
//   getInternAllInfo,
//   getReceivingFactoryAll,
//   getSyndicationAll,
//   getTicketAll,
//   getTicketAllInfo,
//   getTicketDetailAll,
//   getUsersAll,
// } from "store/actions"

// The rule argument should be a string in the format "custom_[field]".
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
  } = useContext(DataContext)

  //table
  // Khai bao du lieu
  // const dispatch = useDispatch()

  // const {
  //   ticketData,
  //   ticketDetailData,
  //   usersData,
  //   companyData,
  //   factoryData,
  //   syndicationData,
  //   internData,
  // } = useSelector(
  //   state => ({
  //     ticketData: state.Ticket.datas,
  //     ticketDetailData: state.TicketDetail.datas,
  //     usersData: state.Users.datas,
  //     companyData: state.DispatchingCompany.datas,
  //     factoryData: state.ReceivingFactory.datas,
  //     syndicationData: state.Syndication.datas,
  //     internData: state.Intern.datas,
  //   }),
  //   shallowEqual
  // )

  // Get du lieu lan dau
  // useEffect(() => {
  //   dispatch(getTicketAll())
  //   dispatch(getTicketDetailAll())
  //   // dispatch(getTicketAllInfo());
  //   // dispatch(getUsersAll())
  //   // dispatch(getDispatchingCompanyAll())
  //   // dispatch(getReceivingFactoryAll())
  //   // dispatch(getSyndicationAll())
  //   // dispatch(getInternAllInfo())
  // }, [dispatch])

  // get lai data sau moi 10s
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(getTicketAll())
  //   }, 10000)
  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }, [])

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
      if (ticketData) {
        const arr = ticketData.filter(vio => vio.violate_list_id == item.id)
        if (arr) {
          arr.forEach((item, index) => {
            dispatch(deleteTicket(item.id))
          })
        }
      }
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

  // const [dataTable, setDataTable] = useState(ticketData)
  // const [activeIndex, setActiveIndex] = useState(0)
  // const types = ["All", "new", "processing", "done"]

  // const renHeader = () => {
  //     if (ticketData) {
  //       const tabs = types.map((type, index) => {
  //         return {
  //           title: type,
  //           value: index,
  //           data: type == "All" ? ticketData.length : ticketData.filter(item => item.ticket_status == type).length
  //         }
  //       })

  //       console.log(activeIndex)

  //       return (
  //         <>
  //           <TabView
  //             scrollable
  //             activeIndex={activeIndex}
  //             onTabChange={e => setActiveIndex(e.index)}
  //           >
  //             {tabs.map(tab => {
  //               return (
  //                 <TabPanel
  //                   key={tab.title}
  //                   header = {<div><span>{tab.title}</span> <BadgePrime className="ms-1" value={tab.data} severity="success"></BadgePrime></div>}
  //                   contentStyle={{ display: "none" }}
  //                 ></TabPanel>
  //               )
  //             })}
  //           </TabView>
  //         </>
  //       )
  //     }
  //   }

  // const getListInternStatus = index => {
  //   if (index == 0) {
  //     const newArr = ticketData.map(item => {
  //       return {
  //         ...item,
  //         send_date: moment(item.send_date).format("YYYY-MM-DD"),
  //       }
  //     })
  //     setDataTable(newArr)
  //   } else {
  //     const arr = ticketData.filter(item => item.ticket_status == types[index])
  //     const newArr = arr.map(item => {
  //       return {
  //         ...item,
  //         send_date: moment(item.violate_date).format("YYYY-MM-DD"),
  //       }
  //     })
  //     setDataTable(newArr)
  //   }
  //   // console.log('arr:', newArr)
  // }

  // useEffect(() => {
  //   getListInternStatus(activeIndex)
  // }, [activeIndex, ticketData])

  // console.log('customActiveTab:', customActiveTab)

  // render col name
  // const dateBodyTemplate = rowData => {
  //   return (
  //     <div className="flex align-items-center gap-2">
  //       <Avatar
  //         className="p-overlay-badge"
  //         image={`https://api.lotusocean-jp.com/uploads/${rowData.originalname}`}
  //         size="large"
  //         shape="circle"
  //       ></Avatar>
  //       <span>{rowData.name_jp}</span>
  //     </div>
  //   )
  // }
  const [isInbox, setIsInbox] = useState(true)

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
            setIsEditViolate(true)
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


  // console.log('provinceById:', provinceById)
  // console.log('provinceData:', provinceData)
  // console.log('violatelist:', ticketData);
  // console.log('ticketData:', ticketData);
  // console.log('dataTable:', dataTable);

  return (
    <div className=" mt-3">
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
        // header={renHeader}
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
