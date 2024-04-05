import React, { useState, useEffect, useContext, useDebugValue } from "react"
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

import { useTranslation } from "react-i18next"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getProvinceAll,
  getViolateAll,
  getViolateListAll,
  getViolateTypeAll,
  deleteViolateList,
  deleteViolate,
  getViolateUserId,
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
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem("authUser"))[0]
  // data context
  const { vh, setmodal_xlarge, setIsEditViolate } = useContext(DataContext)

  //table

  // Khai bao du lieu
  const dispatch = useDispatch()

  const { violateListData, violateData, violateTypeData, loading } =
    useSelector(
      state => ({
        violateListData: state.ViolateList.datas,
        violateData: state.Violate.datas,
        violateTypeData: state.ViolateType.datas,
        loading: state.Province.loading,
      }),
      shallowEqual
    )

  // Get du lieu lan dau
  useEffect(() => {
    if (user) {
      dispatch(getViolateListAll())
      // dispatch(getViolateAll())
      dispatch(getProvinceAll())
      dispatch(getViolateTypeAll())
      dispatch(getViolateUserId(user.id))
    }
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) {
        dispatch(getViolateUserId(user.id))
      }
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
      dispatch(deleteViolateList(item.id))

      // tim nhung tts co gan voi id cua vi pham moi xoa de xoa tiep
      if (violateData) {
        const arr = violateData.filter(vio => vio.violate_list_id == item.id)
        if (arr) {
          arr.forEach((item, index) => {
            dispatch(deleteViolate(item.id))
          })
        }
      }
      setDeleteModal(false)
    }
  }

  // TABLE
  const rendLabel = () => {
    // tạo danh sách địa
    const number_of_violate_list = violateListData.length

    return [
      { name: "All", data: number_of_violate_list, type_id: 0 },
      ...violateTypeData.map(type => {
        return {
          name: type.name,
          data: violateListData.filter(
            violate => violate.violate_type_id == type.id
          ).length,
          type_id: type.id,
        }
      }),
    ].filter(item => item.data > 0)
  }

  // acctive tab
  const [customActiveTab, setcustomActiveTab] = useState({
    index: "0",
    value: "All",
    id: 0,
  })

  // Global filter

  const [selectedItems, setSelectedItems] = useState(null)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nam_jp: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    factory_work_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company_work_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
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

  // console.log('items', items)

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
            {user && user.role == "admin" && (
              <ButtonRS
                color="primary"
                onClick={() => {
                  setIsEditViolate(false)
                  setmodal_xlarge(true)
                }}
              >
                Thêm mới
              </ButtonRS>
            )}
          </div>
        </Row>
      </>
    )
  }

  const [dataTable, setDataTable] = useState(violateData)

  const getListInternStatus = key => {
    if (key == "0") {
      const newArr = violateListData.map(item => {
        return {
          ...item,
          violate_date: moment(item.violate_date).format("YYYY-MM-DD"),
          number_of_violate: violateData.filter(
            v => v.violate_list_id == item.id
          ).length,
        }
      })
      setDataTable(newArr)
    } else {
      const arr = violateListData.filter(item => item.violate_type_id == key)
      const newArr = arr.map(item => {
        return {
          ...item,
          violate_date: moment(item.violate_date).format("YYYY-MM-DD"),
          number_of_violate: violateData.filter(
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
  }, [customActiveTab, violateListData])

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
            setmodal_xlarge(true)
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
  // console.log('violatelist:', violateListData);
  // console.log("violate:", violateData)
  // console.log('user:', user);

  useEffect(() => {
    if (violateData) {
      const arr = violateData.map(violate => {
        return {
          ...violate,
          violate_date: moment(violate.violate_date)
            .utc("+09:00")
            .format("YYYY-MM-DD"),
        }
      })
      setDataTable(arr)
    }
  }, [violateData])

  const calculateCustomerTotal = id => {
    let total = 0

    if (violateData) {
      for (let violate of violateData) {
        if (violate.id === id) {
          total++
        }
      }
    }
    return total
  }

  const headerTemplate = data => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt={data.representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${data.representative.image}`} width="32" /> */}
        <span className="font-bold">
          {data.violate_date} - {data.vl_description}
        </span>
      </div>
    )
  }

  const footerTemplate = data => {
    // console.log("data", data)
    return (
      <React.Fragment>
        <td colSpan="5">
          <div className="flex justify-content-end font-bold w-full">
            Total Intern Violate: {calculateCustomerTotal(data.id)}
          </div>
        </td>
      </React.Fragment>
    )
  }

  const nameBodyTemplate = rowData => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          className="p-overlay-badge"
          style={{ minWidth: "25px" }}
          image={`https://api.lotusocean-jp.com/uploads/${rowData.avata}`}
          // size="large"
          shape="circle"
        ></Avatar>
        <span>{rowData.full_name_jp}</span>
      </div>
    )
  }

  return (
    <div className="card">
      <DataTable
        header={header}
        value={dataTable}
        rowGroupMode="subheader"
        groupRowsBy="id"
        sortMode="single"
        sortField="id"
        sortOrder={1}
        scrollable
        scrollHeight={vh}
        rowGroupHeaderTemplate={headerTemplate}
        rowGroupFooterTemplate={footerTemplate}
        tableStyle={{ minWidth: "50rem" }}
        filters={filters}
        stripedRows
        globalFilterFields={[
          "id",
          "full_name_jp",
          "violate_date",
          "factory_work_name",
          "company_work_name",
        ]}
        selectionMode={"multiple"}
        selection={selectedItems}
        onSelectionChange={e => setSelectedItems(e.value)}
      >
        <Column
          selectionMode="multiple"
          exportable={false}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="full_name_jp"
          header="Name"
          body={nameBodyTemplate}
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="violate_type_name"
          header="Violate Type"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="factory_work_name"
          header="Receiving Factory"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="company_work_name"
          header="Dispatching Company"
          style={{ minWidth: "200px" }}
        ></Column>
        <Column
          field="violate_date"
          header="Date"
          style={{ minWidth: "200px" }}
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
        violateTypeData={violateTypeData}
        rowSelect={rowSelect}
        violateData={violateData}
      />
    </div>
  )
}

TableDatas.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(TableDatas)
