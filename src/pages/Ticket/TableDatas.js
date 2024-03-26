import React, { useState, useEffect, useContext } from "react"
import { FilterMatchMode, FilterService } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
// import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from "primereact/avatar"
import { InputText } from "primereact/inputtext"
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

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  deleteTicket,
  getCareerAll,
  getDispatchingCompanyAll,
  getInternAllInfo,
  getReceivingFactoryAll,
  getSyndicationAll,
  getTicketAll,
  getTicketAllInfo,
  getTicketDetailAll,
  getUsersAll,
} from "store/actions"

// The rule argument should be a string in the format "custom_[field]".
FilterService.register("custom_activity", (value, filters) => {
  const [from, to] = filters ?? [null, null]
  if (from === null && to === null) return true
  if (from !== null && to === null) return from <= value
  if (from === null && to !== null) return value <= to
  return from <= value && value <= to
})

const TableDatas = props => {
  // data context
  const {
    vh,
    modal_xlarge,
    setmodal_xlarge,
    tog_xlarge,
    isEditViolate,
    setIsEditViolate,
  } = useContext(DataContext)

  //table
  // Khai bao du lieu
  const dispatch = useDispatch()

  const {
    ticketData,
    ticketDetailData,
    usersData,
    companyData,
    factoryData,
    syndicationData,
    internData
  } = useSelector(
    state => ({
      ticketData: state.Ticket.datas,
      ticketDetailData: state.TicketDetail.datas,
      usersData: state.Users.datas,
      companyData: state.DispatchingCompany.datas,
      factoryData: state.ReceivingFactory.datas,
      syndicationData: state.Syndication.datas,
      internData: state.Intern.datas,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    dispatch(getTicketAll());
    dispatch(getTicketDetailAll());
    // dispatch(getTicketAllInfo());
    // dispatch(getUsersAll())
    // dispatch(getDispatchingCompanyAll())
    // dispatch(getReceivingFactoryAll())
    // dispatch(getSyndicationAll())
    // dispatch(getInternAllInfo())
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getTicketAll())
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  console.log('ticketData', ticketData)


  //render lai data

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

  // TABLE
  // render label tab
  const [activeIndex, setActiveIndex] = useState(0)

  const itemRenderer = (item, itemIndex, data) => (
    <a
      className="p-menuitem-link flex align-items-center gap-2"
      onClick={() => setActiveIndex(itemIndex)}
    >
      <BadgePrime value={data}></BadgePrime>
      <span className="font-bold">{props.t(item.name)}</span>
    </a>
  )

  const rendLabel = () => {
    // tạo danh sách địa
    let numberOfTicket = 0;
    if(ticketData) {
      numberOfTicket = ticketData.length
    }
    const type = ['new', 'processing', 'done']

    return [
      { name: "All", data: numberOfTicket, type_id: 0 },
      ...type.map((type, index) => {
        return {
          name: type,
          data: ticketData.filter(
            (ticket) => ticket.ticket_type == type
          ).length,
          type_id: index + 1,
        }
      }),
    ]
  }

  // acctive tab
  const [customActiveTab, setcustomActiveTab] = useState({
    index: "0",
    value: "All",
    id: 0,
  })
  const toggleCustom = (tab, data, provinceId) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data, id: provinceId })
    }
  }

  // Global filter

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

  // Row selected edit
  const [rowSelect, setRowSelect] = useState(null)

  // Global search
  const [globalFilterValue, setGlobalFilterValue] = useState("")
  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters["global"].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  // goi ham render mang data
  const items = rendLabel()

  // console.log('item:', items)

  const renderHeader = () => {
    return (
      <>
        <Row className="mb-2">
          <div className="d-flex justify-content-between">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Nhập từ khoá tìm kiếm ..."
              />
            </span>
            <ButtonRS
              color="primary"
              onClick={() => {
                setIsEditViolate(false)
                tog_xlarge()
              }}
            >
              Thêm mới
            </ButtonRS>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-between">
            {/* <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} /> */}
            <Nav tabs className="nav-tabs-custom">
              {items.map((item, index) => (
                <NavItem key={index} style={{ minWidth: "100px" }}>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab.index === `${index}`,
                    })}
                    onClick={() => {
                      toggleCustom(`${index}`, item.name, item.type_id)
                    }}
                  >
                    <div className="d-flex gap-2 justify-content-center">
                      <span className="d-none d-sm-block">{item.name}</span>
                      <Badge
                        pill
                        className={"p-2 font-size-12 badge-soft-primary"}
                      >
                        {item.data}
                      </Badge>
                    </div>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        </Row>
      </>
    )
  }

  const [dataTable, setDataTable] = useState(ticketData)
  const checkInfo = (type, id) => {
      if(type == 'intern') {
       return  internData.find(item => item.id == id).full_name_jp;
      } else if(type == 'syndication') {
        return syndicationData.find(item => item.id == id).name;
      } else if(type == 'receiving_factory') {
        return factoryData.find(item => item.id == id);
      } else {
        return companyData.find(item => item.id == id);
      } 
  }

  const getListInternStatus = key => {
    if (key == "0") {
      const newArr = ticketData.map(item => {
        return {
          ...item,
          send_date: moment(item.send_date).format("YYYY-MM-DD"),
          sender_id: checkInfo(item.sender_type)
        }
      })
      setDataTable(newArr)
    } else {
      const arr = ticketData.filter(item => item.violate_type_id == key)
      const newArr = arr.map(item => {
        return {
          ...item,
          violate_date: moment(item.violate_date).format("YYYY-MM-DD"),
          number_of_violate: ticketData.filter(
            v => v.violate_list_id == item.id
          ).length,
        }
      })
      setDataTable(newArr)
    }
    // console.log('arr:', newArr)
  }

  useEffect(() => {
    getListInternStatus(customActiveTab.id)
  }, [customActiveTab, ticketData])

  // console.log('customActiveTab:', customActiveTab)

  // render col name
  const dateBodyTemplate = rowData => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          className="p-overlay-badge"
          image={`https://api.lotusocean-jp.com/uploads/${rowData.originalname}`}
          size="large"
          shape="circle"
        ></Avatar>
        <span>{rowData.name_jp}</span>
      </div>
    )
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

  const header = renderHeader()

  // console.log('loading:', loading)
  // console.log('provinceById:', provinceById)
  // console.log('provinceData:', provinceData)
  // console.log('violatelist:', ticketData);
  // console.log('ticketData:', ticketData);
  // console.log('dataTable:', dataTable);

  return (
    <div className="card">
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
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["id", "nam_jp", "phone_number"]}
        header={header}
        emptyMessage="Không tìm thấy kết quả phù hợp."
        tableStyle={{ minWidth: "50rem" }}
        scrollable
        scrollHeight={vh}
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
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          filterField="title"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="sender_id"
          header="Sender"
          filterField="date_of_joining_syndication"
          filter
          filterPlaceholder="Tìm kiếm bằng tên"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="receiver_id"
          header="Receiver"
          style={{ minWidth: "12rem" }}
        ></Column>
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

      {/* <ModalDatas
        item={rowSelect}
        dispatch={dispatch}
      // setApi={setIntern}
      // updateApi={updateIntern}
      /> */}

      <ModalTop
        // violateTypeData={violateTypeData}
        rowSelect={rowSelect}
        ticketData={ticketData}
      />
    </div>
  )
}

TableDatas.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(TableDatas)
