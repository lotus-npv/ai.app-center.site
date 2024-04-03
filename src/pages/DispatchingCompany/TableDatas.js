import React, { useState, useEffect, useContext } from "react"
import { FilterMatchMode, FilterService } from "primereact/api"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
import { InputText } from "primereact/inputtext"
import { Nav, NavItem, NavLink, Row, Button as ButtonRS } from "reactstrap"
import classnames from "classnames"
import { Badge } from "reactstrap"
import DataContext from "data/DataContext"
import DeleteModal from "components/Common/DeleteModal"
import ModalDatas from "./ModalDatas"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"
import moment from "moment"

// //redux
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import {
  getDispatchingCompanyAll,
  getAddressAll,
  getProvinceId,
  getProvinceAll,
  getNationAll,
  deleteDispatchingCompany,
  setDispatchingCompany,
  updateDispatchingCompany,
  getDispatchingCompanyUserId,
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
  const user = JSON.parse(localStorage.getItem("authUser"))[0]
  // data context
  const { vh, tog_fullscreen, setIsEditCompany, updateAddressDataCompany } =
    useContext(DataContext)

  // Khai bao du lieu
  const dispatch = useDispatch()

  const { companyData, addressData, loading, nationData } = useSelector(
    state => ({
      companyData: state.DispatchingCompany.datas,
      addressData: state.Address.datas,
      nationData: state.Nation.datas,
      loading: state.Nation.loading,
    }),
    shallowEqual
  )

  // Get du lieu lan dau
  useEffect(() => {
    if (user) {
      dispatch(getDispatchingCompanyUserId(user.id))
      dispatch(getAddressAll(user.key_license_id))
      dispatch(getNationAll())
    }
  }, [dispatch])

  // get lai data sau moi 10s
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getDispatchingCompanyUserId(user.id))
    }, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
      dispatch(deleteDispatchingCompany(item.id))

      setDeleteModal(false)
    }
  }

  // TABLE
  const rendLabel = () => {
    // lọc ra danh sách các địa chỉ của xí nghiệp
    const array = addressData.filter(
      address => address.user_type === "dispatching_company"
    )
    // console.log('array:', array)

    // tạo danh sách địa chi
    const number_of_company = array.filter(
      address => address.is_default == 1
    ).length
    // console.log('number_of_factory', number_of_factory)

    let map = new Map()
    array.forEach(obj => {
      if (!map.has(obj.nation_id)) {
        map.set(obj.nation_id, { data: 1, obj })
      } else {
        map.get(obj.nation_id).data += 1
      }
    })

    // Tao mang chua du lieu
    let uniqueArray = Array.from(map.values()).map(item => {
      let name = "loading ..."
      if (!loading) {
        let nation = nationData.find(
          nation => nation.CountryID == item.obj.nation_id
        )
        if (nation !== undefined) {
          name = nation.CountryName_ja
        }
      }
      return { name: name, data: item.data, nationId: item.obj.nation_id }
    })

    // console.log('uniqueArray', uniqueArray)

    return [
      { name: "All", data: number_of_company, nationId: 0 },
      ...uniqueArray.map(address => {
        return {
          name: address.name,
          data: address.data,
          nationId: address.nationId,
        }
      }),
    ].filter(e => e.data >= 1)
  }

  // acctive tab
  const [customActiveTab, setcustomActiveTab] = useState({
    index: "0",
    value: "All",
    id: 0,
  })
  const toggleCustom = (tab, data, id) => {
    if (customActiveTab.index !== tab) {
      setcustomActiveTab({ index: tab, value: data, id: id })
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
            <ButtonRS
              color="primary"
              onClick={() => {
                setIsEditCompany(false)
                setRowSelect(null)
                updateAddressDataCompany([])
                tog_fullscreen()
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
                      toggleCustom(`${index}`, item.name, item.nationId)
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

  // truyen du lieu vao bang
  const [dataTable, setDataTable] = useState(companyData)

  // cap nhat data moi khi chuyen doi tab
  const getListInternStatus = key => {
    const arr = addressData.filter(item => item.nation_id == key)
    const newList = companyData
      .filter(company =>
        arr.some(
          item =>
            item.object_id == company.id &&
            item.user_type == "dispatching_company"
        )
      )
      .map(company => {
        return {
          ...company,
          date_of_joining_syndication: moment(
            company.date_of_joining_syndication
          ).format("YYYY-MM-DD"),
        }
      })
    setDataTable(newList)
  }

  useEffect(() => {
    if (customActiveTab.value === "All") {
      const arr = companyData.map(company => {
        const addressDefault = addressData.find(add => add.object_id == company.id && add.user_type == 'dispatching_company' && add.is_default == 1)
        // console.log('addressDefault', addressDefault);
        return {
          ...company,
          date_of_joining_syndication: moment(
            company.date_of_joining_syndication
          ).format("YYYY-MM-DD"),
          phone_number: addressDefault.phone_number,
          email: addressDefault.email,
        }
      })
      setDataTable(arr)
    } else {
      getListInternStatus(customActiveTab.id)
    }
  }, [customActiveTab, companyData])

  // render col name
  const nameBodyTemplate = rowData => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar
          className="p-overlay-badge"
          image={`https://api.lotusocean-jp.com/uploads/${rowData.logo}`}
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
            setIsEditCompany(true)
            tog_fullscreen()
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

  // console.log("addressData:", addressData)
  // console.log('loading:', loading)
  // console.log('nation:', nationData)
  // console.log('provinceById:', provinceById)
  // console.log('provinceData:', provinceData)
  // console.log(provinceById[0].StateName_ja);
  // console.log("dataTable:", dataTable)

  return (
    <div className="card">
      <DataTable
        value={dataTable}
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
        filterDisplay="row"
        globalFilterFields={["id", "nam_jp", "phone_number"]}
        header={header}
        emptyMessage="No data in the table"
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
          field="nam_jp"
          header="Tên xí nghiệp"
          body={nameBodyTemplate}
          filterField="nam_jp"
          filter
          filterPlaceholder="Tìm kiếm"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="phone_number"
          header="Số điện thoại"
          filterField="factory_name_jp"
          filter
          filterPlaceholder="Tìm kiếm"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="email"
          header="Email"
          filterField="email"
          filter
          filterPlaceholder="Tìm kiếm"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="date_of_joining_syndication"
          header="Ngày gia nhập"
          filterField="date_of_joining_syndication"
          filter
          filterPlaceholder="Tìm kiếm"
          sortable
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="description"
          header="Ghi chú"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          field="action"
          header="Action"
          style={{ minWidth: "10rem" }}
          body={actionBody}
        ></Column>
      </DataTable>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <ModalDatas
        user={user}
        item={rowSelect}
        getApi={getDispatchingCompanyAll}
        setApi={setDispatchingCompany}
        updateApi={updateDispatchingCompany}
        addressData={addressData}
      />
    </div>
  )
}

TableDatas.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(TableDatas)
